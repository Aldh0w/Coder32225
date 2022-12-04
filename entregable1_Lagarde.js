class ProductManager{

    constructor(){
    this.products = [];
    }

    addProduct(title,description,price,thubmnail,stock){

        let code

        if(this.products.length === 0){
            code = 1;
        }else{
            code = this.products[this.products.length -1].code + 1;
        }

        const newProduct = {
            code:           code,
            title:          title,
            description:    description,
            price:          price,
            thubmnail:      thubmnail,
            stock:          stock
        }

        return this.products.push(newProduct);
    }

    getProducts(){
        console.log(this.products);
        return this.products
    }

    getProductById(id){
        const busqueda = this.products.find((dato) => dato.code === id);

        if(!busqueda){
            console.error('Not found');
        }else{
            console.log(busqueda);
        }

        return busqueda

    }
}
