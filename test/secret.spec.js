const { expect } = require('chai');
const secret = require('../src/secret');

describe('secret tests', () => {
    it('should encrypt and decrypt', () => {
        const enc = secret.encrypt('mypass');
        const dec = secret.decrypt(enc);

        expect(enc).not.eql('mypass');
        expect(enc).not.eql(dec);
        expect(dec).to.eql('mypass');
    });
});