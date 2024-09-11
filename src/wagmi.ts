import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

export function getConfig() {
  return getDefaultConfig({
    appName: "My RainbowKit App",
    projectId: "10e05f1f031af44d7be702d737506c40",
    chains: [mainnet, sepolia],
    // connectors: [
    //   injected(),
    //   coinbaseWallet(),
    //   walletConnect({ projectId: process.env.YOUR_PROJECT_ID }),
    // ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
    },
  });
}

declare module "wagmi" {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
