const request=require('request')

const forecast=(latitude,longitude,callback)=>{

   const url='http://api.weatherstack.com/current?access_key=4e9cfe9e727f043d7c923142980ff22a&query='+latitude+','+longitude+'&units=f'
   request({url, json:true},(error,{body})=>{
    if(error){
        callback('Unable to connect to location services.',undefined)
    }
    else if(body.error){
        callback('Unable to find the weather.Try another location',undefined)
    }
    else{
        callback(undefined,body.current.weather_descriptions[0]+' .It is currently '+body.current.temperature+' degrees out. It feels like '+body.current.feelslike+' degrees out.'+' And humidity is around '+body.current.humidity+'%.')
    }
    })
}

module.exports=forecast





// const request = require('request')

// const forecast = (latitude, longitude, callback) => {
//     const url = 'http://api.weatherstack.com/current?access_key=4e9cfe9e727f043d7c923142980ff22a&query=' + latitude + ',' + longitude + '&units=s'

//     request({ url: url, json: true }, (error, response) => {
//         if (error) {
//             callback('Unable to connect to weather service!', undefined)
//         } else if (response.body.error) {
//             callback('Unable to find location', undefined)
//         } else {
//             callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degress out.")
//         }
//     })
// }

// module.exports = forecast