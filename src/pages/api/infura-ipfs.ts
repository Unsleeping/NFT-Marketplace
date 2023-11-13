import { NextApiRequest, NextApiResponse } from "next";
import { create } from "kubo-rpc-client";
import { createReadStream } from "fs";
import { IncomingForm, File } from "formidable";

const { INFURA_PROJECT_ID, INFURA_PROJECT_SECRET } = process.env;

const auth = `Basic ${Buffer.from(
  `${INFURA_PROJECT_ID}:${INFURA_PROJECT_SECRET}`
).toString("base64")}`;

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(`Error parsing form data: ${err}`);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const fileAttachment = files.file_attachment as File[];

      if (!fileAttachment) {
        return res
          .status(400)
          .json({ error: "File not provided in the request" });
      }

      const added = await client.add(
        createReadStream(fileAttachment[0].filepath)
      );
      const url = `https://unsleeping.infura-ipfs.io/ipfs/${added.cid}`;

      res.status(200).json({ url });
    });
  } catch (error) {
    console.error(`Error handling file upload: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
