import CryptoJS from 'crypto-js';

const sharedKey = 'ag44g4ae45g4a5e44g544ae54g4ae654g65aeg546aeg56ae4gzrl^gleaq@a';
const message = 'Bonsoir le monde !';

const iv = CryptoJS.lib.WordArray.random(16);
const encryptedMessage = CryptoJS.AES.encrypt(message, sharedKey, { iv: iv }).toString();
const ivString = iv.toString();

console.log(encryptedMessage)

const ivDecrypt = CryptoJS.enc.Hex.parse(ivString);
const bytes = CryptoJS.AES.decrypt(encryptedMessage, sharedKey, { iv: ivDecrypt });
const decryptedMessage = bytes.toString(CryptoJS.enc.Utf8);

console.log(decryptedMessage);
