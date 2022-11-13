const express = require('express');
const router = express.Router()


const { setUser, authRole } = require( '../middlewares/auth-user/auth' );
const ROLES = require( '../middlewares/auth-user/roles' );
const { GetStockId, GetStock, HasStock } = require('../middlewares/others/stock')
const { CreateStock, GetHistoryProduct } = require('../middlewares/others/product')


const Product = require("../models/Product")
const types = require("../utils/Types")

router.get("/list-types",(req,res) => {
  res.status(200)
  res.send(types)
})

router.get('', async (req, res ) => {
  try {
    await Product.find({}, (error, result) => {
      if(error) {
        res.status(400)
        res.send({completed: false, message: `it happened an unexpected error: ${error}`})
      }else{
        res.status(200)
        res.send(result)
        //res.send({completed: true, data: result})
      }
    }).clone();
  } catch (error) {
    res.status(400)
        res.send({completed: false, message: `it happened an unexpected error: ${error}`})
  }
})

router.post('/new-product', setUser, authRole([ROLES.ESTABLISHMENT]) ,(req, res, next) => {
  const {
    tags,
    name,
    quantity,
    src,
    alt,
    description,
    elaboration_date,
  } = req.body
  
  try{
    const establishment_id = req.userData.rol.rol_id
    req.establishment_id = establishment_id
    const producto = new Product({
      establishment_id,
      tags,
      name,
      quantity,
      src,
      alt,
      description,
      elaboration_date,
    })

    producto.save((err)=> {
      if(err){
        
        res.status(400)

        res.send({ message: "se presento un error en la creacion del producto", err})
      }else{
        req.product_id =  product._id
        req.new_product={
          completed: true,
          product
        }
        next()
        // res.status(200)
        // res.send({ data: producto, completed: true})
      }
    })
  }catch(error){
    // console.log(error)
    res.status(400)
    res.send({ message: "se presento un error en la creacion del producto", error})
  }
}, CreateStock)


router.put('/update-stock',GetStockId, HasStock, async (req,res)=>{
  const {
    amount,
  } = req.body
  // middleware 'GetStockId' put the stock_id in the requirements
  const stock = req.stock_id
  if(!stock){
    res.status(400)
    res.send({error: "it is neccesary to have the id of the stock"})
  }else{
    try{
      if(req.hasStock){
        Product.findByIdAndUpdate(stock, { $inc: { stock: amount }}, (error, result)=>{
          if(error){
            res.status(400)
            res.send({error: "it is neccesary to have the id of the stock"})
          }
          res.status(200)
          res.send(result)
          
        })
      }else{
        res.status(400)
        res.send({error: "Thats an amount not allowed"})
      }
    }catch(error){
      res.status(400)
      res.send({error})
    }
  }
  

})

router.get('/stock-product', GetStockId, GetStock )

router.get('/history-product', GetStockId, GetHistoryProduct)

module.exports = router