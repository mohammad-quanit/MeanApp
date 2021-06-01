const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Users = require('../Model/users');
const Movies = require('../Model/movies');
require('dotenv').config();
const mongoAtlasUri = process.env.MONGO_ATLAS_URI;

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

router.get('/movies', async (req, res) => {
  try {
    const movies = await Movies.find().skip(20).limit(10);
    res.status(200).send(movies);
  } catch (error) {
    throw new Error(error);
  }
});

// events api
router.get('/events', (req, res) => {
  let events = [
    {
      _id: 1,
      name: 'Flowdesk',
      description:
        'vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at',
      date: '5/10/2021',
      avatar: 'http://dummyimage.com/171x100.png/dddddd/000000',
    },
    {
      _id: 2,
      name: 'Duobam',
      description:
        'maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut',
      date: '6/14/2020',
      avatar: 'http://dummyimage.com/194x100.png/cc0000/ffffff',
    },
    {
      _id: 3,
      name: 'Stronghold',
      description:
        'non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros',
      date: '8/1/2020',
      avatar: 'http://dummyimage.com/168x100.png/ff4444/ffffff',
    },
    {
      _id: 4,
      name: 'Fixflex',
      description:
        'sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue',
      date: '10/16/2020',
      avatar: 'http://dummyimage.com/123x100.png/dddddd/000000',
    },
    {
      _id: 5,
      name: 'Redhold',
      description:
        'metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque',
      date: '5/29/2020',
      avatar: 'http://dummyimage.com/142x100.png/5fa2dd/ffffff',
    },
    {
      _id: 6,
      name: 'Opela',
      description:
        'placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit',
      date: '10/15/2020',
      avatar: 'http://dummyimage.com/120x100.png/dddddd/000000',
    },
    {
      _id: 7,
      name: 'Konklux',
      description:
        'bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere',
      date: '8/26/2020',
      avatar: 'http://dummyimage.com/130x100.png/5fa2dd/ffffff',
    },
    {
      _id: 8,
      name: 'Cardify',
      description:
        'donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien',
      date: '11/28/2020',
      avatar: 'http://dummyimage.com/221x100.png/cc0000/ffffff',
    },
    {
      _id: 9,
      name: 'Rank',
      description:
        'sem fusce consequat nulla nisl nunc nisl duis bibendum felis',
      date: '10/15/2020',
      avatar: 'http://dummyimage.com/141x100.png/ff4444/ffffff',
    },
    {
      _id: 10,
      name: 'Fix San',
      description:
        'nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium',
      date: '3/25/2021',
      avatar: 'http://dummyimage.com/123x100.png/cc0000/ffffff',
    },
    {
      _id: 11,
      name: 'Greenlam',
      description:
        'tristique est et tempus semper est quam pharetra magna ac consequat metus sapien',
      date: '7/11/2020',
      avatar: 'http://dummyimage.com/216x100.png/cc0000/ffffff',
    },
    {
      _id: 12,
      name: 'Temp',
      description:
        'in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin',
      date: '8/28/2020',
      avatar: 'http://dummyimage.com/146x100.png/dddddd/000000',
    },
    {
      _id: 13,
      name: 'Y-Solowarm',
      description:
        'ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate',
      date: '11/27/2020',
      avatar: 'http://dummyimage.com/247x100.png/ff4444/ffffff',
    },
    {
      _id: 14,
      name: 'Home Ing',
      description:
        'tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu',
      date: '10/19/2020',
      avatar: 'http://dummyimage.com/195x100.png/5fa2dd/ffffff',
    },
    {
      _id: 15,
      name: 'Konklux',
      description:
        'enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper',
      date: '5/21/2021',
      avatar: 'http://dummyimage.com/119x100.png/cc0000/ffffff',
    },
    {
      _id: 16,
      name: 'Fintone',
      description:
        'massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac',
      date: '5/26/2020',
      avatar: 'http://dummyimage.com/168x100.png/5fa2dd/ffffff',
    },
    {
      _id: 17,
      name: 'Zontrax',
      description:
        'sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et',
      date: '7/15/2020',
      avatar: 'http://dummyimage.com/219x100.png/ff4444/ffffff',
    },
    {
      _id: 18,
      name: 'Span',
      description:
        'aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia',
      date: '2/14/2021',
      avatar: 'http://dummyimage.com/131x100.png/cc0000/ffffff',
    },
    {
      _id: 19,
      name: 'Home Ing',
      description:
        'leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas',
      date: '12/30/2020',
      avatar: 'http://dummyimage.com/227x100.png/ff4444/ffffff',
    },
    {
      _id: 20,
      name: 'Regrant',
      description:
        'nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat helllo',
      date: '1/30/2021',
      avatar: 'http://dummyimage.com/194x100.png/dddddd/000000',
    },
  ];
  res.status(200).send(events);;
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
  res.status(200).send(specialEvents);
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
