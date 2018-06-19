const uniqId = function() {
    let alp = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let length = 4;
    let rtn = '';

    for (let i = 0; i < length; i++) {
        rtn += alp.charAt(Math.floor(Math.random() * alp.length));
    }

    return btoa(rtn + (new Date().getTime()));
};

const hasDirective = function (haystack, key, value) {
    for (let i = 0; i < haystack.length; i++) {
        if (haystack[i][key] === value) {
            return i;
        }
    }

    return -1;
};

export {
    uniqId,
    hasDirective
}