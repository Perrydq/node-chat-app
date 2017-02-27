var expect = require('expect');

var {generateMessage} = require('./message');

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
    })
})