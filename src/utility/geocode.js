const request=require('request')


const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoicmFodWxybSIsImEiOiJja2tiMXNoMHQwMjJrMnBzN3hqam9lczUxIn0.RaUpZp9fRSq60aeA0fj1FQ&limit=1'
 
    request.get({url ,json:true},(error,{body})=>{
    if(error){
        callback('Unable to connect to location services.',undefined)
    }else if(body.features.length===0){
     callback('Unable to find location.Try another service.',undefined)
    }
    else{
     callback(undefined,{
         latitude:body.features[0].center[0],
         longitude:body.features[0].center[1],
         location:body.features[0].place_name
     })       
    }
    })
 }


 module.exports=geocode