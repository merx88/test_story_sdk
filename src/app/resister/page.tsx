"use client";

import { useState } from "react";
import { PIL_TYPE, useIpAsset, useNftClient } from "@story-protocol/react-sdk";
import Link from "next/link";
import { Address, toHex } from "viem";
import RegisterIPA from "@/components/ResisterIPA";

export default function Resister() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  // const [success, setSuccess] = useState<string | null>(null);
  // const { createNFTCollection } = useNftClient();
  // const { mintAndRegisterIpAssetWithPilTerms } = useIpAsset();

  // const handleMintNft = async () => {
  //   setIsLoading(true);
  //   setError(null);
  //   setSuccess(null);

  //   try {
  //     const newCollection = await createNFTCollection({
  //       name: "Test NFT",
  //       symbol: "ZZOM",
  //       txOptions: { waitForTransaction: true }, // 트랜잭션 대기를 비활성화
  //     });
  //     console.log(`NFT 컬렉션 생성 트랜잭션 제출됨: ${newCollection.txHash}`);
  //     setSuccess(`NFT 컬렉션 생성 트랜잭션 제출됨: ${newCollection.txHash}`);
  //     if (!newCollection || !newCollection.nftContract) {
  //       throw new Error("NFT 컬렉션 생성 실패: 컨트랙트 주소가 없습니다.");
  //     }

  //     console.log(
  //       `NFT 컬렉션 생성 완료. 컨트랙트 주소: ${newCollection.nftContract}`
  //     );
  //     try {
  //       const response = await mintAndRegisterIpAssetWithPilTerms({
  //         nftContract: newCollection.nftContract as Address, // an NFT contract address created by the SPG
  //         pilType: PIL_TYPE.NON_COMMERCIAL_REMIX,
  //         // https://docs.story.foundation/docs/ipa-metadata-standard
  //         metadata: {
  //           metadataURI: "test-uri",
  //           // uri of IP metadata

  //           metadataHash: toHex("test-metadata-hash", {
  //             size: 32,
  //           }),
  //           // hash of IP metadata

  //           nftMetadataHash: toHex("test-nft-metadata-hash", {
  //             size: 32,
  //           }),

  //           // hash of NFT metadata
  //         },
  //         txOptions: { waitForTransaction: true },
  //       });
  //       console.log(`IPA 생성 트랜잭션 제출됨: ${response.txHash}`);
  //     } catch (error) {
  //       console.error("IPA 생성 중 오류 발생:", error);
  //       if (error instanceof Error) {
  //         setError("IPA 생성 중 오류 발생: " + error.message);
  //       } else {
  //         setError("알 수 없는 오류가 발생했습니다.");
  //       }
  //     }

  //     // 선택적: 트랜잭션 확인을 별도로 처리
  //     // if (newCollection.txHash) {
  //     //   checkTransactionStatus(newCollection.txHash);
  //     // }
  //   } catch (error) {
  //     console.error("NFT 민팅 중 오류 발생:", error);
  //     if (error instanceof Error) {
  //       setError("NFT 민팅 중 오류 발생: " + error.message);
  //     } else {
  //       setError("알 수 없는 오류가 발생했습니다.");
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // // 트랜잭션 상태를 확인하는 함수
  // const checkTransactionStatus = async (txHash: string) => {
  //   // 여기에 트랜잭션 상태를 확인하는 로직을 구현
  //   // 예: 주기적으로 트랜잭션 상태를 확인하고 완료되면 NFT 컨트랙트 주소를 가져오는 등의 작업
  // };

  return (
    <>
      {/* <button onClick={handleMintNft} disabled={isLoading}>
        {isLoading ? "트랜잭션 제출 중..." : "NFT 민팅"}
      </button>
      {isLoading && (
        <div>트랜잭션을 제출하고 있습니다. 잠시만 기다려주세요.</div>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && <div style={{ color: "green" }}>{success}</div>}
      <div>
        상태:{" "}
        {isLoading
          ? "트랜잭션 제출 중"
          : error
            ? "오류 발생"
            : success
              ? "트랜잭션 제출됨"
              : "대기 중"}
      </div>
      <Link href="/">
        <button type="button">main 페이지로 이동</button>
      </Link> */}
      <RegisterIPA />
    </>
  );
}
