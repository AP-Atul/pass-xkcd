const fs = require('fs');

const readfile = (filename) => {
    try {
        if (!fs.existsSync(filename)) fs.writeFileSync(filename, '');
        const data = fs.readFileSync(filename);
        return data.toString();
    } catch (e) {
        console.log(e);
        return '';
    }
}

const defoptions = {
    asyncWrite: false,
    syncOnWrite: true,
    jsonSpaces: 4
};

const validatejson = (content) => {
    try {
        JSON.parse(content);
    } catch (e) {
        throw new Error('empty file.');
    }
    return true;
};

class store {
    constructor(filepath, options) {
        if (!filepath || !filepath.length) {
            throw new Error('Missing file path argument.');
        } else {
            this.filepath = filepath;
        }

        if (options) {
            for (let key in defoptions) {
                if (!options.hasOwnProperty(key)) options[key] = defoptions[key];
            }
            this.options = options;
        } else {
            this.options = defoptions;
        }

        this.storage = {};

        // File existence check
        let stats;
        try {
            stats = fs.statSync(filepath);
        } catch (err) {
            if (err.code === 'ENOENT') {
                /* File doesn't exist */
                return;
            } else if (err.code === 'EACCES') {
                throw new Error(`Cannot access path "${filepath}".`);
            } else {
                // Other error
                throw new Error(`Error while checking for existence of path "${filepath}": ${err}`);
            }
        }
        /* File exists */
        try {
            fs.accessSync(filepath, fs.constants.R_OK | fs.constants.W_OK);
        } catch (err) {
            throw new Error(`Cannot read & write on path "${filepath}". Check permissions!`);
        }
        if (stats.size > 0) {
            let data;
            try {
                data = fs.readFileSync(filepath);
            } catch (err) {
                throw err;  // TODO: Do something meaningful
            }
            if (validatejson(data)) this.storage = JSON.parse(data);
        }
    }

    set(key, value) {
        this.storage[key] = value;
        if (this.options && this.options.syncOnWrite) this.sync();
    };

    get(key) {
        return this.storage.hasOwnProperty(key) ? this.storage[key] : undefined;
    };

    has(key) {
        return this.storage.hasOwnProperty(key);
    };

    starts(key) {
        return Object.keys(this.storage).filter((k) => k.startsWith(key));
    };

    delete(key) {
        let retVal = this.storage.hasOwnProperty(key) ? delete this.storage[key] : undefined;
        if (this.options && this.options.syncOnWrite) this.sync();
        return retVal;
    };

    sync() {
        if (this.options && this.options.asyncWrite) {
            fs.writeFile(this.filepath, JSON.stringify(this.storage, null, this.options.jsonSpaces), (err) => {
                if (err) throw err;
            });
        } else {
            try {
                fs.writeFileSync(this.filepath, JSON.stringify(this.storage, null, this.options.jsonSpaces));
            } catch (err) {
                if (err.code === 'EACCES') {
                    throw new Error(`Cannot access path "${this.filepath}".`);
                } else {
                    throw new Error(`Error while writing to path "${this.filepath}": ${err}`);
                }
            }
        }
    };
}


module.exports = {
    readfile, store
}