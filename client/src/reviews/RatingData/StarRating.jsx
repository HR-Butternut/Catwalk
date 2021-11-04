import React from 'react';
import StarRatings from 'react-star-ratings';

const Stars = (props) => {
  const average = (obj) => {
    //Potentially refactor to use array and reduce to account for possiblity of more ratings than five for reusability
    console.log(obj)
    var total = 0;
    var numOfRatings = 0;
    if (obj) {
      for (var key in obj) {
        var num = Number(obj[key]);
        total += (key * num);
        numOfRatings += num;
      }
    }

    if (total/numOfRatings) {
      return (total/numOfRatings)
    } else {
      return 0;
    }
  }
  var averageRating = average(props.ratings);
  console.log(averageRating)
  return(
    <div>
      Physical Star Ratings
      <StarRatings
        rating= {averageRating}

      />
    </div>
  )
}

export default Stars;