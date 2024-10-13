import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import LinkAddress from './LinkAddress';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton, BaseWalletMultiButton 
} from '@solana/wallet-adapter-react-ui';
// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';


export default function WalletConnect() {
  const { publicKey, connected, wallet, select, connect, disconnect } = useWallet();
  const address = publicKey ? publicKey.toBase58() : "";
const LABELS = {
    'change-wallet': 'Change wallet',
    connecting: 'Connecting ...',
    'copy-address': 'Copy address',
    copied: 'Copied',
    disconnect: 'Disconnect',
    'has-wallet': 'Connect',
    'no-wallet': 'Connect',
} as const;

  return (
    <BaseWalletMultiButton labels={LABELS}/>
  );
}
