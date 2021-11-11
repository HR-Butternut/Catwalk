import React, {useContext} from 'react';
import Product_Id_Context from '../context.jsx';
import ProductInfo from './productInfo.jsx'
import StyleSelector from './StyleSelector.jsx'
import ImageCarousel from './imageCarousel.jsx'

//<Reviews/>
/* <ProductCategory/>
<ProductTitle/>
<ProductPrice/>
<StyleSelector/>
<AddToCart/>
<ProductDescription/> */

const Overview = (props) => {
  // const product_id = useContext(Product_Id_Context);

  return (
    <div id='overview'>
      <ProductInfo/>
      <StyleSelector/>
      <ImageCarousel/>
    </div>
  );
}

export default Overview;