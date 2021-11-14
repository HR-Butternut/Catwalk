import React, {useContext, useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product_Id_Context from '../context.jsx';
import RR_Context from './RR_Context.jsx';
import ReviewList from './Reviews List/ReviewList.jsx';
import RatingData from './RatingData/RatingData.jsx';
import axios from 'axios';

const Reviews = (props) => {
  const product_id = useContext(Product_Id_Context);
  const [reviewData, setReviewData] = useState({
    count: 0,
    page: 0,
    product: '',
    results: [{
      body: '',
      data: '',
      helpfulness: 0,
      photos: [],
      rating: 0,
      recommend: true,
      response: '',
      review_id: 0,
      reviewer_name: '',
      summary: ''
    }]
  });
  const [reviewMetaData, setReviewMetaData] =useState({
    characteristics: {
      Comfort: {id: 0, value: ''},
      Fit: {id: 0, value: ''},
      Length: {id: 0, value: ''},
      Quality: {id: 0, value: ''}
    },
    product_id: '',
    ratings: {
      1: '',
      2: '',
      3: '',
      4: '',
      5: '',
    },
    recommended: {
      false: '',
      true: ''
    }
  });
  const [reviewSort, setReviewSort] = useState('relevence');
  const [reviewFilter, setReviewFilter] = useState()
  const retrieveReviewData = (product_id) => {
    var metaConfig = {
      method:'get',
      //Talk about baseurl variable somewhere else for deployment
      url:'http://localhost:10038/productMetaData',
      params: {
        product_id: product_id
      }
    }
    var reviewConfig = {
      method:'get',
      url:'http://localhost:10038/productReviews/',
      params: {
        // page: page,
        // count: count,
        sort: reviewSort,
        product_id: product_id
      }
    }
    console.log('ran')
    axios(metaConfig)
    .then((response) => {
      setReviewMetaData(response.data);
      var numOfReviews = 0;
      for (var key in response.data.ratings) {
        numOfReviews += Number(response.data.ratings[key])
      }
      reviewConfig.params.count ? null :reviewConfig.params.count = numOfReviews;
      return axios(reviewConfig);
    })
    .then((secondResponse) => {
      setReviewData(secondResponse.data);
    })
      .catch((err) => {
        console.error('There was an error retriving some of the reviews Data', err);
      })
  }

  useEffect(() => {
    if (product_id) {
      retrieveReviewData(product_id);

    }
  }, [product_id, reviewSort])

  return (
    <div class='my-4'>
    <RR_Context.Provider value={[reviewMetaData, reviewData]}>
    <Container fluid='md'>
      <Row>Ratings & Reviews </Row>
      <Row>
        <Col xs={3}>
        <RatingData
        data={reviewMetaData}
        filter={() => setReviewFilter()}
        filterBy={reviewFilter}
        />
        </Col>
        <Col xs={9}>
        <ReviewList
          data={reviewData}
          metaInfo={reviewMetaData.ratings}
          typeSort={(event) => setReviewSort(event.target.value)}
          sortedBy={reviewSort}
          />

        </Col>
      </Row>
    </Container>
    </RR_Context.Provider>
    </div>
  )
}

export default Reviews;