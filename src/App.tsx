import React, { Suspense } from 'react';
import './App.less';
import { ConnectionProvider } from './utils/connection';
import { GlobalStyle } from './global_style';
import { Spin } from 'antd';
import ErrorBoundary from './components/ErrorBoundary';
import { Routes } from './routes';
import { PreferencesProvider } from './utils/preferences';
import { ReferrerProvider } from './utils/referrer';

//wallet

import { WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

import {
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';

const network = WalletAdapterNetwork.Mainnet;
const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter({ network }),
    new LedgerWalletAdapter(),
];
  
export default function App() {
  return (
    <Suspense fallback={() => <Spin size="large" />}>
      <GlobalStyle/>
        <ConnectionProvider>
          <ReferrerProvider>
            <WalletProvider wallets={wallets} autoConnect>
             <WalletModalProvider>
              <PreferencesProvider>
                <Suspense fallback={() => <Spin size="large" />}>
                  <Routes />
                </Suspense>
              </PreferencesProvider>
             </WalletModalProvider>
            </WalletProvider>
          </ReferrerProvider>
        </ConnectionProvider>
    </Suspense>
  );
}
