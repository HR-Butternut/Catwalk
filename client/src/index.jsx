import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Overview from './overview/index.jsx';
import Questions from './questions/index.jsx';
import Reviews from './reviews/index.jsx';
import Product_Id_Context from './context.jsx';
//import PORT from '../server/server.js';
var thePort = process.env.PORT;
if (!thePort) {
  thePort = 10038; //Galvanize NYC zipcode
}
const PORT = thePort;

function App() {
  var [product_id, setProduct_id] = useState(0);


  var singleItemRequest = (id) => {
    var config = {}
    if (id) {
      config = {
        method:'get',
        url:`http://localhost:${PORT}/singleItemRequest`,
        params: {product_id: id}
      };
    } else {
      config = {
        method: 'get',
        url: `http://localhost:${PORT}/starting_product_id`
      }
    }
    axios(config)
      .then((resolveProductInfo) => {

        setProduct_id(product_id = resolveProductInfo.data.product_id)
        //setProduct_id(product_id = 38325) //DEBUG
        //setProduct_id(product_id = 38227) //DEBUG
      })
      .catch((err) => {
        console.error(err);
      })
  }

  /* Use Effects second paramenter makes sure that it only runs when the app is mounted like component did mount */

  useEffect(() => {
    singleItemRequest();
  }, [])

  return (
    <div>
      <Product_Id_Context.Provider value={product_id}>
        <Overview/>
        <Questions/>
        <Reviews/>
      </Product_Id_Context.Provider>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));
