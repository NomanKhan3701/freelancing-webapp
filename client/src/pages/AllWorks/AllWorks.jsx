// import React from "react";
// import { useNavigate } from "react-router";
// import { Footer, Navbar } from "../../components/import";
// import "./AllWorks.scss";
// import { Link } from "react-router-dom";

// const AllWorks = () => {
//   const navigate = useNavigate();
//   return (
//     <>
//       <div className="all-works-container">
//         <Navbar />
//         <h1>All works</h1>
//         <div className="work-cards">
//           {StaticRange.freelancingWork.length === 0 ? (
//             "No Work Done."
//           ) : (
//             <div className="work-card">
//               <h1 className="title">Aws work</h1>
//               <div className="desc">
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. At
//                 labore nulla sequi reiciendis sunt iste atque cumque dicta
//                 voluptates asperiores, voluptas iure ad minus sit iusto nisi
//                 quisquam libero magnam.
//               </div>
//               <div className="status progress">In progress</div>
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default AllWorks;

import React from "react";
<<<<<<< HEAD
=======
import { useNavigate } from "react-router";
>>>>>>> noman
import { useLocation } from "react-router";
import { Footer, Navbar } from "../../components/import";
import "./AllWorks.scss";
import { Link } from "react-router-dom";

<<<<<<< HEAD
const AllWorks = (props) => {
  const { state } = useLocation();
  console.log(state);
=======
const AllWorks = () => {
  const { state } = useLocation();
>>>>>>> noman
  return (
    <>
      <div className="all-works-container">
        <Navbar />
        <h1>All Posts</h1>
        <div className="work-cards">
<<<<<<< HEAD
          {state.freelancingWork.length === 0
            ? "No Work Posted"
            : state.freelancingWork.map((work) => {
                return (
                  <div className="work-card">
                    <h1 className="title">{work.title}</h1>
                    <div className="desc">{work.desc}</div>
                    <div className="btn-container">
                      {work.username !== localStorage.getItem("username") && (
                        <div className="btn">Chat</div>
                      )}
                      <div className="status progress">{work.progress}</div>
                      {work.username !== localStorage.getItem("username") && (
                        <div className="btn">Visit Profile</div>
                      )}
                    </div>
                  </div>
                );
              })}
=======
          {state.freelancingWork.length === 0 ? (
            <div className="no-works">No works</div>
          ) : state.freelancingWork.map((work) => {
            return(
            <div className="work-card">
              <h1 className="title">{work.title}</h1>
              <div className="desc">
                {work.desc}
              </div>
              <div className={work.progress==="Completed" ? "status progress":"status done"}>{work.progress}</div>
            </div>
            );
          })}
>>>>>>> noman
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllWorks;
