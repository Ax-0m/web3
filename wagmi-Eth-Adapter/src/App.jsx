import {mainnet, base} from 'wagmi/chains'
import { createConfig, http, injected, useAccount, useBalance, useConnect, useSendTransaction, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { sendTransaction } from 'viem/actions';
import { defineBlock } from 'viem';

const queryClient = new QueryClient();


export const config = createConfig({
  chains: [mainnet, base],
  connectors: [
    injected(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http()
  }
})

function App() {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletConnector />
        <EthSend />
        <MyAddress />
      </QueryClientProvider>
    </WagmiProvider>
  )
}

function MyAddress() {
  const {address} = useAccount();
  const balance = useBalance({address})

  return <div>
    {address}
    {balance?.data?.value}<br />
    {balance?.data?.formatted}
  </div>
}

function EthSend() {

  const {data: hash, sendTransaction} = useSendTransaction()

  function sendEth() {
  sendTransaction({
    to: document.getElementById("address").value,
    value: "100000000000000000"
  })
}

return <div>
  <input id='address' type='text' placeholder='Address...' />
  <button onClick={sendEth}>Send 0.1 ETH</button>
</div>

}

function WalletConnector() {
  const { connectors, connect } = useConnect();

  return (
    <div>
      {connectors.map((connector) => (
        <button key={connector.uid} onClick={() => connect({ connector })}>
          {connector.name}
        </button>
      ))}
    </div>
  );
}

export default App