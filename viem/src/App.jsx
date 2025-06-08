// gets the balance and all blocknumber and all

import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

function App() {

  async function getBalance() {
    const res = await client.getBalance({ address: "0x075c299cf3b9FCF7C9fD5272cd2ed21A4688bEeD"})
    console.log(res);
  }

  return (
    <div>
      <button onClick={getBalance}>Get Balance</button>
    </div>
  )
}

const client = createPublicClient({
  chain: mainnet,
  transport: http()
})

export default App;