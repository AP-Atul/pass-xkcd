const m = require('./math');
const c = require('./c');

const sanitize = (options) => {
    return {
        ...options,
        separator: options.separator ?? c.separator
    }
}

const gen = (options) => {
    const { words, caps, nos, symbols, separator } = sanitize(options);
    const words_len = words.length;

    const generated = m.fours.map(() => words[m.random(words_len)]);

    if (symbols)
        generated.push(m.twos.reduce((accum, t) =>
            accum + c.symbols[m.random(c.symbols_len)].toString()
            , "")
        );

    if (nos)
        generated.push(m.twos.reduce((accum, t) =>
            accum + c.nos[m.random(c.nos_len)].toString()
            , "")
        );

    const generated_string = generated.join(separator);

    return caps
        ? generated_string[0].toUpperCase().concat(generated_string.slice(1))
        : generated_string;
}

module.exports = {
    gen
};