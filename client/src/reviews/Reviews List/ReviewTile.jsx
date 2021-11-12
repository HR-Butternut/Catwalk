import React, {useContext, useState, useEffect} from 'react';
import Product_Id_Context from '../../context.jsx';
import ReviewStarRating from './ReviewStarRating.jsx';
import NameTime from './NameTime.jsx';
import ReviewBody from './ReviewBody.jsx';
import axios from 'axios';

const ReviewTile = (props) => {
  console.log(props);
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
        ____________________________________________________________________________________________
        <ReviewStarRating rating= {props.data.rating} />
        <NameTime name={props.data.reviewer_name} time={props.data.date}/>
        <b>{props.data.summary}</b>
        <ReviewBody text={props.data.body}/>
        {props.data.recommend ? <h6> This user recommended this product</h6> : null}

        {props.data.photos.length >= 1 ? props.data.photos.map ((value, index) => {
          return <img class={'RR_image'} key= {value.id} src={value.url} alt={'This is supposed to be an image'}
          width='50'
          height='auto'
          />
        }) : null}

        <div>Helpful<a value='helpful' onClick={() => handleHelpfulReport('helpful')}>{wasHelpful ? null : '? Yes'}</a> ({amountHelpful})</div>
        <a value ='report' onClick={() => handleHelpfulReport('report')}>{reported ? 'Reported' : 'Report'}</a>
      </div>
    )
  }
  return (
    <div></div>
  )
}

export default ReviewTile