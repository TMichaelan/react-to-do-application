const fs = require("fs");
const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 5000


app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/todo', require('./routes/todo.route'))

let mongokey = fs.readFileSync("mongodb.txt", "utf8");

async function start(){
    try {

        await mongoose.connect(mongokey, 

        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        
        })

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })

    }catch (err) {console.log(err)}
}

start()