const express = require('express')
const movieRouter = require('./routes/movieRouter')

const app = express()

app.use(express.json())
app.use('/movies',movieRouter)

app.listen(3000,()=>{
    console.log("Server running on port 3000")
})