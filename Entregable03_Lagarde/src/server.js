const express = require('express');
const { ProductController } = require('./productManager')

const app = express()
const port = 8080

app.get('/', async (req,res) =>{
  res.send('Bienvenidos, las rutas disponibles son /products y /products/id')
})

app.get('/products', async (req,res) =>{
    const productos = ProductController.getProducts()
    res.json(productos)
})

app.get('/products/:id', async (req,res) =>{
    const { id } = req.params
    const productos = ProductController.getProducts()
    const producto = productos.find(producto => producto.id == id)

    if(!producto){
        return res.send('id not found')
    }

    res.json(producto)
})

app.get('*', (req, res) => {
    res.send('Error')
  })
app.listen(port, () => console.log('Server listening on port ' + port));