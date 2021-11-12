import React, {useContext, useState, useEffect}  from 'react';
import Product_Id_Context from '../context.jsx';
import axios from 'axios'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import ImageGallery from 'react-image-gallery';
import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";




const StyleSelector = (props) => {
  const product_id = useContext(Product_Id_Context);
  let [productStylesInfo, setProductStylesInfo] = useState({
    price: '',
    styleName: '',
    styles: [],
    selectSize: [],
    selectedSize: 'SELECT SIZE',
    selectQuantity: 0,
    displayQuantity: 'SELECT QUANTITY',
    carouselImages: []
  })

  let styleSetter = () => {
    axios.get(`http://localhost:10038/productStylesRequest/${product_id}`)
      .then (productStyles => {
        let arrayOfSkus = Object.entries(productStyles.data[0].skus).map(key => ({ ...key[1]}));
        let carouselImagesArray = productStyles.data[0].photos.map(photo => ({
            original: photo.url,
            thumbnail: photo.thumbnail_url
          })
        );

        setProductStylesInfo(prevState => ({
          ...prevState,
          styles: productStyles.data,
          price: productStyles.data[0].original_price,
          styleName: productStyles.data[0].name,
          selectSize: arrayOfSkus,
          carouselImages: carouselImagesArray
        }));
      })

      .catch (error => {
        console.log('failed to get product styles')
      });
  }

  let thumbnailClick = (style) => {
    let arrayOfSkus = Object.entries(style.skus).map(key => ({ ...key[1]}));
    let selectedStyleCarousel = style.photos.map(photo => ({
      original: photo.url,
      thumbnail: photo.thumbnail_url
    }));

    setProductStylesInfo(prevState => ({
      ...prevState,
      price: style.original_price,
      styleName: style.name,
      selectSize: arrayOfSkus,
      carouselImages: selectedStyleCarousel
    }));
  }

  let selectSizeClick = (sku) => {
    setProductStylesInfo(prevState => ({
      ...prevState,
      selectedSize: sku.size,
      selectQuantity: sku.quantity
    }));
  }

  let selectQuantityClick = (quantity) => {
    setProductStylesInfo(prevState => ({
      ...prevState,
      displayQuantity: quantity
    }));
  }

  let quantityArray = (num) => {
    let result = [];

    for (let i = 0; i <= num; i++) {
      if (i === 16) {
        return result
      }
      result.push(i)
    }
    return result;
  }

  let checkSize = () => {
    if (productStylesInfo.selectedSize === 'SELECT SIZE') {
      alert('please select a size')
    }
  }

  useEffect(() => {
    styleSetter();
  }, [product_id])


  return (
    <div id='OV_styleSelector'>
      <div id='OV_price'>
        <p>{productStylesInfo.price}</p>
      </div>
      <div id='OV_style'>
        <p> <b>STYLE: </b> {productStylesInfo.styleName}</p>
      </div>
      <div className='OV_thumbnails'>
        <Container>
          <Row>
            {productStylesInfo.styles.map(style => {
              return (
                <Col className='OV_thumbnail' md={3}> <img src={style.photos[0].thumbnail_url} onClick={() => thumbnailClick(style)}/> </Col>
              )
            })}
          </Row>
        </Container>
      </div>
      <div id='sizeSelector'>
        <DropdownButton id="selectSize" title={productStylesInfo.selectedSize}>
          {productStylesInfo.selectSize.map(sku => {
            return (
              <Dropdown.Item onClick={() => selectSizeClick(sku)}>{sku.size}</Dropdown.Item>
            )
          })}
        </DropdownButton>
      </div>
      <div id='quantitySelector'>
        <DropdownButton id="selectQuantity" title={productStylesInfo.displayQuantity}>
          {quantityArray(productStylesInfo.selectQuantity).map(num => {
            return (
              <Dropdown.Item onClick={() => selectQuantityClick(num)}>{num}</Dropdown.Item>
            )
          })}
        </DropdownButton>
      </div>
      <div id='addToCart'>
        <button type="button" onClick={() => checkSize()}>ADD TO CART</button>
      </div>
      <div>
        <ImageGallery items={productStylesInfo.carouselImages} thumbnailPosition='left'/>
      </div>
    </div>
  )
}

export default StyleSelector;