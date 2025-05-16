require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000


// Set up EJS and public folder here
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(bodyParser.urlencoded({extended: true}))

// Add bodyParser
const config = {
     headers: {
        'Authorization': `Bearer ${bearerToken}`,
     }
}
// GET / route to render index.ejs
app.get("/",(req,res) => {
    res.render('index')
})

// POST /shorten route to use Axios & Bitly API
app.post("/shorten",async (req,res) => {
    const bearerToken = process.env.BITLY_TOKEN
    try {
        const result = await axios.post(`https://api-ssl.bitly.com/v4/shorten`,config)
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
})

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})