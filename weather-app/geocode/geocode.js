const request = require('request');

let geocodeAddress = (address, callback) => {
    let encodedAddress = encodeURIComponent(address);
    request({
        url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        if(error){
            callback('Error is happen!');
        } else if(body.status === 'OVER_QUERY_LIMIT'){
            callback('Query limit is overflow. Try again.');
        } else if(body.status === 'ZERO_RESULTS'){
            callback('Can`t find address.');
        }else if(body.status === 'OK'){
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude : body.results[0].geometry.location.lat,
                longitude : body.results[0].geometry.location.lng
            });
        }
    });
};

module.exports = {
  geocodeAddress
};

