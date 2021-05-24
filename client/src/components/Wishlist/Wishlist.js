import React, { useState, useEffect } from "react";
import "./Wishlist.css";
import { ImCross } from "react-icons/im";
import axios from "axios";
import Loader from "./Loader";

// const URL = "http://localhost:5000/user/wishlist";
// const URL = "https://wishlist-tracker.herokuapp.com/user/wishlist";

const Wishlist = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [lastDateUpdated, setLastDateUpdated] = useState("");
  const [itemUrl, setItemUrl] = useState("");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/wishlist`, {
        withCredentials: true,
      })
      .then((response) => {
        setIsLoading(false);
        setWishlist(response.data);
        setLastDateUpdated(response.data[response.data.length - 1].lastUpdated);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  let urlInput = React.createRef();

  function addToWishlist() {
    setIsLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/user/wishlist`,
        {
          url: urlInput.current.value,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setIsLoading(false);
        setWishlist([...wishlist, ...response.data]);
        setLastDateUpdated(response.data[response.data.length - 1].lastUpdated);
        setItemUrl("");
      })
      .catch((error) => {
        console.log(error);
        alert("Invalid URL");
      });
  }

  function removeFromWishlist(id) {
    // useful link = https://www.robinwieruch.de/react-remove-item-from-list
    const newWishlist = wishlist.filter((item) => item._id !== id);
    axios
      .delete(`${process.env.REACT_APP_API_URL}/user/wishlist/${id}`, {
        withCredentials: true,
      })
      .then(() => {
        setWishlist(newWishlist);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function refreshWishlist() {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/wishlist`, {
        withCredentials: true,
      })
      .then((response) => {
        setIsLoading(false);
        setWishlist(response.data);
        setLastDateUpdated(response.data[response.data.length - 1].lastUpdated);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="wishlist-container">
      <div className="wishlist-body">
        <div className="action-bar">
          <div className="url-input-container">
            <input
              type="text"
              ref={urlInput}
              placeholder="enter product url here"
              className="url-input"
              value={itemUrl}
              onChange={(e) => setItemUrl(e.target.value)}
            />
          </div>
          <div className="action-container">
            <button className="ac-button" onClick={addToWishlist}>
              add item
            </button>
            <button className="ac-button" onClick={refreshWishlist}>
              refresh wishlist
            </button>
          </div>
        </div>

        <div className="wishlist-status">
          <div>{`last updated: ${lastDateUpdated}`}</div>
          <div>{isLoading && <Loader />}</div>
        </div>

        <div className="wishlist">
          <table className="table-content">
            <thead>
              <tr>
                <th>product name</th>
                <th>original price</th>
                <th>sales price</th>
                <th>delete</th>
              </tr>
            </thead>

            <tbody>
              {wishlist.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>
                      <a
                        href={item.productLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.productName.toLowerCase()}
                      </a>
                    </td>
                    <td>{item.originalPrice}</td>
                    <td>{item.salesPrice}</td>
                    <td>
                      <ImCross
                        onClick={() => removeFromWishlist(item._id)}
                        className="delete-button"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
