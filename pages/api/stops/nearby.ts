import type { NextApiRequest, NextApiResponse } from "next";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  BatchWriteCommand,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";

import { IStopDetails } from "@/interfaces/stop";
import { ILocationRequest } from "@/interfaces/locationRequest";
import { IAPIRes } from "@/interfaces/apiResponse";

const axios = require("axios").default;

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
});
const docClient = DynamoDBDocumentClient.from(client);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    if (!req.query.lat || !req.query.long) {
      res.status(400).json({ message: "A location must be provided" });
      return;
    }

    // Note: Translink API requires lat and lon be 6 decimals max
    const request = {
      lat: Number.parseFloat(req.query.lat!.toString()).toFixed(6),
      long: Number.parseFloat(req.query.long!.toString()).toFixed(6),
    };

    const api_stops = await getStopsFromRTTIAPI(request);

    if (api_stops) {
      res.status(200).json({ data: api_stops as IStopDetails[] });
      return;
    }

    // If we haven't returned by now, something has gone wrong
    res.status(500).json({ message: "Error retrieving stop data :(" });
  }
}

function getStopsFromRTTIAPI(
  request: ILocationRequest
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
        const putRequests = Object.values(api_res.data).map(
          (stop: IStopDetails) => ({
            PutRequest: {
              Item: stop,
            },
          })
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
