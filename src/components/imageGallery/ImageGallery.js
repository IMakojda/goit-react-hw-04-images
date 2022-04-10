import ImageItem from "components/imageGalleryItem/ImageGalleryItem";
import PropTypes from 'prop-types';

function ImageGallery({ listItem, imageClick }) {
  return (
    <ul className="ImageGallery" >

      {listItem.map(({ id, largeImageURL, webformatURL, tags }) => (
        <li className='ImageGalleryItem' key={id}>
          <ImageItem
            onClick={() => imageClick(largeImageURL)}
            webformatURL={webformatURL}
            tags={tags}
          />
        </li>
      ))}

    </ul>
  )
}

export default ImageGallery;

ImageGallery.propTypes = {
  listItem: PropTypes.array,
  imageClick: PropTypes.func,
};