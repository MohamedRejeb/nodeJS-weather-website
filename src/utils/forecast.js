const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weatherapi.com/v1/forecast.json?key=54c19c2eacab46aa8d8151421210710&q=' + latitude + ',' + longitude + '&days=7'

    request({url: url, json: true}, (err, {body} = {}) => {
        if (err) {
            callback('Unable to connect to weather service!')
        } else if (body.error) {
            callback('Unable to find location!')
        } else {
            callback(undefined, {
                // location: body.location.region,
                condition: body.forecast.forecastday[0].day.condition.text,
                temperature: body.current.temp_c,
                rainpercp: body.current.precip_mm * 100
            })
        }
    })
}

module.exports = forecast