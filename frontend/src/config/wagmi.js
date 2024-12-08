import { rootstock, rootstockTestnet } from 'wagmi/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

export const config = getDefaultConfig({
  appName: 'Fineace',
  projectId: 'fc46a95e1edcd6b90af30fe257ab28be',
  chains: [rootstock, rootstockTestnet],
  // ssr: true, // If your dApp uses server side rendering (SSR)
});