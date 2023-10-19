import type { NextApiRequest, NextApiResponse } from "next";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

import { Stop } from "@/models/reports/stop";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION
});
const docClient = DynamoDBDocumentClient.from(client);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const stopReport = new Stop(req.body.stopID, req.body.personCount);

    const command = new PutCommand({
      TableName: process.env.AWS_STOP_TABLE_NAME,
      Item: stopReport
    });

    await docClient.send(command);
    res.status(201).json(stopReport);
  }
}
