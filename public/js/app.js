console.log('client side JS file is loaded')

// fetch('http://puzzle.mead.io/puzzle')
// .then((response) => {
//     response.json()
//     .then((data) => {
//         console.log(data)
//     })
// })

// fetch('http://api.weatherstack.com/current?access_key=fa571ea77ce5777c20e59fcac8602aa3&query=meerut')
// fetch('http://localhost:3000/weather?address=meerut')
// .then((response) => {
//     response.json()
//     .then((data) => {
//         // console.log(data.location.name)
//         // console.log(data.current.temperature)
//         // console.log(data)
//         if(data.error){
//             console.log(data.error)
//         }
//         else{
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const searchLocation = document.querySelector('input')

const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

// message1.textContent = 'error'
// message2.textContent = 'forecast'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()      // e is event
    // console.log('Testing')
    const location = searchLocation.value
    // console.log(location)
    message1.textContent = 'Loading ...'
    message2.textContent = ''               // to clear any previous message since we are not refreshing page

    fetch(`http://localhost:3000/weather?address=${location}`)
    .then((response) => {
        response.json()
        .then((data) => {
            if(data.error){
                // console.log(data.error)
                message1.textContent = data.error
            }
            else{
                // console.log(data.location)
                // console.log(data.forecast)
                // message1.textContent = data.location + " : " + data.forecast 
                message1.textContent = data.location
                message2.textContent = data.forecast
            }
        })
    })
})