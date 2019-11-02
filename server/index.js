const express = require('express')
const cors = require('cors')
require('dotenv').config()
const git = require('git')
const API = 'https://api.github.com/users';

const app = express()

app.use(cors())
app.use(express.json())
app.get('https://api.github.com/users', (req, res ) => {

    this.state = {
        username: 'joeycurran',
        name:'',
        avatar:'',
        location:'',
        repos:'',
        followers: '',
        following:'',
        homeUrl:'',
        notFound:''
      }

    //error handling
    .then(() => {
        res.json({ success: true })
    })
    .catch(err => {
        console.log(err);
        res.json({ success: false })
    })
})

app.listen(4001)