const express = require('express')
const app = express()
const cookieParser = require("cookie-parser")


app.set('view engine', 'ejs')

app.use(express.static("public"))


app.use(cookieParser())

app.use(require('./Routes'))



const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('Server is started')
})