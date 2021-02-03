const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const pone=document.querySelector('#message-1')
const ptwo=document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location=search.value

    pone.textContent='Loading...'
    ptwo.textContent=''

    
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                pone.textContent=data.error
            }else{
                pone.textContent=data.location
                ptwo.textContent=data.forecast
                // console.log(data.location)
                // console.log(data.forecast)
            }
        })
    })


})
