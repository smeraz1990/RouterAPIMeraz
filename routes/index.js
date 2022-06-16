const express = require('express')
const { Router } = express
const app = express()
const router = Router()
const productos = [
    { "title": "Producto1", "price": "5.50", "thumbnail": "foto 1", "id": 1 },
    { "title": "Producto2", "price": "10.90", "thumbnail": "foto 2", "id": 2 },
    { "title": "Producto3", "price": "8.30", "thumbnail": "foto 3", "id": 3 }
]

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


router.get('/productos', (req, res) => {
    res.json(productos)
})

router.get('/productos/:id', (req, res) => {
    const { id } = req.params
    if (id <= 0) {
        res.json({ error: "No exite el id 0" })
    }
    if (id > productos.length) {
        res.json({ error: 'producto no encontrado' })
    }

    res.json(productos[Number(id) - 1])
    return
})

router.post('/productos', (req, res) => {
    const { title, price, thumbnail } = req.body
    let nuevoid = productos.length + 1
    productos.push({ title, price, thumbnail, id: nuevoid })
    res.send(`Se agrego un nuevo producto con el id ${nuevoid}`)
})

//para usar la funcion PUT se manda en id por url la estructura de datos a modificar como json
//p.ejem:  { "title": "Nuevo", "price": "Nuevo", "thumbnail": "Nuevo"}
router.put('/productos/:id', (req, res) => {
    const { id } = req.params
    const { title, price, thumbnail } = req.body
    productos[id - 1] = { title, price, thumbnail, id: id }
    res.send(`Se modifico el id ${id}`)
})

router.delete('/productos/:id', (req, res) => {
    const { id } = req.params
    productos[id - 1] = { msg: `El id: ${id} fue eliminado asi que esta disponible para remplazar` }
    res.send(productos[id - 1])
})

module.exports = router