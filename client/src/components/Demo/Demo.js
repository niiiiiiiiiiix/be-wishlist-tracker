import React, { Component } from "react";
import "./Demo.css";
import { ImCross } from "react-icons/im";
import axios from "axios";

class Demo extends Component {
  constructor() {
    super();
    this.state = {
      wishlist: "None yet",
    };
  }
  componentDidMount = () => {
    axios.get("http://localhost:5000/user/test").then(function (res) {
      console.log(res);
    });
  };
  render() {
    return (
      <div className="bodyy">
        <div className="demo-container">
          <h1>
            This is your demo page
            {this.state.wishlist}
          </h1>
          <div className="action-bar">Action Bar for sort/filter/refresh</div>
          <div className="wishlist">
            Actual list of items
            <h1>{this.state.wishlist}</h1>
            <div>
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
                  <tr>
                    <td>
                      <a href="https://cottonon.com/SG/the-one-scoop-tee/2009222-02.html?dwvar_2009222-02_color=2009222-02&cgid=sale-womens&originalPid=2009222-02#start=20">
                        The One Scoop Tee
                      </a>
                    </td>
                    <td>$19.99</td>
                    <td>$10.00</td>
                    <td>16 Mar 2021, 12:28:55</td>
                    <td>
                      <ImCross />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a href="https://cottonon.com/SG/the-one-scoop-tee/2009222-02.html?dwvar_2009222-02_color=2009222-02&cgid=sale-womens&originalPid=2009222-02#start=20">
                        The One Scoop Tee
                      </a>
                    </td>
                    <td>$19.99</td>
                    <td>$10.00</td>
                    <td>16 Mar 2021, 12:28:55</td>
                    <td>
                      <ImCross />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a href="https://cottonon.com/SG/the-one-scoop-tee/2009222-02.html?dwvar_2009222-02_color=2009222-02&cgid=sale-womens&originalPid=2009222-02#start=20">
                        The One Scoop Tee
                      </a>
                    </td>
                    <td>$19.99</td>
                    <td>$10.00</td>
                    <td>16 Mar 2021, 12:28:55</td>
                    <td>
                      <ImCross />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a href="https://cottonon.com/SG/the-one-scoop-tee/2009222-02.html?dwvar_2009222-02_color=2009222-02&cgid=sale-womens&originalPid=2009222-02#start=20">
                        The One Scoop Tee
                      </a>
                    </td>
                    <td>$19.99</td>
                    <td>$10.00</td>
                    <td>16 Mar 2021, 12:28:55</td>
                    <td>
                      <ImCross />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a href="https://cottonon.com/SG/the-one-scoop-tee/2009222-02.html?dwvar_2009222-02_color=2009222-02&cgid=sale-womens&originalPid=2009222-02#start=20">
                        The One Scoop Tee
                      </a>
                    </td>
                    <td>$19.99</td>
                    <td>$10.00</td>
                    <td>16 Mar 2021, 12:28:55</td>
                    <td>
                      <ImCross />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// function Demo() {
//   return (
//     <div className="bodyy">
//       <div className="demo-container">
//         <h1>This is your demo page</h1>
//         <div className="action-bar">Action Bar for sort/filter/refresh</div>
//         <div className="wishlist">
//           Actual list of items
//           <div>
//             <table className="table-content">
//               <thead>
//                 <tr>
//                   <th>Product Name</th>
//                   <th>Original Price</th>
//                   <th>Sales Price</th>
//                   <th>Last Updated</th>
//                   <th>Delete</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>
//                     <a href="https://cottonon.com/SG/the-one-scoop-tee/2009222-02.html?dwvar_2009222-02_color=2009222-02&cgid=sale-womens&originalPid=2009222-02#start=20">
//                       The One Scoop Tee
//                     </a>
//                   </td>
//                   <td>$19.99</td>
//                   <td>$10.00</td>
//                   <td>16 Mar 2021, 12:28:55</td>
//                   <td>
//                     <ImCross />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>
//                     <a href="https://cottonon.com/SG/the-one-scoop-tee/2009222-02.html?dwvar_2009222-02_color=2009222-02&cgid=sale-womens&originalPid=2009222-02#start=20">
//                       The One Scoop Tee
//                     </a>
//                   </td>
//                   <td>$19.99</td>
//                   <td>$10.00</td>
//                   <td>16 Mar 2021, 12:28:55</td>
//                   <td>
//                     <ImCross />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>
//                     <a href="https://cottonon.com/SG/the-one-scoop-tee/2009222-02.html?dwvar_2009222-02_color=2009222-02&cgid=sale-womens&originalPid=2009222-02#start=20">
//                       The One Scoop Tee
//                     </a>
//                   </td>
//                   <td>$19.99</td>
//                   <td>$10.00</td>
//                   <td>16 Mar 2021, 12:28:55</td>
//                   <td>
//                     <ImCross />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>
//                     <a href="https://cottonon.com/SG/the-one-scoop-tee/2009222-02.html?dwvar_2009222-02_color=2009222-02&cgid=sale-womens&originalPid=2009222-02#start=20">
//                       The One Scoop Tee
//                     </a>
//                   </td>
//                   <td>$19.99</td>
//                   <td>$10.00</td>
//                   <td>16 Mar 2021, 12:28:55</td>
//                   <td>
//                     <ImCross />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>
//                     <a href="https://cottonon.com/SG/the-one-scoop-tee/2009222-02.html?dwvar_2009222-02_color=2009222-02&cgid=sale-womens&originalPid=2009222-02#start=20">
//                       The One Scoop Tee
//                     </a>
//                   </td>
//                   <td>$19.99</td>
//                   <td>$10.00</td>
//                   <td>16 Mar 2021, 12:28:55</td>
//                   <td>
//                     <ImCross />
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default Demo;
