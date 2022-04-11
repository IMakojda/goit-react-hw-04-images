import React from "react";
import PropTypes from 'prop-types';

const ImageItem = ({ webformatURL, tags, largeImageURL, onClick }) => {

  return (
    <img src={webformatURL} alt={tags} className="ImageGalleryItem-image" onClick={() => onClick(largeImageURL, tags)} />
  )
}

export default ImageItem;

ImageItem.propTypes = {
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  largeImageURL: PropTypes.string,
  onClick: PropTypes.func,
};