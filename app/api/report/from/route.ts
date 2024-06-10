import { type NextRequest } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

import { IReportFrom } from "@/interfaces/from";
import stopIDIsValid from "@/utils/validate";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
});
const docClient = DynamoDBDocumentClient.from(client);

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const stopID = searchParams.get("StopNo") as string;

  if (!stopID) {
    return Response.json(
      {
        message: "A stop number must be provided",
      },
      { status: 400 },
    );
  }

  if (!stopIDIsValid(stopID)) {
    return Response.json(
      {
        message: "Invalid stop number",
      },
      { status: 400 },
    );
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
      ":stop_id": Number.parseInt(stopID),
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

  return Response.json(
    {
      data: reports,
    },
    { status: 200 },
  );
}
