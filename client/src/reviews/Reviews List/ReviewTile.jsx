import React, {useContext, useState, useEffect} from 'react';
import Product_Id_Context from '../../context.jsx';
import ReviewStarRating from './ReviewStarRating.jsx';
import NameTime from './NameTime.jsx';
import ReviewBody from './ReviewBody.jsx';
import ReviewPhoto from './ReviewPhoto.jsx'
import ReviewResponse from './ReviewResponse.jsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

const ReviewTile = (props) => {
  const [reported, setReported] = useState(false);
  const [wasHelpful, setWasHelpful] = useState(false);
  let [amountHelpful, setAmountHelpful] = useState(0)

  const handleHelpfulReport = (event) => {
    var config = {
      method: 'put',
      url:'http://localhost:10038/reviews',
      params: {
        review_id: props.data.review_id,
        type: event
      }
    }

    axios(config)
      .then((response) => {
        if (event === 'helpful') {
          setAmountHelpful(amountHelpful + 1);
          setWasHelpful(true);
        } else {
          setReported(true);
        }
      })
      .catch((err) => {
        console.error('unable to update helpful/report', err)
      })
  }

  useEffect(() => {
    if (props.data) {
      setAmountHelpful(amountHelpful + props.data.helpfulness)
    }
  }, [])
  if (props.data) {
    return (
      <div>
        <Container fluid>
          <Row>
            <Col>
              <ReviewStarRating rating= {props.data.rating} />
            </Col>
            <Col>
              <NameTime name={props.data.reviewer_name} time={props.data.date}/>
            </Col>
          </Row>
          <Row>
            <b>{props.data.summary}</b>
          </Row>
          <Row>
            <ReviewBody text={props.data.body}/>
          </Row>
          <Row>
            {props.data.recommend ? <h6><span>&#10003;</span> This user recommended this product</h6> : null}
          </Row>
          <Row>
            {props.data.photos.length >= 1 ? props.data.photos.map ((value) => {
              return <Col>
              <ReviewPhoto
              key={value.id}
              url={value.url}
              /></Col>
            }) : null}
          </Row>
          <Row>
          <div>Helpful<a value='helpful' onClick={() => handleHelpfulReport('helpful')}>{wasHelpful ? null : '? Yes'}</a> ({amountHelpful})</div>

          </Row>
          <Row>
          <ReviewResponse response={props.data.response}/>
          <a value ='report' onClick={() => handleHelpfulReport('report')}>{reported ? 'Reported' : 'Report'}</a>

          </Row>

        </Container>
      </div>
    )
  }
  return (
    <div></div>
  )
}

export default ReviewTile