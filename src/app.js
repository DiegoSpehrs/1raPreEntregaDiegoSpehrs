import  express  from 'express';
import cartsRouter from './routes/cart.router.js';
import productsRouter from './routes/product.router.js';
import {__dirname} from './utils.js';

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'public'))
app.use('/api/products',productsRouter)
app.use('/api/carts',cartsRouter)


const PORT = 8080

app.listen(PORT,()=>{
    console.log('Escuchando al puerto 8080')
})


