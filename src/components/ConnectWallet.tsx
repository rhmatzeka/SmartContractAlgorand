// Importing necessary hooks and types from the Algorand wallet SDK
import { useWallet, Wallet, WalletId } from '@txnlab/use-wallet-react'
import Account from './Account'

// Define the expected props for the ConnectWallet component
interface ConnectWalletInterface {
  openModal: boolean  // Controls visibility of the modal
  closeModal: () => void  // Function to close the modal
}

// Component responsible for connecting and managing wallet providers
const ConnectWallet = ({ openModal, closeModal }: ConnectWalletInterface) => {
  // useWallet() provides wallet list, active wallet address, and utility functions
  const { wallets, activeAddress } = useWallet()

  // Helper function to identify if the wallet is a KMD (LocalNet) wallet
  const isKmd = (wallet: Wallet) => wallet.id === WalletId.KMD

  return (
    // Dialog component for selecting and connecting a wallet
    <dialog
      id="connect_wallet_modal"
      className={`modal ${openModal ? 'modal-open' : ''}`}
      style={{ display: openModal ? 'block' : 'none' }}
    >
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-2xl">Select wallet provider</h3>

        {/* Wallet list and account info section */}
        <div className="grid m-2 pt-5">
          {/* If already connected, show active account info */}
          {activeAddress && (
            <>
              <Account />
              <div className="divider" />
            </>
          )}

          {/* If not connected, list all available wallet providers */}
          {!activeAddress &&
            wallets?.map((wallet) => (
              <button
                data-test-id={`${wallet.id}-connect`}
                className="btn border-teal-800 border-1 m-2"
                key={`provider-${wallet.id}`}
                onClick={() => {
                  // Trigger wallet connection
                  return wallet.connect()
                }}
              >
                {/* Show wallet icon unless it's KMD (LocalNet) */}
                {!isKmd(wallet) && (
                  <img
                    alt={`wallet_icon_${wallet.id}`}
                    src={wallet.metadata.icon}
                    style={{ objectFit: 'contain', width: '30px', height: 'auto' }}
                  />
                )}
                {/* Wallet display name (or fallback for KMD) */}
                <span>{isKmd(wallet) ? 'LocalNet Wallet' : wallet.metadata.name}</span>
              </button>
            ))}
        </div>

        {/* Modal footer actions */}
        <div className="modal-action grid">
          {/* Close modal button */}
          <button
            data-test-id="close-wallet-modal"
            className="btn"
            onClick={() => {
              closeModal()
            }}
          >
            Close
          </button>

          {/* Logout button only visible if user is connected */}
          {activeAddress && (
            <button
              className="btn btn-warning"
              data-test-id="logout"
              onClick={async () => {
                if (wallets) {
                  // Find the currently active wallet and disconnect it
                  const activeWallet = wallets.find((w) => w.isActive)
                  if (activeWallet) {
                    await activeWallet.disconnect()
                  } else {
                    // Cleanup fallback in case of inactive or switched network
                    // Clears local storage and reloads app to reset state
                    localStorage.removeItem('@txnlab/use-wallet:v3')
                    window.location.reload()
                  }
                }
              }}
            >
              Logout
            </button>
          )}
        </div>
      </form>
    </dialog>
  )
}

export default ConnectWallet
