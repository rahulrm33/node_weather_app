const path =require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utility/geocode.js')
const forecast=require('./utility/forecast.js')



// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))


const app=express()
const publicDirectoryPath=path.join(__dirname,'../public')
const pathViews=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

// setup handlebar engine and views location
app.set('view engine','hbs')    //perform handleBar
app.set('views',pathViews)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// app.get('/help',(req,res)=>{
//     res.send(app.use(express.static(path.join(__dirname,'../public/help'))))
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About</h1>')
// })

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Rahul_R.M.'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Rahul_R.M.'
    })
})

app.get('/help',(req,res)=>{
   res.render('help',{
       msg:'Hii,How can I help YOU...!!',
       title:'HELP',
       name:'Rahul_R.M.'
   })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide a search term!'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
          return res.send({error})
        }
      
        forecast(latitude,longitude, (error, forecastData) => {
          if(error){
            return res.send({error})
          }
          res.send({
              forecast:forecastData,
              location,
              address:req.query.address
          })
        })
        
      
      
    })
    
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        errorMessage:'Help article not found!!',
        title:'404'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        errorMessage:'Page not found!',
        title:"404"
    })
})


app.listen(3000,()=>{
    console.log('server is up in 3000')
})


















// challenge

// app.com
// app.com/help
// app.com/about
