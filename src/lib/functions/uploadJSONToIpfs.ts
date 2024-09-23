"use server";
require("dotenv").config();
const pinataSDK = require("@pinata/sdk");
import { Readable } from "stream";

const PINATA_JWT = process.env.PINATA_JWT;

export default async function uploadJSONToIPFS(formData: FormData) {
  //pinata 설정
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

  // Readable 스트림 생성
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
    ipfsUri: `ipfs://${upload_json_res.IpfsHash}`,
    ipfsJson: body,
  };
}

// async function uploadJSONToIPFS(formData: FormData) {
//   const name = formData.get("name") as string;
//   const description = formData.get("description") as string;
//   const imageFile = formData.get("file") as File;

// First pin the image
// const data = new FormData();
// data.append("file", imageFile);
// const pinFileRes = await fetch(
//   "https://api.pinata.cloud/pinning/pinFileToIPFS",
//   {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${process.env.PINATA_JWT}`,
//     },
//     body: data,
//   }
// );
// const { IpfsHash: ImageIpfsHash } = await pinFileRes.json();

// Next pin the JSON
// const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT });

// const res = await pinata.testAuthentication();
// console.log(res);
// "message": "Congratulations! You are communicating with the Pinata API"!"

// const json = {
//   name,
//   description,
//   image: `ipfs://${ImageIpfsHash}`,
// };
// const { IpfsHash: JsonIpfsHash } = await pinata.pinJSONToIPFS(json);
// return { ipfsUri: `ipfs://${JsonIpfsHash}`, ipfsJson: json };
// }
