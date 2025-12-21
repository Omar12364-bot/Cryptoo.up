// Substitution Cipher Implementation
function substitutionEncrypt(text, key) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const keyMap = {};
    for (let i = 0; i < alphabet.length; i++) {
        keyMap[alphabet[i]] = key[i] || alphabet[i];
    }
    return text.toLowerCase().replace(/[a-z]/g, char => keyMap[char]);
}

function substitutionDecrypt(text, key) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const reverseMap = {};
    for (let i = 0; i < alphabet.length; i++) {
        reverseMap[key[i] || alphabet[i]] = alphabet[i];
    }
    return text.toLowerCase().replace(/[a-z]/g, char => reverseMap[char]);
}