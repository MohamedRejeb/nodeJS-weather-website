const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibW9oYW1lZHJlamViIiwiYSI6ImNrdWhkdnlmMjBpbWgyb25tdmNhbDI5emUifQ.kulZrky0BtmeSvXLj7qMcA&limit=1'

    request({url: url, json: true}, (err, {body} = {}) => {
        if (err) {
            callback('Unable to connect to location services!')
        } else if (body.features.length === 0 || address === undefined) {
            callback('Unable to find location. Try another search.')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode