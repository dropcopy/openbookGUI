import BalancesTable from './BalancesTable';
import OpenOrderTable from './OpenOrderTable';
import React, {useState } from 'react';
import { Button, Tabs, Typography } from 'antd';
import styled from 'styled-components';
import FillsTable from './FillsTable';
import FloatingElement from '../layout/FloatingElement';
import { useOpenOrders,
       useBalances, 
       useMarket,
       useTokenAccounts,
      getSelectedTokenAccountForMint, } from '../../utils/markets';
import { crankMarket } from '../../utils/send';
import { useSendConnection } from '../../utils/connection';
import { useWallet } from '@solana/wallet-adapter-react';
import { notify } from '../../utils/notifications';

const { Paragraph } = Typography;
const { TabPane } = Tabs;

const CrankButton = styled(Button)`
  color: #2abdd2;
  background-color: #0D1111;
  border-width: 0px;
`;

export default function Index() {
  const { marketName, market } = useMarket();
  const [accounts] = useTokenAccounts();
  const connection = useSendConnection();
  const { wallet } = useWallet();
  const [canCrank, setcanCrank] = useState(true);
  
  async function onCrank(market) {
    try {
      await crankMarket({
        market,
        connection,
        wallet,
        baseCurrencyAccount: getSelectedTokenAccountForMint(
          accounts,
          market?.baseMintAddress,
        ),
        quoteCurrencyAccount: getSelectedTokenAccountForMint(
          accounts,
          market?.quoteMintAddress,
        ),
      });
    } catch (e) {
      notify({
        message: 'Error cranking market',
        description: e.message,
        type: 'error',
      });
      return;
    }
  }

  return (
    <FloatingElement style={{ flex: 1, paddingTop: 20, backgroundColor: '#070a0a' }}>
      <Typography>
        <Paragraph style={{ color: 'rgba(255,255,255,0.5)'}}>
         Funds not settling? &nbsp;
      <CrankButton style={{ marginRight: 8 }}
      disabled={!canCrank}
      onClick={() => onCrank(market)}
      >
        Crank [ {marketName} ]
      </CrankButton>
        </Paragraph>
      </Typography>
      <Tabs defaultActiveKey="orders">
        <TabPane tab="Open Orders" key="orders">
          <OpenOrdersTab />
        </TabPane>
        <TabPane tab="Recent Trade History" key="fills">
          <FillsTable />
        </TabPane>
        <TabPane tab="Balances" key="balances">
          <BalancesTab />
        </TabPane>
      </Tabs>
    </FloatingElement>
  );
}

const OpenOrdersTab = () => {
  const openOrders = useOpenOrders();

  return <OpenOrderTable openOrders={openOrders} />;
};

const BalancesTab = () => {
  const balances = useBalances();

  return <BalancesTable balances={balances} />;
};
