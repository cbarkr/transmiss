import { type NextRequest } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  GetCommand,
  PutCommand,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";

import { IStopDetails, IStoredStopDetails } from "@/interfaces/stop";
import { IAPIRes } from "@/interfaces/apiResponse";
import stopIDIsValid from "@/utils/validate";
import expiryEpochInSeconds from "@/utils/expiry";

const axios = require("axios").default;

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
});
const docClient = DynamoDBDocumentClient.from(client);

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const stopID = searchParams.get("stopID") as string;

  if (!stopIDIsValid(stopID)) {
    return Response.json(
      {
        message: "Invalid stop number",
      },
      { status: 400 },
    );
  }

  // Check if the requested stop is in the DB
  const db_stop = await getStopFromDB(stopID);
  if (db_stop) {
    return Response.json(
      {
        data: db_stop as IStopDetails,
      },
      { status: 200 },
    );
  }

  // Otherwise, retrieve from RTTI API
  const api_stop = await getStopFromRTTIAPI(stopID);
  if (api_stop) {
    return Response.json(
      {
        data: api_stop as IStopDetails,
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

async function getStopFromDB(
  stopID: string,
): Promise<Record<string, any> | null> {
  const command = new GetCommand({
    TableName: process.env.AWS_STOPS_TABLE_NAME,
    Key: {
      StopNo: Number.parseInt(stopID),
    },
  });

  const response = await docClient.send(command);
  return response.Item ? response.Item : null;
}

function getStopFromRTTIAPI(stopID: string): Promise<object | null> {
  return new Promise((resolve) => {
    axios
      .request({
        method: "GET",
        url: `http://api.translink.ca/RTTIAPI/V1/stops/${stopID}`,
        params: {
          apiKey: process.env.TRANSLINK_API_KEY,
        },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then(async (api_res: IAPIRes) => {
        // Strip distance from stop and add expiry
        let stop = api_res.data as IStoredStopDetails;
        // Set TTL
        stop.ExpirationTime = expiryEpochInSeconds();

        // Assume stop doesn't exist in DB, so add it!
        const command = new PutCommand({
          TableName: process.env.AWS_STOPS_TABLE_NAME,
          Item: stop,
        });
        await docClient.send(command);
        // Assume stop was created successfully

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
