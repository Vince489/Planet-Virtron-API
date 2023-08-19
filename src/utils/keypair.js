const nacl = require('tweetnacl');
const bs58 = require('bs58');

class Keypair {
  constructor() {
    const { publicKey, secretKey } = nacl.sign.keyPair();
    this.publicKey = bs58.encode(publicKey);
    this.privateKey = bs58.encode(secretKey);
  }

  static generate() {
    return new Keypair();
  }

  sign(message) {
    const privateKey = bs58.decode(this.privateKey);
    const messageData = new TextEncoder().encode(message);
    const signature = nacl.sign.detached(messageData, privateKey);
    return bs58.encode(signature);
  }

  static verify(message, signature, publicKey) {
    const messageData = new TextEncoder().encode(message);
    const signatureData = bs58.decode(signature);
    const publicKeyData = bs58.decode(publicKey);
    return nacl.sign.detached.verify(messageData, signatureData, publicKeyData);
  }
}



module.exports = Keypair;