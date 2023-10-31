import type { NextApiRequest, NextApiResponse } from "next";
const axios = require("axios").default;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    if (!req.query.stopID) {
      res.status(400).json({ message: "A stop number must be provided" });
      return;
    }

    if (req.query.stopID?.length !== 5) {
      res.status(400).json({ message: "Invalid stop number" });
      return;
    }

    const stopID = req.query.StopNo as string;
    const stopIDAsNum = Number.parseInt(stopID)

    if (stopIDAsNum <= 0) { 
      res.status(400).json({ message: "Invalid stop number" });
      return;
    }

    if (stopIDAsNum > 99999) {
      res.status(400).json({ message: "Invalid stop number" });
      return;
    }

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
      .then((api_res: any) => {
        console.log(api_res);

        res.status(200).json({ data: api_res.data });
      })
      .catch((err: any) => {
        console.error(err);

        res.status(500).json({ message: "Error retrieving stop data :(" });
      });
  }
}
