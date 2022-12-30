import { NextApiRequest, NextApiResponse } from "next";

export default function handler(red: NextApiRequest, res: NextApiResponse) {
  return res.json({message: 'Hello world'})
}