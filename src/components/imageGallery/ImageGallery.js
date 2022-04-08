import ImageItem from "components/imageGalleryItem/ImageGalleryItem";
import PropTypes from 'prop-types';

function ImageGallery({ listItem, imageClick }) {
  return (
    <ul className="ImageGallery" >
      <ImageItem
        onClick={imageClick}
        hits={listItem}
      />
    </ul>
  )
}

export default ImageGallery;

ImageGallery.propTypes = {
  listItem: PropTypes.array,
  imageClick: PropTypes.func,
};