// function for encrypt route
function encryptRoute(message, key) {
    let route = [];
    const lengthItems = Math.ceil(message.length/key);
    
    for (let i = 0; i < lengthItems; i++) {
        route[i] = [];
        for (var j = 0; j < key; j++) {
            route[i][j] = message.split('')[i * key + j];
        }
    }
    route[lengthItems-1] = route[lengthItems-1].map(val => val === undefined ? '@' : val);

    let encrypt = [];
    for (var j = 0; j < key; j++) {
        for (let i = 0; i < lengthItems; i++) {
            encrypt.push(route[i][j]);
        }
    }
    
    return encrypt.join('');
}

// function for decrypt route
function decryptRoute(message, key) {
    let route = [];
    const lengthItems = Math.ceil(message.length/key);

    for (let i = 0; i < key; i++) {
        route[i] = [];
        for (var j = 0; j < lengthItems; j++) {
            route[i][j] = message.split('')[i * lengthItems + j];
        }
    }

    let decrypt = [];
    for (var j = 0; j < lengthItems; j++) {
        for (let i = 0; i < key; i++) {
            if (route[i][j] !== '@') {
                decrypt.push(route[i][j]);
            }
        }
    }

    return decrypt.join('');
}

export { encryptRoute, decryptRoute }