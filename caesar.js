// Caesar Cipher Implementation
function caesarEncrypt(text, shift) {
    return text.replace(/[a-z]/gi, letter => {
        const start = letter >= 'a' ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
        return String.fromCharCode(((letter.charCodeAt(0) - start + shift) % 26) + start);
    });
}

function caesarDecrypt(text, shift) {
    return caesarEncrypt(text, 26 - shift);
}