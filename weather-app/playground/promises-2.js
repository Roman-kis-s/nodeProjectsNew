let request = require('request');

let geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        let encodedAddress = encodeURIComponent(address);
        request({
            url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
            json: true
        }, (error, response, body) => {
            if(error){
                reject('Error is happen!');
            } else if(body.status === 'OVER_QUERY_LIMIT'){
                reject('Query limit is overflow. Try again.');
            } else if(body.status === 'ZERO_RESULTS'){
                reject('Can`t find address.');
            }else if(body.status === 'OK'){
                resolve({
                    address: body.results[0].formatted_address,
                    latitude : body.results[0].geometry.location.lat,
                    longitude : body.results[0].geometry.location.lng
                });
            }
        });
    });
};


geocodeAddress('lviv').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
})