const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../Model/user');
const db = 'mongodb://mquanit:danzakuduro12345@ds113853.mlab.com:13853/starter-db';

mongoose.connect(db, { useNewUrlParser: true }, err => {
  if (err) {
    throw new Error(err);
  }
  console.log('Succesfully connected...');
});


router.get('/', (req, res) => {
  User.find((err, resu) => {
    if (err) {
      resu.status(400);
      return err;
    };
    res.send(resu);
  })
  // res.send(req.body);
});

// api for register user 
router.post('/register', (req, res) => {
  let userData = req.body;
  let user = new User(userData);
  user.save((err, regUser) => {
    if (err) {
      throw new Error(err);
    }
    let payload = { subject: regUser._id }
    let token = jwt.sign(payload, 'secretkey');
    res.status(200).send({ email: regUser.email, token });
  });
});

// api for login user
router.post('/login', (req, res) => {
  let userData = req.body;
  console.log('email ye bhji ha...', userData.email)
  User.findOne({ email: userData.email }, (err, user) => {
    // if there is some server error
    if (err) {
      console.log('ye error aya bhai.....', err);
      throw new Error(err);
    } else {
      // if user not found
      if (!user) {
        res.status(401).send('Email not Found!');
      } else if (user.pwd !== userData.pwd) {
        // if you provide user password wrong
        res.status(401).send('Invalid Password!');
      } else {
        // if everything is ok / succesfully logged in
        let payload = { subject: user._id }
        let token = jwt.sign(payload, 'secretkey');
        res.status(200).send({ email: user.email, token });
      }
    }
  });
});

// events api
router.get('/events', (req, res) => {
  let events = [
    {
      "_id": "1",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ];
  res.json(events);
});

// special events
router.get('/special', verifyToken, (req, res) => {
  let specialEvents = [
    {
      "_id": "1",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ]
  res.json(specialEvents)
});

function verifyToken(req, res, next) {
  if (!req.headers.authorization) { return res.status(401).send('Unauthorized Request'); }

  let token = req.headers.authorization.split(' ')[1];
  if (token === 'null' || token === 'undefined') { return res.status(401).send('Unauthorized Request'); }

  let payload = jwt.verify(token, 'secretkey');
  if (!payload) { return res.status(401).send('Unauthorized Request'); }

  req.userId = payload.subject;
  next();
}

module.exports = router;