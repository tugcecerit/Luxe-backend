require('dotenv').config();

const { PORT } = process.env;

const express = require('express');
const app = express();
const routes = require('./routes/index')
const cors = require('cors');


app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use('/', routes);

app.get('/', (req, res) => {
    res.send('Hello World');
  });

app.use((req, res) => {
    res.status(404).json({message: 'Not a proper route!'})
})

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));


