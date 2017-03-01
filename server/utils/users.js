[{
    id: '8t7vch2643jc42v3',
    name: 'USER NAME',
    room: 'ROOM NAME'
}]

//addUser(id, name, room)

//removeUser(id)

//getUser(id)

//getUserList(room)

class Users {
    constructor(){
        this.users = [];
    }

    addUser(id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        return this.users.filter((user) => {
            if(user.id === id){
                return this.users.splice(this.users.indexOf(user), 1);
            }
        })[0];
    }

    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    getUserList(room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);

        return namesArray;
    }

}

module.exports = {
    Users
}

// class Person {
//     constructor(userName, roomName){
//         this.id = new uuid();
//         this.userName = userName;
//         this.roomName - roomName;
//     }

//     getUserDescription () {
//         return ``;
//     }

// }

// var me = new Person();