import React from "react";
import GenderPieChart from "./GenderPieChart";
import IncomeAreaChart from "./IncomeAreaChart";
import ShirtSizeBarChart from "./ShirtSizeBarChart";
import "./Demo.css";

function Demo() {
  return (
    <div className="bodyy">
      <div className="demo-container">
        {/* <h1 className="draggable" draggable="true">
          This is your demo page
        </h1> */}
        <div className="draggable" draggable="true">
          <GenderPieChart />
        </div>
        <div className="draggable" draggable="true">
          <ShirtSizeBarChart />
        </div>
        <div className="draggable" draggable="true">
          <IncomeAreaChart />
        </div>
      </div>
      {/* <div className="demo-container">
        
      </div> */}
    </div>
  );
}

export default Demo;

// selects draggables
// const draggables = document.querySelectorAll(".draggable");
// // select containers
// const containers = document.querySelectorAll(".container");

// // draggables event listener
// draggables.forEach((draggable) => {
//   // dragstart => what happens when we start dragging something
//   draggable.addEventListener("dragstart", () => {
//     // add a class dragging to change styling when dragging
//     draggable.classList.add("dragging");
//   });
//   // dragend => what happens when we let go of that element
//   draggable.addEventListener("dragend", () => {
//     // remove dragging class
//     draggable.classList.remove("dragging");
//   });
// });

// // to move each element within a container and across container
// containers.forEach((container) => {
//   // listen to an event called dragover
//   container.addEventListener("dragover", (e) => {
//     // by default dropping inside an element is disabled
//     e.preventDefault();
//     // calling the getDragAfterElement to pass in the mouse position with .clientY
//     const afterElement = getDragAfterElement(container, e.clientY);
//     // current draggable element
//     const draggable = document.querySelector(".dragging");
//     // if we're not above anything
//     if (afterElement == null) {
//       // then add draggable to the end of the container
//       container.appendChild(draggable);
//     } else {
//       // otherwise insert draggable before afterElement
//       container.insertBefore(draggable, afterElement);
//     }
//   });
// });

// // this function determines our mouse position when dragging our element
// // and return whichever element our mouse position is directly after
// function getDragAfterElement(container, y) {
//   //
//   const draggableElements = [
//     // selects all draggable except the one we're currently dragging
//     // convert this to array with spread operator so that we can perform array operations
//     ...container.querySelectorAll(".draggable:not(.dragging)"),
//   ];

//   // reduce function to loop through the array draggableElements
//   // to determine which single element that is directly after our mouse position
//   // based on the 'y' position, which we can get from our event 'e'
//   return (
//     // ensure that we're only getting the element at afterElement
//     // and not both the offset and element
//     draggableElements.reduce(
//       // takes in 2 parameters
//       // closest = value we are reducing down to
//       // child = each of the draggableElements
//       (closest, child) => {
//         // bounding box, get us a rectangle for our box with its details
//         const box = child.getBoundingClientRect();
//         // offset distance between the center of our box and our actual mouse cursor
//         // y = mouse position
//         // box.top - box.height/2 will give us center of box
//         const offset = y - box.top - box.height / 2;
//         // if we drag something above a box it will give us a negative offset value
//         if (offset < 0 && offset > closest.offset) {
//           // && => we also want the offset that is the closest to 0
//           // ie we're barely having the cursor above the element
//           // return an object that is going to have our current offset nd current element
//           return { offset: offset, element: child };
//         } else {
//           // if offset is either greater than zero or not larger than the greatest closest.offset
//           // we can just return closest
//           return closest;
//         }
//       },
//       // we need to figure out the offset between our cursor
//       // and the element that comes directly after
//       // as well as the element that comes directly after
//       { offset: Number.NEGATIVE_INFINITY }
//     ).element
//   );
// }
