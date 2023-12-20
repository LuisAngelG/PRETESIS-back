var mercadopago = require('mercadopago');
const { Association } = require('sequelize');
// const {MERCADOPAGO_API_KEY} = require('../config/token.config')
var storedArticleId;
var storedUserId;
const jwt = require('jsonwebtoken');

const createOrder = async (req, res) => {
    try {
        var token = mercadopago.configure({
            access_token: 'TEST-2047488299865082-121314-e6d356ee868b09c15c71322781a15446-1592319646'
        });

        //VERIFICAR EL TOKEN QUE ESTAMOS COLOCANDO
        // console.log("token " + token)
        storedArticleId = req.body.articles.id;
        storedUserId = req.body.articles.articleId;
    
        const token2 = jwt.sign({ status: 'approved', id: storedArticleId, articleId: storedUserId }, 'tu_secreto_aqui')
         
        var result = await mercadopago.preferences.create({
            items: [
                {
                    title: "PLAN " + req.body.articles.titulo,
                    description: "Suscripción al Gimnasio Columbus",
                    quantity: 1,
                    currency_id: 'PEN',
                    unit_price: req.body.articles.costo
                }
            ],

            back_urls: {
                success: "http://localhost:8080/success" + "?token=" + token2,
                failure: "http://localhost:8080/failure" + "?token=" + token2,
                pending: "http://localhost:8080/pending" + "?token=" + token2
            },

            // back_urls: {
            //     success: "http://localhost:8081/home",
            //     failure: "http://localhost:8081/home",
            //     pending: "http://localhost:8081/home"
            // },

            notification_url: "https://97c4-2001-1388-5c4-5d3e-5d2b-995f-aafa-d7ce.ngrok.io/webhook"
        });

        // const redirectTo = 'http://localhost:8080/success';
        // res.redirect(redirectTo + '?token=' + token2);

        res.send(result.body)
        console.log(result.body)
 

    } catch (error) {
        console.log('Error en la carga de datos');
        console.log(error);
        return res.sendStatus(500);
    }
};

//PARA PODER CORROBORAR QUE EFECTIVAMENTE SE ENVIA AL SUCCES O FAILURE CUANDO SE GENERA EL PAGO
const success = async(req, res) => {

    try {
        // Verificar el token y obtener la información
        const token = req.query.token;
        const decoded = jwt.verify(token, 'tu_secreto_aqui');

        const respuesta = decoded.status;
        const articlesId = decoded.id;
        const articleId = decoded.articleId;

        const redirectTo = 'http://localhost:8081/home';

        // Responder o redirigir según sea necesario
        res.redirect(redirectTo + '?status=' + respuesta + '&' + 'id=' + articlesId + '&' + 'articleId=' + articleId);
    } catch (error) {
        console.error('Error al verificar el token:', error);
        res.sendStatus(500);
    }
}

const failure = (req, res) => {
    const redirectTo = 'http://localhost:8081/home';
    res.redirect(redirectTo)
}

const pending = (req, res) => {
    const redirectTo = 'http://localhost:8081/home';

    res.redirect(redirectTo);
}

const webhook = async (req, res) => {
    console.log(req.require)

    const payment = req.query
    
    try{
        if(payment.type == "payment"){
            const data = await mercadopago.payment.findById(payment['data_id'])
            console.log(data)
        }
        
        const paymentId = req.body.data.id;
        const paymentStatus = req.body.action;
        console.log(`Recibida notificación para el pago ID ${paymentId} con estado ${paymentStatus}`);

        res.sendStatus(204)
        console.log('PAGO CORRECTAMENTE GENERADO')
    }catch(error){
        console.log('Error al momento de enviar datos')
        console.log(error)
        return res.sendStatus(500).json({error : error.message})
    }

    res.send('webhook')
}

module.exports = {
    createOrder,
    success,
    failure,
    pending,
    webhook
}