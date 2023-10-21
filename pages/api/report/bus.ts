import type { NextApiRequest, NextApiResponse } from "next";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

import { Bus } from "@/models/reports/bus";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
});
const docClient = DynamoDBDocumentClient.from(client);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const busReport = new Bus(
      req.body.stopID,
      req.body.busID,
      req.body.routeID,
      req.body.personCount
    );

    const command = new PutCommand({
      TableName: process.env.AWS_BUS_TABLE_NAME,
      Item: busReport,
    });

    await docClient.send(command);
    res.status(201).json(busReport);
  }
}
