const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'NodeJS Room',
    }, {
      id: '2',
      name: 'Jen',
      room: 'ReactJS Room',
    }, {
      id: '3',
      name: 'James',
      room: 'NodeJS Room',
    }];
  });

  it('should add new user', () => {
    let users = new Users();
    let user = {
      id: 123,
      name: 'Ryan',
      room: 'Most Awesome Room',
    };
    let resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    let userId = '1';
    let user = users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    let userId = '4';
    let user = users.removeUser(userId);
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    let userId = '2';
    let user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });

  it('should not find user', () => {
    let userId = '4';
    let user = users.getUser(userId);
    expect(user).toNotExist();
  });

  it('should return names for NodeJS Room', () => {
    let userList = users.getUserList('NodeJS Room');

    expect(userList).toEqual(['Mike', 'James']);
  });

  it('should return names for ReactJS Room', () => {
    let userList = users.getUserList('ReactJS Room');

    expect(userList).toEqual(['Jen']);
  });
});
