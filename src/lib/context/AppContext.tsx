"use client";
import { StoryClient, StoryConfig } from "@story-protocol/core-sdk";
import { PropsWithChildren, createContext } from "react";
import { useContext, useState } from "react";
import {
  createPublicClient,
  createWalletClient,
  Address,
  custom,
  http,
} from "viem";
import { sepolia } from "viem/chains";
import { defaultNftContractAbi } from "@/lib/defaultNftContractAbi";
import { useWalletClient } from "wagmi";
import { StoryProvider } from "@story-protocol/react-sdk";

interface AppContextType {
  txLoading: boolean;
  txHash: string;
  txName: string;
  transactions: { txHash: string; action: string; data: any }[];
  setTxLoading: (loading: boolean) => void;
  setTxHash: (txHash: string) => void;
  setTxName: (txName: string) => void;
  mintNFT: (to: Address, uri: string) => Promise<string>;
  addTransaction: (txHash: string, action: string, data: any) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useStory = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useStory must be used within a AppProvider");
  }
  return context;
};

export default function AppProvider({ children }: PropsWithChildren) {
  const [txLoading, setTxLoading] = useState<boolean>(false);
  const [txName, setTxName] = useState<string>("");
  const [txHash, setTxHash] = useState<string>("");
  const [transactions, setTransactions] = useState<
    { txHash: string; action: string; data: any }[]
  >([]);
  const { data: wallet } = useWalletClient();

  const mintNFT = async (to: Address, uri: string) => {
    if (!window.ethereum) return "";
    console.log("Minting a new NFT...");

    //create wallet client
    const walletClient = createWalletClient({
      account: wallet?.account.address as Address,
      chain: sepolia,
      transport: custom(window.ethereum),
    });
    console.log(`walletClient :${walletClient}`);
    //create public client
    const publicClient = createPublicClient({
      transport: custom(window.ethereum),
      chain: sepolia,
    });
    console.log(`publicClient :${publicClient}`);

    // const { request } = await publicClient.simulateContract({
    //   address: "0xe8E8dd120b067ba86cf82B711cC4Ca9F22C89EDc" as Address,
    //   functionName: "mint",
    //   args: [to, uri],
    //   abi: defaultNftContractAbi,
    // });
    const hash = await walletClient.writeContract({
      address: "0xd516482bef63Ff19Ed40E4C6C2e626ccE04e19ED",
      functionName: "mint",
      args: [to, uri],
      abi: defaultNftContractAbi,
    });

    console.log(`Minted NFT successful with hash: ${hash}`);

    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    const tokenId = Number(receipt.logs[0].topics[3]).toString();
    console.log(`Minted NFT tokenId: ${tokenId}`);
    addTransaction(hash, "Mint NFT", { tokenId });
    return tokenId;
  };

  const addTransaction = (txHash: string, action: string, data: any) => {
    setTransactions((oldTxs) => [...oldTxs, { txHash, action, data }]);
  };

  if (!wallet) {
    return (
      <AppContext.Provider
        value={{
          txLoading,
          txHash,
          txName,
          transactions,
          setTxLoading,
          setTxName,
          setTxHash,
          mintNFT,
          addTransaction,
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }

  return (
    <StoryProvider
      config={{
        chainId: "sepolia",
        transport: http("https://ethereum-sepolia-rpc.publicnode.com"),
        wallet: wallet,
      }}
    >
      <AppContext.Provider
        value={{
          txLoading,
          txHash,
          txName,
          transactions,
          setTxLoading,
          setTxName,
          setTxHash,
          mintNFT,
          addTransaction,
        }}
      >
        {children}
      </AppContext.Provider>
    </StoryProvider>
  );
}
