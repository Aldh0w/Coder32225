const fs = require('fs');
const path = require('path');

class  ProductManager{
    
    constructor(nombreArchivo){

        this.nombreArchivo =`./${nombreArchivo}.json`;       
    }

    async obtenerJson(){
        const data = await fs.promises.readFile(this.nombreArchivo,'utf-8');
        return JSON.parse(data);
    }

    async actualizarArchivo(productos){
        fs.promises.writeFile(this.nombreArchivo, JSON.stringify(productos, null, '\t'), 'utf-8');
    }

    async getProducts() {
        const data =  await this.obtenerJson();
        return data;
    };

    async addProduct(data){
        if( !data.title || 
            !data.price ||
            !data.description ||
            !data.thumbnail ||
            !data.stock ||
            !data.code) throw new Error('Datos invalidos');

        let id = 1;
        const productos =   await this.obtenerJson();
       if(productos.length){
          id = productos[productos.length -1].id +1;
       }
        const nuevoProducto = {
            title: data.title,
            price: data.price,
            description: data.description,
            thumbnail: data.thumbnail,
            stock: data.stock,
            code: data.code,
            id: id
        }
        productos.push(nuevoProducto);
        return await this.actualizarArchivo(productos);
    }

    async getProductById(id, data){
        const productos = await this.obtenerJson();
        const busqueda  = productos.find((dato) => dato.id === id);
        const productModificado = {
            title: data.title,
            price: data.price,
            description: data.description,
            thumbnail: data.thumbnail,
            stock: data.stock,
            code: data.code,
            id: busqueda.id
        }
        return busqueda;
    }

    async updateProduct(id){
        const productos = await this.obtenerJson();
        const busqueda  = productos.find((dato) => dato.id === id);
        console.log(`El producto con id ${id} es:`);
        console.log(busqueda);
        return busqueda;
    }

    async deleteById(id){
        const productos = await this.obtenerJson();
        productos.splice(id - 1,1);
        console.log(`Se removio el producto con id:${id} de sus productos`);
        return await this.actualizarArchivo(productos);
    }

    async deleteAll(){
        const productos = await this.obtenerJson();
        productos.splice(0);
        console.log('Se borraron todos los productos de su lista');
        return await this.actualizarArchivo(productos);
    }
}









