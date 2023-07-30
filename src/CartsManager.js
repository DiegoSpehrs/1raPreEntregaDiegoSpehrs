import fs from 'fs';

class CartsManager {
    constructor(path){
        this.path
    }
    
    async getAllCarts(){
        if(fs.existsSync(this.path)){
            const carts = await fs.promises.readFile(this.path,'utf-8')
            return JSON.parse(carts)
        }else{
            return []
        }
    }
    async getOneCart(id){
        const carts = await this.getAllCarts()
        const cart = carts.find(c=>c.id===id)
        return cart
    }
    async createCart(obj){
        const carts = this.getAllCarts()
        let id
        if(!carts.length){
            id = 1
        }else{
            id= carts[carts.length-1].id + 1
        }
        const newCart = {products:[],id}
        carts.push(newCart)
        await fs.promises.readFile(this.path, JSON.stringify(carts))
        return newCart
    }
    async addProduct(idCart,idProduct){
        const carts = await this.getAllCarts()
        const cart = carts.find(c=>c.product===idCart)
        const productIndex = cart.products.findIndex(p=>p.id===idProduct)
        if(productIndex===-1){
            cart.prdocuts.push({product:idProduct,quantity:1})
        }else{
            cart.prdocuts[productIndex].quantity++
        }
        await fs.promises.writeFile(this.path,JSON.stringify(carts))
        return cart
    }

}

export const cartManager = new CartsManager('cartsPrueba.json')