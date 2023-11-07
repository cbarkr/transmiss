import type { NextApiRequest, NextApiResponse } from "next";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

import { IReportFrom } from "@/interfaces/from";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
});
const docClient = DynamoDBDocumentClient.from(client);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    if (!req.query.StopNo) {
      res.status(400).json({ message: "A stop number must be provided" });
      return;
    }

    const stopIDAsNum = Number.parseInt(req.query.StopNo as string);

    if (stopIDAsNum <= 0) { 
      res.status(400).json({ message: "Invalid stop number" });
      return;
    }

    if (stopIDAsNum > 99999) {
      res.status(400).json({ message: "Invalid stop number" });
      return;
    }

    // Query reports from the past hour
    const datetime = new Date();
    datetime.setHours(datetime.getHours() - 1);

    const command = new QueryCommand({
      TableName: process.env.AWS_REPORTS_TABLE_NAME,
      Limit: 3, // Limit to 3 items
      ScanIndexForward: false, // Sort descending
      KeyConditionExpression:
        "#stop_id = :stop_id AND #report_datetime > :report_datetime",
      ExpressionAttributeNames: {
        "#stop_id": "stop_id",
        "#report_datetime": "report_datetime",
      },
      ExpressionAttributeValues: {
        ":stop_id": stopIDAsNum,
        ":report_datetime": datetime.toISOString(),
      },
    });

    const response = await docClient.send(command);

    let reports: IReportFrom[] = [];

    if (response.Items) {
      response.Items.forEach((i) => {
        let report = {
          stop_id: i.stop_id,
          report_type: i.report_type,
          report_datetime: i.report_datetime,
          route_id: i.route_id,
        };

        reports.push(report);
      });
    }

    res.status(200).json({ data: reports });
  }
}
