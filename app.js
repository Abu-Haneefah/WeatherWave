const { response } = require('express');
const express = require('express');
const ejs = require('ejs')
const app = express();
const bodyParser = require('body-parser');
const port = 7300;
const https = require('https');
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
const appId = '83047543b8cc78be02fe1933f9232cba';

app.get('/', (req,res) => {
res.render('index');

});

app.post('/result', (req,res) => {
    const query = req.body.cityName;
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&units=metric&appid=' + appId; 

https.get(url, (response) =>{

    response.on('data', (data) => {
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp;
        const humi = weatherData.main.humidity
        const windSpeed = weatherData.wind.speed;
       const icon = weatherData.weather[0].icon;
       const longtitude = weatherData.coord.lon;
       const latitude = weatherData.coord.lat;
       const imageUrl ='https://openweathermap.org/img/wn/' + icon + '@2x.png';

       res.render('result', {queryresult:query, temper:temp, imageUrls:imageUrl, humidity:humi, windspeed:windSpeed, lon:longtitude, lat:latitude});
    });  
});
});

app.listen(port, () => console.log('Server has started running on the port as usual'));