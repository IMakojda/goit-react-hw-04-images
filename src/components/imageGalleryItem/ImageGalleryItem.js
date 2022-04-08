import React from "react";
import PropTypes from 'prop-types';

const ImageItem = ({ hits, onClick }) => {

  return (
    hits.map(({ id, largeImageURL, webformatURL, tags }) => (
      <li className="ImageGalleryItem" key={id} >
        <img src={webformatURL} alt={tags} className="ImageGalleryItem-image" onClick={() => onClick(largeImageURL, tags)} />
      </li>)
    )
  )
}

export default ImageItem;

ImageItem.propTypes = {
  hits: PropTypes.array,
  onClick: PropTypes.func,
};