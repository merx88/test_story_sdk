"use client";

import { useState } from "react";
import { useStory } from "@/lib/context/AppContext";
import uploadJSONToIPFS from "@/lib/functions/uploadJSONToIpfs";
import { useWalletClient } from "wagmi";
import { Address, toHex } from "viem";
import CryptoJS from "crypto-js";
import { useIpAsset } from "@story-protocol/react-sdk";

export default function RegisterIPA() {
  const { mintNFT, setTxHash, setTxLoading, setTxName, addTransaction } =
    useStory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const [nftId, setNftId] = useState("");
  const [nftContractAddress, setNftContractAddress] = useState("");
  const { data: wallet } = useWalletClient();
  // const { register } = useIpAsset();

  const mintAndRegisterNFT = async () => {
    if (!wallet?.account.address) return;
    setTxLoading(true);
    setTxName("Minting an NFT so it can be registered as an IP Asset...");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    //@ts-ignore
    formData.append("file", image);
    const { ipfsUri, ipfsJson } = await uploadJSONToIPFS(formData);
    //nft mint
    const tokenId = await mintNFT(wallet?.account.address as Address, ipfsUri);

    // registerExistingNFT(
    //   tokenId,
    //   "0xd2a4a4Cb40357773b658BECc66A6c165FD9Fc485",
    //   ipfsUri,
    //   ipfsJson
    // );
  };

  // const registerExistingNFT = async (
  //   tokenId: string,
  //   nftContract: Address,
  //   ipfsUri: string | null,
  //   ipfsJson: any | null
  // ) => {
  //   if (!wallet?.account.address) return;
  //   setTxLoading(true);
  //   setTxName("Registering an NFT as an IP Asset...");

  //   // Hash the string using SHA-256 and convert the result to hex
  //   const metadataHash = CryptoJS.SHA256(
  //     JSON.stringify(ipfsJson || {})
  //   ).toString(CryptoJS.enc.Hex);

  //   const response = await register({
  //     nftContract,
  //     tokenId,
  //     ipMetadata: {
  //       ipMetadataURI: ipfsUri || "test-ip-metadata-uri", // uri of IP metadata
  //       ipMetadataHash: `0x${metadataHash}`, // hash of IP metadata
  //       nftMetadataURI: ipfsUri || "test-nft-metadata-uri", // uri of NFT metadata
  //       nftMetadataHash: `0x${metadataHash}`, // hash of NFT metadata
  //     },
  //     txOptions: { waitForTransaction: true },
  //   });
  //   console.log(
  //     `Root IPA created at tx hash ${response.txHash}, IPA ID: ${response.ipId}`
  //   );
  //   setTxLoading(false);
  //   setTxHash(response.txHash as string);
  //   addTransaction(response.txHash as string, "Register IPA", {
  //     ipId: response.ipId,
  //   });
  // };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">
        Step 1b. Mint & register new IP
      </h2>
      <p className="text-gray-600 mb-4">
        Mint a new NFT to represent your IP and register it as an IP Asset.
      </p>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Doge"
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            placeholder="doge wif hat"
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            // @ts-ignore
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="mt-6 flex gap-3">
        <button
          onClick={mintAndRegisterNFT}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Register
        </button>
      </div>
    </div>
  );
}
