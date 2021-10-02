#!/usr/bin/env node
const crypto = require('crypto');
const pass = require('./src/pass');
const f = require('./src/file');
const c = require('./src/c');
const s = require('./src/secret');
const p = require('./src/parser');

const args = process.argv.slice(2);
const store = new f.store(c.DB_FILE);
const words = f.readfile(c.WORDS_FILE).split('\n');

if (p.help(args)) {
    console.log(c.HELP);
    return;
}

if (p.import_(args)) {
    const file = p.import_(args);
    const vals = f.readfile(file).split('\n');

    vals.forEach((val) => {
        if (val.split(',').length != 2) return;
        const [site, pass] = val.split(',');
        store.set(site, s.encrypt(pass.trim()));
    });

    console.log('file imported');
    return;
}

if (p.add(args)) {
    const { key, val } = p.add(args);
    if (store.has(key)) {
        console.log('already exists for this site, creating new');
        const site = crypto.randomBytes(4);
        store.set(key + '_' + site, s.encrypt(val));

    } else {
        store.set(key, s.encrypt(val));
    }
    console.log(`${key} added to db`);
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
