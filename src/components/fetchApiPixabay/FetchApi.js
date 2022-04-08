import PropTypes from 'prop-types';
const axios = require('axios').default;

const API_key = "25794310-c578201845b488d219bb56389";
const BASE_url = "https://pixabay.com/api/"

async function ApiImages(searchQuery, page, perPage) {
  const url = `${BASE_url}?key=${API_key}&q=${searchQuery}&image_type=photo&page=${page}&per_page=${perPage}`;
  const imagesList = await axios.get(url);
  return imagesList.data;
}

export default ApiImages;
ApiImages.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
};