const { expect } = require('chai');
const parser = require('../src/parser');

describe('parser tests', () => {
    it('should parse default args', () => {
        const out = parser.parse('-n -c -s -sep'.split(' '));

        expect(out.symbols).to.be.true;
        expect(out.save).to.be.undefined;
        expect(out.nos).to.be.true;
        expect(out.caps).to.be.true;
        expect(out.seperator).to.be.undefined;
    });

    it('should parse add and return two vals', () => {
        const out = parser.add('-add one two'.split(' '));

        expect(out.key).to.eql('one');
        expect(out.val).to.eql('two');
    });

    it('should parse and return single values', () => {
        const d = parser.dump(['-dump']);
        const undef = parser.dump([]);
        expect(d).to.be.true;
        expect(undef).to.be.false;

        const rundef = parser.read(['-read']);
        const r = parser.read('-read g'.split(' '));
        expect(rundef).to.be.undefined;
        expect(r).to.eql('g');

        const cundef = parser.clear(['-cl']);
        const c = parser.clear('-clear g'.split(' '));
        expect(cundef).to.be.undefined;
        expect(c).to.be.eql('g');
    });
});

