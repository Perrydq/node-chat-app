const expect = require('expect');

const Users = require('./users');

describe('Users', () => {

    var users = new Users.Users();
    beforeEach(() => {
        users = new Users.Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        },
        {
            id: '2',
            name: 'Jen',
            room: 'React Course'
        },
        {
            id: '3',
            name: 'Julie',
            room: 'Node Course'
        }
        ];
    });

    it('should add a new User', () => {
        var user = {
            id: '123',
            name: 'Perry',
            room: 'The Office Fans'
        } 
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users[users.users.length-1]).toEqual(user);
    });

    it('should return names for Node Course', () => {
        var userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Mike', 'Julie']);
    });

    it('should return names for React Course', () => {
        var userList = users.getUserList('React Course');
        expect(userList).toEqual(['Jen']);
    });

    it('should remove a user', () => {
        var removedUser = users.removeUser('2');
        expect(users.users).toEqual([{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        },
        {
            id: '3',
            name: 'Julie',
            room: 'Node Course'
        }]);
        expect(removedUser).toEqual({
            id: '2',
            name: 'Jen',
            room: 'React Course'
        })
    });

    it('should not remove an invalid user', () => {
        var removedUser = users.removeUser('6');
        expect(users.users).toEqual([{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        },
        {
            id: '2',
            name: 'Jen',
            room: 'React Course'
        },
        {
            id: '3',
            name: 'Julie',
            room: 'Node Course'
        }
        ]);
        expect(removedUser).toNotExist();
    });

    it('should return a user', () => {
        var user = users.getUser('2');
        expect(user).toEqual({
            id: '2',
            name: 'Jen',
            room: 'React Course'
        });
    });

    it('should not find a user', () => {
        var user = users.getUser('7');
        expect(user).toNotExist();
    })
})