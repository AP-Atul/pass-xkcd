const random = (max) => {
    return Math.floor(Math.random() * (Math.floor(max - 1) - 0 + 1)) + 0;
}

const fours = [1, 2, 3, 4];
const twos = [1, 2];

module.exports = {
    random, fours, twos
}