import { useWalletList } from '@meshsdk/react';
import React from 'react';

interface WalletBalanceProps {
  connected: boolean;
  name?: string;
  connecting: boolean;
  label: string;
}

export const WalletBalance: React.FC<WalletBalanceProps> = ({ connected, name, connecting, label }) => {
  const wallet = useWalletList().find((wallet) => wallet.name === name);

  return (
    <div className='flex item-center'>
      {connected && wallet?.icon ? (
        <>
          <img src={wallet.icon} className="h-5 m-0.5" alt="Wallet Icon" />
          <span className="">
            Connected!
          </span>
        </>
      ) : connected && wallet?.icon ? (
        <>
          <img src={wallet.icon} className="h-5 m-1" alt="Wallet Icon" />
        </>
      ) : connecting ? (
        <span>Connecting...</span>
      ) : (
        <>
          {label}
        </>
      )}
    </div>
  );
};
