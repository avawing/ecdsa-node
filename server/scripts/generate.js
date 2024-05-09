const {secp256k1} = require("ethereum-cryptography/secp256k1")
const {toHex} = require("ethereum-cryptography/utils")

const USER_DICTIONARY = {}


function Init() {
    const balances = [100, 50, 75]
    for(let i = 0; i < balances.length; i++){
        const PRIVATE_KEY = secp256k1.utils.randomPrivateKey()
        const PUBLIC_KEY = secp256k1.getPublicKey(PRIVATE_KEY)
        const PUBLIC_KEY_HEX = toHex(PUBLIC_KEY)
        const ADDRESS = PUBLIC_KEY_HEX.slice(PUBLIC_KEY_HEX.length-20)

        USER_DICTIONARY[ADDRESS] = balances[i]
        console.log(toHex(PRIVATE_KEY), ADDRESS)
    }
}

module.exports = {
    Init,
    USER_DICTIONARY
}