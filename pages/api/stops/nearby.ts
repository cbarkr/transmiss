import type { NextApiRequest, NextApiResponse } from "next";
const axios = require("axios").default;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    if (!req.query.lat || !req.query.long) {
      res.status(400).json({ message: "A location must be provided" });
    }

    // Note: Translink API requires lat and lon be 6 decimals max
    const request = {
      lat: Number.parseFloat(req.query.lat!.toString()).toFixed(6),
      long: Number.parseFloat(req.query.long!.toString()).toFixed(6),
    };

    axios
      .request({
        method: "GET",
        url: "http://api.translink.ca/RTTIAPI/V1/stops",
        params: {
          apiKey: process.env.TRANSLINK_API_KEY,
          lat: request.lat,
          long: request.long,
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
