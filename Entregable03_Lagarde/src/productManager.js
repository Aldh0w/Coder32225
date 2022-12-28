const fs = require('fs');

class ProductManager {
    
    constructor(nombreArchivo){
        this.nombreArchivo =`./${nombreArchivo}.json`; 
        try{
            this.elements = fs.readFileSync(this.nombreArchivo, 'utf-8')
            this.elements = JSON.parse(this.elements)
        }catch(error){
            this.elements = []
        }      
    }

    getProducts() {
        const data =  this.elements
        return data;
    };
    
    getProductById(id){
        try{
            const productos = this.elements
            const busqueda  = productos.filter(dato => dato.id === id);
            return busqueda;
        }catch(error){
            return "No existen elementos"
        }
    }

    async save(data){
        if(!data.title && !data.description && !data.price && !data.thubnail && !data.code && !data.stock){
            throw new Error("Datos invalidos")
        }

        if(this.elements.length === 0){
            data.id = 1
        } else{
            data.id = this.elements[this.elements.length -1].id + 1
        }

        this.elements.push(data)

        try{
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.elements, null, '\t'))
            console.log('Element Saved')
        }catch(error){
            console.log('Error')
        }
    }
    
    delete(){
        fs.truncateSync(this.nombreArchivo,0,()=> console.log('Content deleted'))
    }


    async deleteById(id){
        try{
            const producto = this.elements.findIndex((elemento) => elemento.id === id)
            if(producto !== -1){
                this.elements.splice(producto, 1)
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.elements, null, '\t'))
            }else{
                console.log('Element not found')
            }
        }catch(error){
            console.log('Error')
        }
    }
    
    
    async update(id, data){
        try{
            const oldElement = this.elements.find((element) => element.id === id)
            const index = this.elements.findIndex((elemento) => elemento.id === id)

            if(index !== -1){
                const newElement = {...oldElement, ...data}
                this.elements[index] = newElement
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.elements, null, '\t'))
            }
        }catch(error){
            console.log('error')
        }
    }
}

 const products = new ProductManager('products')


module.exports ={
    ProductController : products
}