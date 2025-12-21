// RSA Implementation (Simplified)
let rsaKeys = null;

function generateRSAKeys() {
    const p = 61, q = 53; // Small primes for demo
    const n = p * q;
    const phi = (p - 1) * (q - 1);
    const e = 17; // Public exponent
    const d = modInverse(e, phi); // Private exponent
    return { publicKey: { e, n }, privateKey: { d, n } };
}

function rsaEncrypt(text, key) {
    if (!rsaKeys) rsaKeys = generateRSAKeys();
    const { e, n } = rsaKeys.publicKey;
    return text.split('').map(char => {
        const m = char.charCodeAt(0);
        return Math.pow(m, e) % n;
    }).join(',');
}

function rsaDecrypt(text, key) {
    if (!rsaKeys) throw new Error('RSA keys not generated');
    const { d, n } = rsaKeys.privateKey;
    return text.split(',').map(num => {
        const c = parseInt(num);
        const m = Math.pow(c, d) % n;
        return String.fromCharCode(m);
    }).join('');
}

function modInverse(a, m) {
    for (let i = 1; i < m; i++) {
        if ((a * i) % m === 1) return i;
    }
    throw new Error('No modular inverse exists');
}