import { type NextRequest } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  BatchWriteCommand,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";

import { IStopDetails, IStoredStopDetails } from "@/interfaces/stop";
import { ILocationRequest } from "@/interfaces/locationRequest";
import { IAPIRes } from "@/interfaces/apiResponse";
import expiryEpochInSeconds from "@/utils/expiry";

const axios = require("axios").default;

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
});
const docClient = DynamoDBDocumentClient.from(client);

export async function GET(request: NextRequest) {
  // TODO: Use request.geo?

  const searchParams = request.nextUrl.searchParams;
  const lat = searchParams.get("lat") as string;
  const long = searchParams.get("long") as string;

  if (!lat || !long) {
    return Response.json(
      {
        message: "A location must be provided",
      },
      { status: 400 },
    );
  }

  // Note: Translink API requires lat and lon be 6 decimals max
  const req = {
    lat: Number.parseFloat(lat!.toString()).toFixed(6),
    long: Number.parseFloat(long!.toString()).toFixed(6),
  };

  const api_stops = await getStopsFromRTTIAPI(req);

  if (api_stops) {
    return Response.json(
      {
        data: api_stops as IStopDetails[],
      },
      { status: 200 },
    );
  }

  // If we haven't returned by now, something has gone wrong
  return Response.json(
    {
      message: "Error retrieving stop data :(",
    },
    { status: 500 },
  );
}

function getStopsFromRTTIAPI(
  request: ILocationRequest,
): Promise<object | null> {
  return new Promise((resolve) => {
    axios
      .request({
        method: "GET",
        url: "http://api.translink.ca/RTTIAPI/V1/stops",
        params: {
          apiKey: process.env.TRANSLINK_API_KEY,
          lat: request.lat,
          long: request.long,
        },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then(async (api_res: IAPIRes) => {
        // Create batch of stops to put in the DB
        const putRequests = Object.values(api_res.data).map(
          // Strip distance from stop and add expiry
          (stop: IStoredStopDetails) => {
            // Add TTL
            stop.ExpirationTime = stop.ExpirationTime = expiryEpochInSeconds();
            return {
              PutRequest: {
                Item: stop,
              },
            };
          },
        );

        // Assume stops don't exist in DB, so add them!
        const command = new BatchWriteCommand({
          RequestItems: {
            [`${process.env.AWS_STOPS_TABLE_NAME}`]: putRequests,
          },
        });
        await docClient.send(command);
        // Assume stops were created successfully

        resolve(api_res.data);
      })
      .catch((err: any) => {
        console.error(err);

        resolve(null);
      })
      .finally(() => {
        resolve(null);
      });
  });
}
