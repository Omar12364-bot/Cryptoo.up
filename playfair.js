// Playfair Cipher Implementation
function playfairEncrypt(text, key) {
    const matrix = generatePlayfairMatrix(key);
    const pairs = preparePlayfairText(text);
    let result = '';
    for (let pair of pairs) {
        result += encryptPlayfairPair(pair, matrix);
    }
    return result;
}

function playfairDecrypt(text, key) {
    const matrix = generatePlayfairMatrix(key);
    const pairs = preparePlayfairText(text);
    let result = '';
    for (let pair of pairs) {
        result += decryptPlayfairPair(pair, matrix);
    }
    return result.replace(/x/g, '');
}

function generatePlayfairMatrix(key) {
    const alphabet = 'abcdefghiklmnopqrstuvwxyz'; // i and j combined
    const uniqueKey = [...new Set(key.toLowerCase().replace(/j/g, 'i') + alphabet)].join('');
    const matrix = [];
    for (let i = 0; i < 5; i++) {
        matrix.push(uniqueKey.slice(i * 5, (i + 1) * 5).split(''));
    }
    return matrix;
}

function preparePlayfairText(text) {
    text = text.toLowerCase().replace(/[^a-z]/g, '').replace(/j/g, 'i');
    const pairs = [];
    for (let i = 0; i < text.length; i += 2) {
        let pair = text[i];
        if (i + 1 < text.length) {
            if (pair === text[i + 1]) {
                pair += 'x';
                i--;
            } else {
                pair += text[i + 1];
            }
        } else {
            pair += 'x';
        }
        pairs.push(pair);
    }
    return pairs;
}

function findPosition(matrix, char) {
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            if (matrix[row][col] === char) {
                return [row, col];
            }
        }
    }
    return null;
}

function encryptPlayfairPair(pair, matrix) {
    const [row1, col1] = findPosition(matrix, pair[0]);
    const [row2, col2] = findPosition(matrix, pair[1]);

    if (row1 === row2) {
        return matrix[row1][(col1 + 1) % 5] + matrix[row2][(col2 + 1) % 5];
    } else if (col1 === col2) {
        return matrix[(row1 + 1) % 5][col1] + matrix[(row2 + 1) % 5][col2];
    } else {
        return matrix[row1][col2] + matrix[row2][col1];
    }
}

function decryptPlayfairPair(pair, matrix) {
    const [row1, col1] = findPosition(matrix, pair[0]);
    const [row2, col2] = findPosition(matrix, pair[1]);

    if (row1 === row2) {
        return matrix[row1][(col1 + 4) % 5] + matrix[row2][(col2 + 4) % 5];
    } else if (col1 === col2) {
        return matrix[(row1 + 4) % 5][col1] + matrix[(row2 + 4) % 5][col2];
    } else {
        return matrix[row1][col2] + matrix[row2][col1];
    }
}