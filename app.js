// 1- Require express
const express = require('express');

// 2- Initialize express
const app = express();

// 7- body-parser ==> global middleWare => To parse the data to json
app.use(express.json());

// 4- Create a Fake DataBase
let users = [
  {
    name: 'John Doe',
    email: 'john@gmail.com',
    id: 0,
  },
  {
    name: 'Jane Doe',
    email: 'jane@gmail.com',
    id: 1,
  },
];

// 5-
// @route GET /users
// @desc Display all contacts
// @method GET
app.get('/users', (req, res) => {
  res.send(users);
});

// 6-
// @route POST /add_user
// @desc Add A user
// @method POST
app.post('/add_user', (req, res) => {
  const newUser = req.body;
  newUser.id = Date.now();
  users = [...users, newUser];
  console.log(req.body);

  res.send({ msg: 'User Added', users });
});

// 8-
// @route PUT /users/:userId
// @desc Edit a user by id
// @method PUT
app.put('/users/:userId', (req, res) => {
  //Get the user id
  const id = req.params.userId;
  // Find the user to edit
  let userToEdit = users.find((user) => user.id.toString() === id);
  if (!userToEdit) {
    return res.status(404).send('User Not Found!');
  }
  userToEdit = { ...userToEdit, ...req.body };
  users = users.map((user) => (user.id.toString() === id ? userToEdit : user));

  res.send({ msg: 'User Edited', users });
});

// 9-
// @route DELETE /users/:userId
// @desc Delete a user by id
// @method DELETE
app.delete('/users/:userId', (req, res) => {
  const id = req.params.userId;
  users = users.filter((user) => user.id.toString() !== id);
  res.send({ msg: 'User Deleted', users });
});

// 3- Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`The JSON server is running on port ${port}`);
});
