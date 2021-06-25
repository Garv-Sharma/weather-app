const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/weather')

const app = express()

// web site structure:
// app.com  (root)
// app.com/help (route)
// app.com/about

// app.get('/', (req, res) => {
//     res.send('Hello Express!')
// })
// app.get('/', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/contact', (req, res) => {
//     res.send({
//         name: 'Garv',
//         email: 'garv.sharma@wipro.com'
//     })
// })

// app.get('/about', (req, res) => {
//     res.send('About')
// })

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))
app.use(express.static(path.join(__dirname, '../public')))

// app.set('view engine', 'hbs')

const viewsPath = path.join(__dirname, '../templates/views')
app.set('view engine', 'hbs')
app.set('views', viewsPath)         // customizing views directory - default folder name: views

const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

app.get('/', (req, res) => {
    // res.render('index')     // view name defined in views folder
    res.render('index', {
        title: 'Weather App',
        name: 'GS'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'GS'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'To get help, please contact us',
        name: 'GS'
    })
})

app.get('/weather', (req, res) => {
    // res.send('Check Weather')
    var address = req.query.address
    if(!address){
        return res.send({
            error: "You must provide a location term"
        })
    }
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error: error
            })
        }
        else{
            forecast(latitude, longitude, location, (error, data) => {
                if(error){
                    return res.send({
                        error: error
                    })
                }
                else{
                    return res.send({
                        forecast: data,
                        location,
                        address: req.query.address
                    })
                }
            })
        }
    })
    // res.send({
    //     address: req.query.address
    // })
})

// app.get('/products', (req, res) => {
//     // console.log(req.query)
//     if(!req.query.search){
//         // in case search string is not provided
//         return res.send({
//             error: "You must provide a search term"
//         })
//     }
//     // else{
//         res.send({
//             products: []
//         })
//     // }
// })

// app.get('/help/*', (req, res) => {
//     // when user tries to look for something inside help - we can send the user back to help by customizing the 404 page
//     res.send('Help article not found')
// })

// app.get('*', (req, res) => {
//     // matches anything that hasn't matched above - hence should be last route
//     res.send('404')
// })

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found',
        name: 'GS'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page   not found',
        name: 'GS'
    })
})

// start the server:
app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on port 3000')
})