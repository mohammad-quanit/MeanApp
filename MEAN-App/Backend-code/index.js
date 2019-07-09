const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./Routes/api');
const app = express();
let PORT = process.env.PORT || 4001;

app.use(bodyParser.json());
app.use(cors());

//api route requests
app.use('/api', api);

// normal get request
// app.get('/', (req, res) => {
//   res.send('Heelo World1');
// });

app.listen(PORT, () => console.log('Running on 4001'));