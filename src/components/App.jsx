import React,{Component} from "react";
import SearchBar from "./searchBar/Searchbar";
import ImageGallery from "./imageGallery/ImageGallery";
import ApiImages from "./fetchApiPixabay/FetchApi";
import { BallTriangle } from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Modal from "./modal/Modal";
import Button from "./button/Button";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {generateRandomColor} from './utils/ColorGenerator'

export default class App extends Component {
  
  state = {
    searchQuery: "",
    imageList: [],
    error: null,
    status: "idle",
    showModal: false,
    url: null,
    tags: null,
    page: 1,
    perPage: 20,
    loadMore: false,
    lastPage:null
  }

  componentDidUpdate(prevProps, prevState) {
    const {searchQuery, page,perPage,lastPage}=this.state
    const prevQuery = prevState.searchQuery;
    const prevPage = prevState.page;

    if (prevQuery !== searchQuery || page !== prevPage) {
      this.setState({ status: "pending" })

      setTimeout(() => {
        ApiImages(searchQuery, page, perPage)
        .then(({ hits, totalHits }) => {
          
          this.setState(prevState => {
            return {
            imageList: [...prevState.imageList, ...hits],
            status: "resolved",
            loadMore: true,
            lastPage: Math.ceil(totalHits / perPage),
            }
          })

          if (hits.length === 0) {
            this.setState({ loadMore: false })
           Notify.failure('Sorry, there are no images matching your search query. Please try again.');
          }

          if (page === lastPage) {
            this.setState({ loadMore: false })
            Notify.warning(`We're sorry, but you've reached the end of search results.`);
          }
        })
          
      .catch(error=>this.setState({error:"Enter correct name."}))
      },2000)
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }))
  }
  
  handleClickImage = (url, tags) => {
    this.setState({ url, tags });
    this.toggleModal();
  }
  
  handleLoadBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1
    }));
  }  
  
  handleFormSubmit = searchQuery => {
    this.setState({
      searchQuery,
      imageList: [],
      lastPage: null,
      page: 1,
      loadMore:false,
    })
  }

  render() {
    const {searchQuery, imageList, status, showModal, url, tags, loadMore } = this.state
    return (
      <>
        <SearchBar onSubmit={this.handleFormSubmit} />

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
          imageClick={this.handleClickImage}
        />
        )}

        {loadMore && (
          <>
            <ImageGallery
              query={searchQuery}
              listItem={imageList}
              imageClick={this.handleClickImage}
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
              handleLoadBtn={this.handleLoadBtn}
              labelBtn="Load More"
            ><span>Load More</span></Button>
          </>
        )}
        
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img className="imageLarge" alt={tags} src={url} />
          </Modal>
        )}
      
    </>
    )
  }
};
