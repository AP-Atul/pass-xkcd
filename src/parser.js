const find = (arr, str) => arr.findIndex((a) => a === str) !== -1;

const index = (arr, str) => arr.findIndex((a) => a === str);

const parse = (args) => {
    if (args.length == 0)
        return {};

    return {
        symbols: find(args, '-s'),
        save: find(args, '-save') ? args[index(args, '-save') + 1] : undefined,
        nos: find(args, '-n'),
        caps: find(args, '-c'),
        separator: find(args, '-sep') ? args[index(args, '-sep') + 1] : undefined
    }
}

const help = (args) => {
    return (find(args, '-h') || find(args, '-help'));
}

const read = (args) => {
    return find(args, '-read') ? args[index(args, '-read') + 1] : undefined;
}

const clear = (args) => {
    return find(args, '-clear') ? args[index(args, '-clear') + 1] : undefined;
}

const dump = (args) => {
    return find(args, '-dump');
}

module.exports = {
    parse, help, read, clear, dump
};