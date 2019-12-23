const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/7e40ab44108261664613ec7b4a67bd53/' + encodeURIComponent(latitude) + ', ' + encodeURIComponent(longitude)

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature
                        + ' degrees out. There is a ' + body.currently.precipProbability
                        + '% chance of rain. The high for the day is ' + body.daily.data[0].temperatureMax
                        + ' and the low for the day is ' + body.daily.data[0].temperatureMin + '.')
        }
    })
}

module.exports = forecast