import type { NextApiRequest, NextApiResponse } from "next";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  GetCommand,
  PutCommand,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";

import { IStopDetails } from "@/interfaces/stop";

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
    if (!req.query.stopID) {
      res.status(400).json({ message: "A stop number must be provided" });
      return;
    }

    if (req.query.stopID?.length !== 5) {
      res.status(400).json({ message: "Invalid stop number" });
      return;
    }

    const stopID = req.query.stopID as string;
    const stopIDAsNum = Number.parseInt(stopID);

    if (stopIDAsNum <= 0) {
      res.status(400).json({ message: "Invalid stop number" });
      return;
    }

    if (stopIDAsNum > 99999) {
      res.status(400).json({ message: "Invalid stop number" });
      return;
    }

    const stop = await getStopFromDB(stopIDAsNum);

    if (stop) {
      console.log("item returned from the DB!");
      res.status(200).json({ data: stop as IStopDetails });
      return;
    } else {
      return getStopFromRTTIAPI(stopIDAsNum, res);
    }
  }
}

async function getStopFromDB(stopID: number) {
  const command = new GetCommand({
    TableName: process.env.AWS_STOPS_TABLE_NAME,
    Key: {
      StopNo: stopID,
    },
  });

  const response = await docClient.send(command);
  return response.Item ? response.Item : null;
}

function getStopFromRTTIAPI(stopID: number, res: NextApiResponse) {
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
    .then(async (api_res: any) => {
      const command = new PutCommand({
        TableName: process.env.AWS_STOPS_TABLE_NAME,
        Item: api_res.data as IStopDetails,
      });
      await docClient.send(command);
      // Assume stop was created successfully

      res.status(200).json({ data: api_res.data as IStopDetails });
    })
    .catch((err: any) => {
      console.error(err);

      res.status(500).json({ message: "Error retrieving stop data :(" });
    });
}
