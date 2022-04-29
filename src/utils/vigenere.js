import alphabet from './crypto';

// function for get code from alphabet
function getKeyByValue(value) {
    return parseInt(Object.keys(alphabet).find(key => alphabet[key] === value));
}

// function for convert code to alphabet
function codeToString(code) {
    const result = code.map((kode) => {
        return alphabet[kode] ?? ' ';
    });
    return result;
}

// function for reset key
const newKey = (message, key) => {
    if (key.length > message.length) {
        return key.split('').slice(0, message.length).join('');
    } else {
        let shadowKey = '';
        for (let i = 0; i < Math.ceil(message.length / key.length); i++) {
            shadowKey += key;
        }
        return key + shadowKey.split('').slice(0, message.length - key.length).join('');
    }
}

// function for encrypt vigenere
function encryptVigenere(message, handleKeyVigenere) {
    const codeKey = handleKeyVigenere().split('').map(letter => getKeyByValue(letter));
    const codeAlphabet = message.split('').map(letter => {
        return getKeyByValue(letter);
    });

    const encrypt = codeAlphabet.map((code, index) => {
        return (((parseInt(code) + parseInt(codeKey[index])) % 26) + 26) % 26;
    });

    return encrypt;
}

// function for decrypt vigenere
function decryptVigenere(encrypt, handleKeyVigenere) {
    const codeKey = handleKeyVigenere().split('').map(letter => getKeyByValue(letter));
    
    const decrypt = encrypt.map((code, index) => {
        return (((parseInt(code) - parseInt(codeKey[index])) % 26) + 26) % 26;
    });

    return decrypt;
}

export { getKeyByValue, codeToString, newKey, encryptVigenere, decryptVigenere }