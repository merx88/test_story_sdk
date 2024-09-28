"use client";

import Link from "next/link";
import { useAccount, useConnect, useDisconnect, useGasPrice } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import RegisterIPA from "@/components/ResisterIPA";

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const result = useGasPrice();

  return (
    <>
      <DynamicWidget variant="modal" />
      <div>{result.data ? `${result.data} Gwei` : "가스 가격 로딩 중..."}</div>
      <div>
        <h2>계정</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === "connected" && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>
      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
      <h2>🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧</h2>
      <RegisterIPA />
      <h2>🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧</h2>
      <Link href="/resister">
        <button type="button">Resister 페이지로 이동</button>
      </Link>
    </>
  );
}

export default App;

// 0xda06760767b3a4794ce5cc7ccbb32819dcccb4d98359b42edde5b3fe6bb3a296
