#!/usr/bin/env node
const crypto = require('crypto');
const pass = require('./src/pass');
const f = require('./src/file');
const c = require('./src/c');
const s = require('./src/secret');
const p = require('./src/parser');

const args = process.argv.slice(2);
const store = new f.store(c.DB_FILE);
const words = f.readfile(c.WORDS_FILE).split("\n");

if (p.help(args)) {
    console.log(c.HELP);
    return;
}

if (p.dump(args)) {
    const val = store.storage;
    return Object.keys(val).length > 0 ?
        Object.keys(val).map((k) => {
            console.log(`${k}, ${s.decrypt(val[k])}`);
        })
        : console.log('empty');
}

if (p.clear(args)) {
    const val = store.starts(p.clear(args));
    val.map((v) => store.delete(v)); return;
}

if (p.read(args)) {
    const val = store.starts(p.read(args));
    console.log(val.map((v) => s.decrypt(store.get(v)))); return;
}

const options = p.parse(args);
const password = pass.gen({
    ...options,
    words: words
});
console.log(password);

if (options.save) {
    if (store.has(options.save)) {
        console.log('already exists for this site, creating new');
        const site = crypto.randomBytes(4);
        store.set(options.save + '_' + site, s.encrypt(password));

    } else {
        store.set(options.save, s.encrypt(password));
    }
    console.log('wrote to db');
}