const express = require('express')
const app = express()
const cookieParser = require("cookie-parser")
const config = require('./config/config')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


app.set('view engine', 'ejs')

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieParser())
console.log(config.mongoURI)
mongoose
  .connect(config.mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then((res) => console.log("Database Connected"))
  .catch((err) => console.log(err));

app.use(require('./Routes'))



const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('Server is started')
})