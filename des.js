// DES Implementation using crypto-js
function desEncrypt(text, key) {
    return CryptoJS.DES.encrypt(text, key).toString();
}

function desDecrypt(text, key) {
    return CryptoJS.DES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
}