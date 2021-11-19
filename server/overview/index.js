//console.log('overview routes loaded loaded')
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const PORT = 10038; //Galvanize NYC zipcode
const API_KEY = require('../config.js')
const app = express();
app.use(express.json());


module.exports = function(app) {
  app.use(cors());

  app.get('/productInfoRequest/:product_id', (req, res) => {
    var preFlightConfig = {
      method: 'options',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/',
      headers: {
        'Authorization': API_KEY,
        'Access-Control-Allow-Private-Network': true,
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*'
      }
    };
    axios(preFlightConfig)
      .then((pfcResponse)=>{


        var id = req.params.product_id;
        var config = {
          method: 'get',
          url:`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${id}`,
          headers: {
            'Authorization': API_KEY,
            'Access-Control-Allow-Origin': '*'
          }
        };
        axios(config)
          .then((productResponse) => {
            var productInfo = productResponse.data;
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.status(200).send(productInfo)
          })
          .catch((error) => {
            res.status(500).send('There was a problem retrieving the product category')
          })


    })
    .catch((preFlightErr)=>{
      console.log(preFlightErr);
    })
  });

  app.get('/productStylesRequest/:product_id', (req, res) => {
    var id = req.params.product_id;
    var config = {
      method: 'get',
      url:`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${id}/styles`,
      headers: {
        'Authorization': API_KEY
      }
    };
    axios(config)
      .then((productResponse) => {
        var productStyles = productResponse.data.results;
        res.status(200).send(productStyles)
      })
      .catch((error) => {
        res.status(500).send('There was a problem retrieving the product styles')
      })
  });

}