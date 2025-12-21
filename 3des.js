// 3DES Implementation using crypto-js
function tripleDesEncrypt(text, key) {
    return CryptoJS.TripleDES.encrypt(text, key).toString();
}

function tripleDesDecrypt(text, key) {
    return CryptoJS.TripleDES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
}