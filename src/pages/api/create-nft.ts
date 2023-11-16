import { type NextApiRequest, type NextApiResponse } from "next";
import { create } from "kubo-rpc-client";

import { getIPFSUrl } from "@/utils";
import { NFTItem } from "@/types";

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
    bodyParser: true,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method Not Allowed" });
      return;
    }

    const polygonDataObject: Omit<NFTItem, "price"> = req.body;
    const added = await client.add(JSON.stringify(polygonDataObject));
    const url = getIPFSUrl(added);

    res.status(200).json({ url });
  } catch (error) {
    console.error(`Error handling NFT upload: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
