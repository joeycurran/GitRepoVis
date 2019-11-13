const express = require('express')
const cors = require('cors')
const API = 'https://api.github.com/users';
var username ='';
const app = express()


app.use(cors())
app.use(express.json())
app.get('https://api.github.com/users', (req, res ) => {

    this.state = {
        username: '',
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

app.listen(4000)