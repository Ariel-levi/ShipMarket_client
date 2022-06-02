import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { BiLoader } from 'react-icons/bi';
import '../css/search.css';
import '../css/imagesSearch.css';
import LottieAnimation from './lottieAnimation';
import { PEXELS_API_KEY } from '../../services/apiService';

function ImagesSearch(props) {
  const [images, setImages] = useState([]);
  const [pexels, setPexels] = useState([]);
  const [total_results, setTotal_results] = useState(0);
  const [results_num, setResults_num] = useState(0);
  let searchRef = useRef();

  useEffect(() => {
    doApi('food');
  }, []);

  const search = () => {
    let search = searchRef.current.value;
    setImages([]);
    {
      search ? doApi(search) : toast.error('You need to enter something 😒');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      search();
    }
  };

  const doApi = async (_SearchQ) => {
    let url = `https://api.pexels.com/v1/search?query=${_SearchQ}&per_page=80`;
    let resp = await axios.get(url, {
      headers: {
        Authorization: PEXELS_API_KEY
      }
    });
    // console.log(resp.data);
    // console.log(resp.data.photos);
    setResults_num(80);
    setPexels(resp.data);
    setTotal_results(resp.data.total_results);
    setImages(resp.data.photos);
  };

  const onClickLoadeMore = async () => {
    let url = pexels.next_page;
    let resp = await axios.get(url, {
      headers: {
        Authorization: PEXELS_API_KEY
      }
    });
    setPexels(resp.data);
    setResults_num(results_num + 80);
    setImages((images) => [...images, ...resp.data.photos]);
  };

  return (
    <div className="light_box">
      <button
        onClick={() => {
          props.setOpenImageSearch(false);
        }}
        className="btn btn-outline-danger position-absolute top-0 end-0 mt-5 me-5">
        <AiOutlineClose />
      </button>
      {images.length === 0 ? (
        <LottieAnimation />
      ) : (
        <div className="inside_box p-5">
          {/* search */}
          <div className="p-1 bg-light rounded rounded-pill shadow mb-4 sticky-top">
            <div className="input-group">
              <input
                ref={searchRef}
                onKeyPress={handleKeyPress}
                type="search"
                placeholder="Search..."
                className="form-control border-0 bg-light"
              />
              <div className="input-group-append">
                <button onClick={search} className="btn btn-link text-primary searchBtn">
                  <BsSearch />
                </button>
              </div>
            </div>
          </div>
          {/* search */}
          <div className="container">
            {images.map((item) => {
              return (
                <img
                  onClick={() => {
                    props.setImageSearch(item.src.landscape);
                    props.setOpenImageSearch(false);
                  }}
                  key={item.id}
                  src={item.src.landscape}
                  alt={item.alt}
                />
              );
            })}
            <br />
            {total_results > results_num ? (
              <button
                onClick={() => {
                  onClickLoadeMore();
                }}
                style={{
                  background: 'none'
                }}
                className="animaLinkSM">
                Load More <BiLoader className="mx-2" />
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ImagesSearch;
