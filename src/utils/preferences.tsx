import React, {useContext, useState} from 'react';
import {sleep, useLocalStorageState} from './utils';
import {useInterval} from './useInterval';
import {useConnection} from './connection';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  useMarketInfos,
  useTokenAccounts,
} from './markets';
import {settleAllFunds} from './send';
import {PreferencesContextValues} from './types';
import {Market} from "@project-serum/serum";

export const AUTO_SETTLE_DISABLED_OVERRIDE = true;

const PreferencesContext = React.createContext<PreferencesContextValues | null>(
  null,
);

export function PreferencesProvider({ children }) {
  const [autoSettleEnabled, setAutoSettleEnabled] = useLocalStorageState(
    'autoSettleEnabled',
    true,
  );

  const [tokenAccounts] = useTokenAccounts();
  const { connected, wallet } = useWallet();
  const marketInfoList = useMarketInfos();
  const [currentlyFetchingMarkets, setCurrentlyFetchingMarkets] = useState<boolean>(false);
  const [markets, setMarkets] = useState<Map<string, Market>>(new Map())
  const addToMarketsMap = (marketId, market) => {
    setMarkets(prev => new Map(prev).set(marketId, market));
  }
  const connection = useConnection();

  return (
    <PreferencesContext.Provider
      value={{
        autoSettleEnabled,
        setAutoSettleEnabled,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('Missing preferences context');
  }
  return {
    autoSettleEnabled: context.autoSettleEnabled,
    setAutoSettleEnabled: context.setAutoSettleEnabled,
  };
}
