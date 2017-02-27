var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        //store response in variable
        const message = generateMessage('tester', 'hello this is tester');
        expect(message.from).toBe('tester');
        expect(message.text).toBe('hello this is tester');
        expect(message.createdAt).toBeA('number');
        //assert from is correct
        //text matches
        //assert that created at is a number
    });
});

describe('generateLocationMessage', () => {
    it('should generate a correct location object', () => {
        const message = generateLocationMessage('tester', 1.2345, -5.4321);
        expect(message.url).toBe('https://www.google.com/maps?q=1.2345,-5.4321');
        expect(message.from).toBe('tester');
    });
});