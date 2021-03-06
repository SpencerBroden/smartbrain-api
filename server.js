const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

const image = require('./controllers/image');
const profile = require('./controllers/profile');
const register = require('./controllers/register');
const signin = require('./controllers/signin');


const db = knex({
    client: 'pg',
    connection:  process.env.DATABASE_URL
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=> { res.send(db.users)})
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req,res) => { register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req,res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req,res) => { image.handleAPICall(req, res)})

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})

/*
/signin --> POST = success/fail
/register --> POST = user
/profile/:userid --> GET = user
/image --> PUT --> user
*/