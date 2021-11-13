const express = require('express');
const axios = require('axios');
const PORT = 10038; //Galvanize NYC zipcode
const API_KEY = require('../config.js')
const app = express();
app.use(express.json());

module.exports = function(app) {

  app.get('/get_item_questions', (req, res) => {
    //console.log(req);
    var pid = req.query.pid;
    var page = req.query.page;
    (page) ? page = '&page='+page : page = '';
    var count = req.query.count;
    (count) ? count = '&count='+count : count = '';

    var endpoint =  `https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/questions?product_id=${pid}${page}${count}`;

    console.log('get endpoint is', endpoint);
    var config = {
      method: 'get',
      url: endpoint,
      headers: {
        'Authorization': API_KEY
      }
    };
    axios(config)
      .then((questionsResponse) => {
        var questions = questionsResponse.data.results;
        // var default_product_id = { 'product_id': itemsResponse.data[0].id };
        res.status(200).send(questions)
        //console.log('response was', questions);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send(`There was a problem retrieving the questions for item#${pid}`)
      })
  });

  app.put('/helpful_question', (req, res) => {
    //console.log(req);
    var qid = req.query.qid.toString();
    console.log('endpoint is', `https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/questions/${qid}/helpful`)

    //console.log('qid is [', qid, ']');
    var config = {
      method: 'put',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/questions/${qid}/helpful`,
      headers: {
        'Authorization': API_KEY
      }
    };
    axios(config)
      .then((helpfulQuestionResponse) => {
        var questions = helpfulQuestionResponse.data;
        // var default_product_id = { 'product_id': itemsResponse.data[0].id };
        res.status(helpfulQuestionResponse.status).send(questions)
        console.log('helpful question response was "', questions, '" status:', helpfulQuestionResponse.status);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send(`There was a problem marking question#${qid} as helpful.`)
      })
  });

  app.post('/add_question', (req, res) => {
    //console.log(req);
    //var qid = req.query.qid.toString();
    var my_product_id = parseInt(req.query.product_id);
    var my_body = req.query.body.toString();
    var my_name = req.query.name.toString();
    var my_email = req.query.email.toString();
    console.log('request query is', req.query)
    //console.log('fields are ', product_id, body, name, email);
    var request_body = {
      body : my_body,
      name : my_name,
      email : my_email,
      product_id : my_product_id
    };

    var endpoint = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/questions/`;
    var headers = {
      'Authorization': API_KEY
    };

    axios.post(endpoint, request_body, { headers } )
      .then((addQuestionResponse) => {
        var questions = addQuestionResponse.data;
        res.status(addQuestionResponse.status).send(questions)
        console.log('add question response was "', questions, '" status:', addQuestionResponse.status);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send(`There was a problem inserting a question.`)
      })
  });



  app.post('/add_answer', (req, res) => {
    var qid = parseInt(req.query.qid);
    var my_body = req.query.body.toString();
    var my_name = req.query.name.toString();
    var my_email = req.query.email.toString();

    var request_body = {
      body : my_body,
      name : my_name,
      email : my_email
    };
    var params = {
      question_id: qid
    }
    var endpoint = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/questions/${qid}/answers`;
    var headers = {
      'Authorization': API_KEY
    };

    axios.post(endpoint, request_body, { headers, params } )
      .then((addAnswerResponse) => {
        var answers = addAnswerResponse.data;
        res.status(addAnswerResponse.status).send(answers)
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send(`There was a problem inserting that answer.`)
      })
  });



  console.log('questions routes finished loading');
}