var request = require('request')

const forecast = (latitude, longitude, location, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=247db1ec8b95da6e72cc176b100820b5&query=${latitude},${longitude}`

    // request({ url: url, json: true}, (error, {body}) =>{
    request({url, json: true}, (error, {body}) =>{      // shorthand syntax & destructuring
        if(error){      
            // console.log(chalk.red.bold(`Unable to connect to weather service: ${error.code}`))
            callback('Unable to connect to weather service', null)
        }
        else if(body.error){
            // console.log(chalk.red.bold('Unable to find location'))
            callback('Unable to find location', null)
        }
        else{
            // var data = response.body
            // console.log(`It is currently ${data.current.temperature} degrees out. It feels like ${data.current.feelslike} degrees out. ${data.current.weather_descriptions[0]}.`)
            // callback(null, `${location}: It is currently ${data.current.temperature} degrees out. It feels like ${data.current.feelslike} degrees out. ${data.current.weather_descriptions[0]}.`)
            callback(null, `It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out. ${body.current.weather_descriptions[0]}. The humidity is ${body.current.humidity}%`)
            
        }
    })
}

module.exports = forecast