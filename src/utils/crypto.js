// initialization alphabet
const alphabet = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
    'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

// function for get code from alphabet
const getKeyByValue = (value) => {
    return Object.keys(alphabet).find(key => alphabet[key] === value);
}

// function for convert code to alphabet
const codeToString = (code) => {
    const result = code.map((kode) => {
        return alphabet[kode] ?? ' ';
    });
    return result;
}

export { getKeyByValue, codeToString }