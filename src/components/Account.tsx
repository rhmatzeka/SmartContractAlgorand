// Import the useWallet hook to access wallet information (e.g., active address)
import { useWallet } from '@txnlab/use-wallet-react'
// Import useMemo for memoization and performance optimization
import { useMemo } from 'react'
// Utility function to shorten long Algorand addresses (e.g., "ABCD...XYZ")
import { ellipseAddress } from '../utils/ellipseAddress'
// Function to get Algorand client configuration from the Vite environment variables
import { getAlgodConfigFromViteEnvironment } from '../utils/network/getAlgoClientConfigs'

// Account component displays the user's wallet address and current network
const Account = () => {
  // Extract the currently active wallet address from the wallet hook
  const { activeAddress } = useWallet()

  // Retrieve Algorand network configuration (e.g., testnet, mainnet, localnet)
  const algoConfig = getAlgodConfigFromViteEnvironment()

  // Compute the network name once (memoized for efficiency)
  // If the network string is empty, default to 'localnet'
  const networkName = useMemo(() => {
    return algoConfig.network === '' ? 'localnet' : algoConfig.network.toLocaleLowerCase()
  }, [algoConfig.network])

  return (
    <div>
      {/* Display a clickable shortened address linking to the Algorand account explorer */}
      <a
        className="text-xl"
        target="_blank"
        href={`https://lora.algokit.io/${networkName}/account/${activeAddress}/`}
      >
        Address: {ellipseAddress(activeAddress)}
      </a>

      {/* Display the current network name */}
      <div className="text-xl">Network: {networkName}</div>
    </div>
  )
}

// Export the Account component as default
export default Account
