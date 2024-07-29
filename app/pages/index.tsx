import type { NextPage } from "next";
import { CardanoWallet } from '../components/CardanoWallet';
import Notification from '../components/Notification';
import { useWallet } from '@meshsdk/react';
import { useState, useEffect, useCallback } from "react";
import { UTxO } from "@meshsdk/core";
import { fetchRelatedAssets, testBadAssets } from '../utils/badUnits'; // Adjust the path as needed
import { log } from "console";


const Home: NextPage = () => {
  const { connected, wallet, disconnect } = useWallet();
  const [network, setNetwork] = useState<number | null>(null);
  const [changeAddress, setChangeAddress] = useState<string | null>(null);
  const [notification, setNotification] = useState<string>('');
  const [badAssets, setBadAssets] = useState<string[]>([]);

  const clearNotification = () => setNotification('');

  const networkFlag = parseInt(process.env.NEXT_PUBLIC_NETWORK_FLAG!);

  const getNetworkId = useCallback(async () => {
    if (wallet) {
      const _network: number = await wallet.getNetworkId();
      const _changeAddress: string = await wallet.getChangeAddress();
      const _utxos: UTxO[] = await wallet.getUtxos();
      if (_network === 0) {
        setBadAssets(testBadAssets)
      } else {
        const _assets = await fetchRelatedAssets();
        setBadAssets(_assets);
      }
      setChangeAddress(_changeAddress);
      setNetwork(_network);
    }
  }, [wallet]);

  useEffect(() => {
    if (connected) {
      getNetworkId();
    } else {
      setNetwork(null);
    }
  }, [connected, getNetworkId]);

  useEffect(() => {
    // when in production change this to zero
    if (network !== null && network !== networkFlag) {
      const alertMsg = networkFlag === 0 ? 'pre-production' : 'mainnet';
      setNotification(`network must be set to ${alertMsg}`);
      disconnect(); // Automatically disconnect
    }
  }, [network, disconnect]);

  return (
    <div>
      {notification && <Notification message={notification} onDismiss={clearNotification} />}
      <div className="flex justify-start items-start p-4"><CardanoWallet /></div>
      {connected && network === networkFlag && (
        <div>
          <p className="light-text">check</p>
        </div>
      )}
    </div>
  );
};

export default Home;
