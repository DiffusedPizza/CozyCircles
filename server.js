const express = require('express')
const app = express()
const PORT = 8000


app.get('/', (require, response)=>{
    response.sendFile(__dirname + '/index.html')
})

app.get()

app.listen(PORT, ()=>{
    console.log(`The server is running on ${PORT}`)
})