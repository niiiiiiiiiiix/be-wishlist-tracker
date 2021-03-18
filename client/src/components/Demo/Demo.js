import React, { useState, useEffect } from "react";
import "./Demo.css";
import { ImCross } from "react-icons/im";
import axios from "axios";
import Loader from "./Loader";

const Demo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:5000/user/testing456/wishlist", {
        withCredentials: true,
      })
      .then((response) => {
        setIsLoading(false);
        setWishlist(response.data);
      })
      // .then((response) => console.log(response.data));
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="bodyy">
      <div className="demo-container">
        <h1>This is your demo page</h1>
        <div>
          <ul className="action-bar">
            <li className="add-wishlist-button action-bar-text">Add item</li>
            <li className="refresh-button action-bar-text">Refresh wishlist</li>
          </ul>
        </div>
        <div className="wishlist">
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
            {isLoading && <Loader />}
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
                    <td className="delete-button">
                      <ImCross />
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

export default Demo;
