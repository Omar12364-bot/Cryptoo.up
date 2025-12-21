// AES Implementation using crypto-js
function aesEncrypt(text, key) {
    return CryptoJS.AES.encrypt(text, key).toString();
}

function aesDecrypt(text, key) {
    return CryptoJS.AES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
}