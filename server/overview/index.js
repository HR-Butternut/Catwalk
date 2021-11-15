//console.log('overview routes loaded loaded')
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const aws = require('aws-sdk');
let s3 = new aws.S3({
  thePort: process.env.PORT,
  theBaseUrl: process.env.baseURL
});
const PORT = s3.thePort || 10038;
var baseUrl = s3.theBaseUrl || "http://localhost:"+PORT;
const API_KEY = require('../config.js');

module.exports = function(app) {
  app.use(express.json());
  app.use(cors());
  app.get('/productInfoRequest/:product_id', (req, res) => {
    console.log('API KEY IS', API_KEY)
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
        res.header('Access-Control-Allow-Origin', '*');
        // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.status(200).send(productInfo)
      })
      .catch((error) => {
        res.status(500).send('There was a problem retrieving the product category')
      })
  });

  app.get('/productStylesRequest/:product_id', (req, res) => {
    var id = req.params.product_id;
    var config = {
      method: 'get',
      url:`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${id}/styles`,
      headers: {
        'Authorization': API_KEY,
        'Access-Control-Allow-Origin': '*'
        // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      }
    };
    axios(config)
      .then((productResponse) => {
        var productStyles = productResponse.data.results;
        res.header('Access-Control-Allow-Origin', '*');
        //res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.status(200).send(productStyles)
      })
      .catch((error) => {
        res.status(500).send('There was a problem retrieving the product styles')
      })
  });

}