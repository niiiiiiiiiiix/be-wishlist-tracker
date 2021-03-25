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

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/wishlist`, {
        withCredentials: true,
      })
      .then((response) => {
        setIsLoading(false);
        setWishlist(response.data);
        // console.log(response.data);
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
      .then((item) => {
        setIsLoading(false);
        setWishlist([...wishlist, ...item.data]);
      })
      .catch((error) => {
        console.log(error);
        alert("Invalid URL");
      });
  }

  function removeFromWishlist(id) {
    // useful link = https://www.robinwieruch.de/react-remove-item-from-list
    // console.log(id);
    const newWishlist = wishlist.filter((item) => item._id !== id);
    // console.log(newWishlist);
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
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="bodyy">
      <div className="demo-container">
        <h1>This is your demo page</h1>
        <div>
          <ul className="action-bar">
            <input
              type="text"
              ref={urlInput}
              placeholder="Paste/type url here"
            ></input>
            <button
              className="add-wishlist-button action-bar-text"
              onClick={addToWishlist}
            >
              Add item
            </button>
            <button
              className="refresh-button action-bar-text"
              onClick={refreshWishlist}
            >
              Refresh wishlist
            </button>
          </ul>
        </div>
        <div className="wishlist">
          {isLoading && <Loader />}
          <table className="table-content">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Original Price</th>
                <th>Sales Price</th>
                <th>Last Updated</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {wishlist.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>
                      <a href={item.productLink}>{item.productName}</a>
                    </td>
                    <td>{item.originalPrice}</td>
                    <td>{item.salesPrice}</td>
                    <td>{item.lastUpdated}</td>
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
