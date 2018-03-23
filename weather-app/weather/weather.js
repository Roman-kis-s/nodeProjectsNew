const request = require('request');

let requestWeather = (latitude, longitude, callback) => {
    request({
        url : `https://api.darksky.net/forecast/9f8773a8b8d49e62f992d08b386bbb04/${latitude},${longitude}`,
        json : true
    }, (error, response, body) => {
        if(error){
            callback('Unable to connect with server');
        }else if(response.statusCode === 400){
            callback('Unable to fetch weather');
        }else if(response.statusCode === 200){
            callback(undefined, {
                timezone : body.timezone,
                temperature : body.currently.temperature
            });
        }

    });
};

module.exports = {
  requestWeather
};

