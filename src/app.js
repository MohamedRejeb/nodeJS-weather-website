const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    const context = {
        title: 'Weather App',
        name: 'Mohamed',
    }
    res.render('index', context)
})

app.get('/about', (req, res) => {
    const context = {
        title: 'About Me',
        name: 'Mohamed',
    }
    res.render('about', context)
})

app.get('/help', (req, res) => {
    const context = {
        title: 'Help',
        name: 'Mohamed',
        message: 'Demo help message!',
    }
    res.render('help', context)
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geoCode(req.query.address, (err, {latitude, longitude, location} = {}) => {
        if (err) {
            return res.send({error: err})
        }
        forecast(latitude, longitude, (err, forecastData) => {
            if (err) {
                return res.send({error: err})
            }
            return res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    const context = {
        title: '404',
        message: 'Help article not found',
        name: 'Mohamed',
    }
    res.render('404', context)
})

app.get('*', (req, res) => {
    const context = {
        title: '404',
        message: 'Page not found',
        name: 'Mohamed',
    }
    res.render('404', context)
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})