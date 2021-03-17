import React, { useState, useEffect } from "react";
import "./Demo.css";
import { ImCross } from "react-icons/im";
import axios from "axios";

const Demo = () => {
  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/user/test")
      .then((response) => setWishlist(response.data));
  }, []);

  return (
    <div className="bodyy">
      <div className="demo-container">
        <h1>This is your demo page</h1>
        <div className="action-bar">Action Bar for sort/filter/refresh</div>
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
