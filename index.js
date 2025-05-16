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
const bearerToken = process.env.BITLY_TOKEN
// Add bodyParser
const config = {
    headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
     }
}
// GET / route to render index.ejs
app.get("/",(req,res) => {
    res.render('index')
})

// POST /shorten route to use Axios & Bitly API
app.post("/shorten",async (req,res) => {
    const longUrl = req.body.longUrl
    try {
        const result = await axios.post(`https://api-ssl.bitly.com/v4/shorten`,{
            long_url : longUrl,
            domain: "bit.ly",
        },config)
        const shortUrl = result.data.link
        res.render("result",{longUrl,shortUrl})
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
})

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})