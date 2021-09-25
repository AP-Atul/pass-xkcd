const path = require('path');
const static = path.resolve(__dirname, 'static/');

module.exports = {
    WORDS_FILE: path.join(static, 'words.txt'),
    DB_FILE: path.join(static, 'db.json'),
    separator: " ",

    symbols: ["@", "#", "$", "%", "&", "!"],
    nos: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],

    symbols_len: 6,
    nos_len: 10,

    HELP: `
Pass xkcd helps you to create passwords as per the xkcd suggestions.
You can use below options to favour some advances

Usage: passme -[options] [value]
    passme -sep -
    passme -n -s -c
    passme -save github.com
    passme -clear github
    passme -read git

Options:

  n      number, include numbers
  s      symbol, include symbols
  c      capital, includes captial
  save   write to encrypted db
  read   get from db
  clear  remove passwords with site
  sep    custom separator, (defaul: ' ') requires a separator string
  help   this help
  h      this help
`,
}