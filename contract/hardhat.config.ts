import { HardhatUserConfig } from "hardhat/config";
import 'dotenv/config'
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";

// console.log(process.env);

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    rskTestnet: {
      url: `https://rpc.testnet.rootstock.io/${process.env.ROOTSTOCK_API_KEY}`,
      chainId: 31,
      gasPrice: 60000000,
      accounts: [process.env.ROOTSTOCK_TESTNET_ACC_PRIVATE_KEY || ""],
    },
  },
  sourcify: {
    enabled: false,
  },
  etherscan: {
    apiKey: {
      // Is not required by blockscout. Can be any non-empty string
      rskTestnet: "RSK_TESTNET_RPC_URL",
      rskMainnet: "RSK_MAINNET_RPC_URL",
    },
    customChains: [
      {
        network: "rskTestnet",
        chainId: 31,
        urls: {
          apiURL: "https://rootstock-testnet.blockscout.com/api/",
          browserURL: "https://rootstock-testnet.blockscout.com/",
        },
      },
      {
        network: "rskMainnet",
        chainId: 30,
        urls: {
          apiURL: "https://rootstock.blockscout.com/api/",
          browserURL: "https://rootstock.blockscout.com/",
        },
      },
    ],
  },
};

export default config;
