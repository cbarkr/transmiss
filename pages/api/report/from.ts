import type { NextApiRequest, NextApiResponse } from "next";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

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
    }

    const stopID = Number.parseInt(req.query.StopNo as string);

    // Query reports from the past hour
    const datetime = new Date();
    datetime.setHours(datetime.getHours() - 1);

    const command = new QueryCommand({
      TableName: process.env.AWS_TABLE_NAME,
      Limit: 3, // Limit to 3 items
      ScanIndexForward: false, // Sort descending
      KeyConditionExpression:
        "#stop_id = :stop_id AND #report_datetime > :report_datetime",
      ExpressionAttributeNames: {
        "#stop_id": "stop_id",
        "#report_datetime": "report_datetime",
      },
      ExpressionAttributeValues: {
        ":stop_id": stopID,
        ":report_datetime": datetime.toISOString(),
      },
      ConsistentRead: true, // Respond with most up-to-date data
    });

    const response = await docClient.send(command);

    let reports: {
      route_id: string;
      stop_id: number;
      report_datetime: string;
      report_type: string;
    }[] = [];

    if (response.Items) {
      response.Items.forEach((i) => {
        let report = {
          route_id: i.route_id,
          stop_id: i.stop_id,
          report_datetime: i.report_datetime,
          report_type: i.report_type,
        };

        reports.push(report);
      });
    }

    res.status(200).json({ data: reports });
  }
}
