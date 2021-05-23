const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Users = require('../Model/users');
const mongoAtlasUri = 'mongodburi';

try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    mongoAtlasUri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Mongoose is connected')
  );
} catch (e) {
  console.log(e, 'could not connect');
}

router.get('/', (req, res) => {
  Users.find((err, resu) => {
    console.log(err);
    if (err) {
      resu.status(400);
      return err;
    }
    res.send(resu);
  });
  // res.send(req.body);
});

// api for register user
router.post('/register', async (req, res) => {
  let userData = { name: req.body.email, ...req.body };
  let user = new Users(userData);
  try {
    const regUser = await user.save();
    let payload = { subject: regUser._id };
    let token = jwt.sign(payload, 'secretkey');
    res.status(200).send({ email: regUser.email, token });
  } catch (error) {
    throw new Error(error.message);
  }
});

// api for login user
router.post('/login', async (req, res) => {
  let userData = req.body;
  try {
    const user = await Users.findOne({ email: userData.email });
    // if user not found
    if (!user) {
      res.status(401).send('Email not Found!');
    } else if (user.password !== userData.password) {
      // if you provide user password wrong
      res.status(401).send('Invalid Password!');
    } else {
      // if everything is ok / succesfully logged in
      let payload = { subject: user._id };
      let token = jwt.sign(payload, 'secretkey');
      res.status(200).send({ email: user.email, token });
    }
  } catch (error) {
    console.log('ye error aya bhai.....', err);
    throw new Error(error);
  }
});

// events api
router.get('/events', (req, res) => {
  let events = [
    {
      _id: '1',
      name: 'Auto Expo',
      description: 'lorem ipsum',
      date: '2012-04-23T18:25:43.511Z',
    },
    {
      _id: '2',
      name: 'Auto Expo',
      description: 'lorem ipsum',
      date: '2012-04-23T18:25:43.511Z',
    },
    {
      _id: '3',
      name: 'Auto Expo',
      description: 'lorem ipsum',
      date: '2012-04-23T18:25:43.511Z',
    },
    {
      _id: '4',
      name: 'Auto Expo',
      description: 'lorem ipsum',
      date: '2012-04-23T18:25:43.511Z',
    },
    {
      _id: '5',
      name: 'Auto Expo',
      description: 'lorem ipsum',
      date: '2012-04-23T18:25:43.511Z',
    },
    {
      _id: '6',
      name: 'Auto Expo',
      description: 'lorem ipsum',
      date: '2012-04-23T18:25:43.511Z',
    },
  ];
  res.json(events);
});

// special events
router.get('/special', verifyToken, (req, res) => {
  let specialEvents = [
    {
      _id: '1',
      name: 'Auto Expo Special',
      description: 'lorem ipsum',
      date: '2012-04-23T18:25:43.511Z',
    },
    {
      _id: '2',
      name: 'Auto Expo Special',
      description: 'lorem ipsum',
      date: '2012-04-23T18:25:43.511Z',
    },
    {
      _id: '3',
      name: 'Auto Expo Special',
      description: 'lorem ipsum',
      date: '2012-04-23T18:25:43.511Z',
    },
    {
      _id: '4',
      name: 'Auto Expo Special',
      description: 'lorem ipsum',
      date: '2012-04-23T18:25:43.511Z',
    },
    {
      _id: '5',
      name: 'Auto Expo Special',
      description: 'lorem ipsum',
      date: '2012-04-23T18:25:43.511Z',
    },
    {
      _id: '6',
      name: 'Auto Expo Special',
      description: 'lorem ipsum',
      date: '2012-04-23T18:25:43.511Z',
    },
  ];
  res.json(specialEvents);
});

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized Request');
  }

  let token = req.headers.authorization.split(' ')[1];
  if (token === 'null' || token === 'undefined') {
    return res.status(401).send('Unauthorized Request');
  }

  let payload = jwt.verify(token, 'secretkey');
  if (!payload) {
    return res.status(401).send('Unauthorized Request');
  }

  req.userId = payload.subject;
  next();
}

module.exports = router;
