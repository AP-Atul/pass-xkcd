const contains = (object, key) => {
    return Object.keys(object).indexOf(key) != -1;
}

const isarr = (object) => {
    return object instanceof Array;
}

module.exports = {
    contains, isarr
}