import React, {useContext, useState, useEffect}  from 'react';
import Product_Id_Context from '../context.jsx';
import axios from 'axios';
import QuestionsSearch from './questionsSearch.jsx';
import QuestionsBody from './questionsBody.jsx';
import QuestionsFooter from './questionsFooter.jsx';

const Questions = (props) => {
  const product_id = useContext(Product_Id_Context);

  var [questions, setQuestions] = useState([]);
  var [questions_view, setQuestionsView] = useState('partial');

  //console.log('product_id from context is ', product_id);

  var getQuestions = function(pid, page, count) {

    console.log('pid is', pid);
    //console.log('prod_id is', product_id);
    if (pid === undefined) {
      pid = product_id;
    }
    pid = `?pid=${pid}`;
    //console.log('pid is now', pid);
    if (page === undefined) {
      page = 1;
    }
    page = `&page=${page}`
    if (count === undefined) {
      count = 5;
    }
    count = `&count=${count}`
    var config = {}

    var endpoint = `http://localhost:10038/get_item_questions/${pid}${page}${count}`;
    config = {
      method:'get',
      url:`http://localhost:10038/get_item_questions/${pid}${page}${count}`

      // params: {product_id: id}
    };
    //console.log('endpoint is', endpoint);

    axios(config)
      .then((resolveQuestions) => {
        console.log('Questions are: ', resolveQuestions.data)
        questions = resolveQuestions.data;
        questionsFilter(questions = resolveQuestions.data)
      })
      .catch((err) => {
        console.error(err);
      })

  }

  var moreQuestionsClick = function() {
    if (questions_view === 'partial') {
      setQuestionsView('full');
    } else {
      setQuestionsView('partial');
    }
  }

  var getSearchString = function(searchString) {
    console.log(searchString);
  }

  var questionsFilter = function(questions) {
    console.log('do some work on questions, then set them')
    var newQuestions = questions;
    setQuestions(newQuestions)
  }

  //console.log('this pid is', product_id)
  useEffect(() => {
    console.log('getting Questions');
    if (product_id) {
      getQuestions(product_id);
    }
  }, [product_id])

  return (
    <div>

    Questions Component Start, Product_id is {product_id}

    <QuestionsSearch getSearchString={getSearchString}/>
    <QuestionsBody questions={questions} questions_view={questions_view} />
    <QuestionsFooter questions_view={questions_view} moreQuestionsClick={moreQuestionsClick} />

    </div>
  )
}

export default Questions;
