"use server";
require("dotenv").config();
const pinataSDK = require("@pinata/sdk");
import { Readable } from "stream";

const PINATA_JWT = process.env.PINATA_JWT;

export default async function uploadJSONToIPFS(formData: FormData) {
  console.log("===========🎉 Start pin ipfs===========");

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const imageFile = formData.get("file") as File;

  if (!PINATA_JWT) {
    throw new Error("PINATA_JWT is not set in environment variables");
  }
  const pinata = new pinataSDK({ pinataJWTKey: PINATA_JWT });
  const auth_res = await pinata.testAuthentication();
  console.log(auth_res);

  //pin image to pinata
  const buffer = Buffer.from(await imageFile.arrayBuffer());

  const readableStream = new Readable();
  readableStream.push(buffer);
  readableStream.push(null);

  const image_options = {
    pinataMetadata: {
      name: "testImagePinata",
      keyvalues: {
        customKey: "customValue",
        customKey2: "customValue2",
      },
    },
    pinataOptions: {
      cidVersion: 0,
    },
  };

  const upload_image_res = await pinata.pinFileToIPFS(
    readableStream,
    image_options
  );
  console.log(upload_image_res);

  //pin json to pinata
  const body = {
    name,
    description,
    image: `ipfs://${upload_image_res.IpfsHash}`,
  };
  const json_options = {
    pinataMetadata: {
      name: "testJsonPinata",
      keyvalues: {
        customKey: "customValue",
        customKey2: "customValue2",
      },
    },
    pinataOptions: {
      cidVersion: 0,
    },
  };
  const upload_json_res = await pinata.pinJSONToIPFS(body, json_options);
  console.log(upload_json_res);
  console.log("===========🥳 Finish pin ipfs===========");
  return {
    ipfsUri: `https://ipfs.io/ipfs/${upload_json_res.IpfsHash}`,
    ipfsJson: body,
  };
}
