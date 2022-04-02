import axios from "axios";
import React from "react";
import { Footer, Header, Navbar } from "../../components/import";
import WhyUs from "../../components/WhyUs/WhyUs";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Header />
      <WhyUs />
      <Footer />
    </div>
  );
};

export default Home;
