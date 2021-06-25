var request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZ3MyNCIsImEiOiJja3B1d294MWwwZzVoMndwYWFtZXpuZmprIn0.RnfmaENIP6Hhz0OH3uFBtg`

    // request({ url: url, json: true, rejectUnauthorized: false, requestCert: true, agent: false}, (error, response) =>{
    request({ url, json: true, rejectUnauthorized: false, requestCert: true, agent: false}, (error, {body}) =>{
        if(error){      
            // console.log(chalk.red.bold(`Unable to connect to location service: ${error.code}`))
            callback('Unable to connect to location services', null)        // by default undefined
        }
        else if(body.features.length === 0){
            // console.log(chalk.red.bold('Unable to find location. Try another search'))
            callback('Unable to find location. Try another search', undefined)
        }
        else{
            // var coordinates = response.body.features[0].center      // share only what's relevant
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode