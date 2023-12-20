const {config} = require('dotenv')

config()

//INTEGRACION DE TOKEN DE MERCADOPAGO
const MERCADOPAGO_API_KEY = process.env.MERCADOPAGO_API_KEY
console.log(MERCADOPAGO_API_KEY)