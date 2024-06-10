import { type NextRequest } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

import { Report } from "@/models/report";
import { ReportType } from "@/enums/reportTypes";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
});
const docClient = DynamoDBDocumentClient.from(client);

export async function POST(request: NextRequest) {
  const request_json = await request.json();

  const report = new Report({
    stop_id: request_json.stop_id,
    report_type: ReportType.BusFull,
    bus_id: request_json.bus_id,
    route_id: request_json.route_id,
    person_count: request_json.person_count,
  });

  const command = new PutCommand({
    TableName: process.env.AWS_REPORTS_TABLE_NAME,
    Item: report,
  });

  await docClient.send(command);

  return Response.json({
    status: 201,
    data: report,
  });
}
