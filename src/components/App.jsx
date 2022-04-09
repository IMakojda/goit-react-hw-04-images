import {useState,useEffect} from "react";
import SearchBar from "./searchBar/Searchbar";
import ImageGallery from "./imageGallery/ImageGallery";
import ApiImages from "./fetchApiPixabay/FetchApi";
import { BallTriangle } from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Modal from "./modal/Modal";
import Button from "./button/Button";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {generateRandomColor} from './utils/ColorGenerator'

export default function App() {

  const [searchQuery, setSearchQuery] = useState('');
  const [imageList, setImageList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState(null);
  const [tags, setTags] = useState(null);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  // eslint-disable-next-line
  const [lastPage, setLastPage] = useState(null);
  const [status, setStatus] = useState('idle');
  // eslint-disable-next-line
  const [error, setError] = useState(null)
 

useEffect(() => {
  
  if (!searchQuery || !page) {
   return;
  }
   setStatus("pending");
    ApiImages(searchQuery, page)
    .then(({ hits, totalHits }) => {
        setImageList(state => [...state, ...hits]);
        setStatus("resolved");
        setLoadMore(true)
    
    const lastPageMatch = setLastPage(Math.ceil(totalHits / hits));
        
      if (hits.length === 0) {
        setLoadMore(false)
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      }

      if (page === lastPageMatch) {
        setLoadMore(false)
        Notify.warning(`We're sorry, but you've reached the end of search results.`);
      }
    })
    .catch(error => {
      setError('Enter correct name.');
    })
  }, [searchQuery,page])  

  const toggleModal = () => {
    setShowModal(!showModal)
  }
  
  const handleClickImage = (url, tags) => {
    setUrl(url);
    setTags(tags);
    toggleModal();
  }
  
  const handleLoadBtn = () => {
    setPage(state=>state+1)
  }  
  
  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setImageList([]);
    setLastPage(null);
    setPage(1);
    setLoadMore(false);
  }

  return (
      <>
        <SearchBar onSubmit={handleFormSubmit} />

        {status === "idle" && <div className="noQuery">No image or photo yet</div>}
        
        {status === "pending" && 
          (
          <BallTriangle
            color={generateRandomColor()}
            height={250}
            width={250}
          />
          )}
        
        {status === "rejected" && <div className="errorMessage">error.message</div> }
        
        {status === "resolved" && (
          <ImageGallery
          query={searchQuery}
          listItem={imageList}
          imageClick={handleClickImage}
        />
        )}

        {loadMore && (
          <>
            <ImageGallery
              query={searchQuery}
              listItem={imageList}
              imageClick={handleClickImage}
            />
            {status === 'pending' && (
              <BallTriangle
                color={generateRandomColor()}
                height={250}
                width={250}
              />
            )}
            <Button
              nameClas="Button"
              handleLoadBtn={handleLoadBtn}
              labelBtn="Load More"
            ><span>Load More</span></Button>
          </>
        )}
        
        {showModal && (
          <Modal onClose={toggleModal}>
            <img className="imageLarge" alt={tags} src={url} />
          </Modal>
        )}
      
    </>
    )
};
