import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1.js";
import {toHex} from "ethereum-cryptography/utils";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    const publicKey = toHex(secp.secp256k1.getPublicKey(privateKey));
    const address = publicKey.slice(publicKey.length-20)
    setPrivateKey(privateKey);
    setAddress(address)
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
      <div className="container wallet">
        <h1>Your Wallet</h1>

        <label>
          Private Key
          <input placeholder="Type an address, for example: 0x1" value={privateKey} onChange={onChange}></input>
        </label>

        <div className="balance">Balance: {balance}</div>
        <div className="balance">Address: {address}</div>

      </div>
  );
}

export default Wallet;
