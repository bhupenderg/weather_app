const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
const path = require('path');

const request = require('postman-request');



app.set('view engine', 'ejs');
app.set('views', 'views');

const publicDirectory = path.join(__dirname, 'public');

app.use(express.static(publicDirectory));

app.get('/', (req, res) => {
    res.render('home');
    console.log()
})

app.get('/about', (req, res) => {
    res.render("about");
})

app.get('/weather', (req, res) => {
    const forecast = function(place, callback) {
        request({url: `http://api.weatherstack.com/current?access_key=e22b97f8e347333b62b6be7ca0064a7a&query=${req.query.address}&unit=m`, json: true}, (error, response) => {

            const errors = {
                error1: "Please provide some valid address"
            }    
        if(!req.query.address){
                return res.send(errors.error1);
            }

            if(response.body.error) {
                return res.send(errors.error1);
            }
            const data = {
                city: response.body.location.name,
                state: response.body.location.region,
                country: response.body.location.country,
                temperature: `The temperature of ${response.body.location.name} (${response.body.location.region}), ${response.body.location.country} is ${response.body.current.temperature}*celcius.  `
            }
            
            

            
            callback(errors, data)
            
            
            

        })

    }

    let url= `http://api.weatherstack.com/current?access_key=e22b97f8e347333b62b6be7ca0064a7a&query=${req.query.address}&unit=m`

    forecast(url, (error, data) => {
        
        
        res.send(data);
        console.log(req.query)
    })
})

app.get('/help', (req, res) => {
    res.render('help');
})

app.get('*', (req, res) => {
    res.send("ERROR 404: Page not found.");
})



app.listen(port, () => {
    console.log("Server runs on port no. " + port);
});