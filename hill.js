// Hill Cipher Implementation
function hillEncrypt(text, key) {
    const matrix = parseHillKey(key);
    const preparedText = prepareHillText(text, matrix.length);
    let result = '';
    for (let i = 0; i < preparedText.length; i += matrix.length) {
        const block = preparedText.slice(i, i + matrix.length);
        const encrypted = multiplyMatrixVector(matrix, block);
        result += encrypted.map(num => String.fromCharCode(num + 'a'.charCodeAt(0))).join('');
    }
    return result;
}

function hillDecrypt(text, key) {
    const matrix = parseHillKey(key);
    const inverseMatrix = invertMatrix(matrix);
    const preparedText = prepareHillText(text, matrix.length);
    let result = '';
    for (let i = 0; i < preparedText.length; i += matrix.length) {
        const block = preparedText.slice(i, i + matrix.length);
        const decrypted = multiplyMatrixVector(inverseMatrix, block);
        result += decrypted.map(num => String.fromCharCode(num + 'a'.charCodeAt(0))).join('');
    }
    return result.replace(/x+$/, '');
}

function parseHillKey(key) {
    const rows = key.split(';');
    return rows.map(row => row.split(',').map(num => parseInt(num.trim())));
}

function prepareHillText(text, size) {
    text = text.toLowerCase().replace(/[^a-z]/g, '');
    const nums = text.split('').map(char => char.charCodeAt(0) - 'a'.charCodeAt(0));
    while (nums.length % size !== 0) {
        nums.push(23); // 'x'
    }
    return nums;
}

function multiplyMatrixVector(matrix, vector) {
    const result = [];
    for (let i = 0; i < matrix.length; i++) {
        let sum = 0;
        for (let j = 0; j < matrix[i].length; j++) {
            sum += matrix[i][j] * vector[j];
        }
        result.push(sum % 26);
    }
    return result;
}

function invertMatrix(matrix) {
    // Simplified inverse for 2x2 or 3x3 matrices
    const det = determinant(matrix);
    const invDet = modInverse(det, 26);
    if (matrix.length === 2) {
        return [
            [(matrix[1][1] * invDet) % 26, (-matrix[0][1] * invDet) % 26],
            [(-matrix[1][0] * invDet) % 26, (matrix[0][0] * invDet) % 26]
        ];
    }
    // For larger matrices, this is simplified
    throw new Error('Hill cipher inverse for matrices larger than 2x2 not implemented');
}

function determinant(matrix) {
    if (matrix.length === 2) {
        return (matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]) % 26;
    }
    throw new Error('Determinant for matrices larger than 2x2 not implemented');
}

function modInverse(a, m) {
    for (let i = 1; i < m; i++) {
        if ((a * i) % m === 1) return i;
    }
    throw new Error('No modular inverse exists');
}