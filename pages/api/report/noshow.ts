import type { NextApiRequest, NextApiResponse } from "next";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

import { Report } from "@/models/report";
import { ReportType } from "@/enums/reportType";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
});
const docClient = DynamoDBDocumentClient.from(client);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const report = new Report({
      stop_id: req.body.stop_id, 
      report_type: ReportType.NoShow,
      bus_id: req.body.bus_id,
      route_id: req.body.route_id,
      person_count: req.body.person_count
    });

    const command = new PutCommand({
      TableName: process.env.AWS_REPORTS_TABLE_NAME,
      Item: report,
    });

    await docClient.send(command);
    res.status(201).json({ data: report });
  }
}
