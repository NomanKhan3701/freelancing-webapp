import React from "react";
import { useNavigate } from "react-router";
import { Footer, Navbar } from "../../components/import";
import "./AllWorks.scss";
import { Link } from "react-router-dom";

const AllWorks = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="all-works-container">
        <Navbar />
        <h1>All works</h1>
        <div className="work-cards">
          {StaticRange.freelancingWork.length === 0 ? (
            "No Work Done."
          ) : (
            <div className="work-card">
              <h1 className="title">Aws work</h1>
              <div className="desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                labore nulla sequi reiciendis sunt iste atque cumque dicta
                voluptates asperiores, voluptas iure ad minus sit iusto nisi
                quisquam libero magnam.
              </div>
              <div className="status progress">In progress</div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllWorks;
