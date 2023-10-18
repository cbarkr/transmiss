import type { NextApiRequest, NextApiResponse } from 'next'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

import { Stop } from '@/models/reports/stop'


const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const stopReport = new Stop(
      req.body.stopID,
      req.body.personCount
    )

    console.log(stopReport)

    const command = new PutCommand({
      TableName: process.env.STOP_TABLE_NAME,
      Item: {
        // TODO: Insert stopReport
      },
    });
  
    const response = await docClient.send(command);

    console.log(response)

    res.status(201).json(stopReport)
  }
}