const express = require('express')
const { Router } = express
const rutas = require('./routes/index')

const app = express()
const router = Router()
const puerto = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/html', express.static('html'))

app.use('/api', rutas)

app.listen(puerto, err => {
    if (err) {
        console.log(`hubo un error al inicar le servidor ${err}`)
    } else {
        console.log(`Servidor escuchando el puerto ${puerto}`)
    }
})