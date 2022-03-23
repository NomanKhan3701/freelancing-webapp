import React from "react";
import { Navbar } from "../../components/import";
import "./Bid.scss";
import clientImg from "../../assets/images/Cha2.jpg";

const BidData = {
  title: "Javascript Coder",
  desc: `I need the Javascript coder for multiple jobs. Details will be discussed`,
  skills: ["HTML", "JavaScript", "Jquery"],
  rangeMin: "555",
  rangeMax: "1000",
  averageBid: "896",
  totalBid: "14",
};

const Bid = () => {
  return (
    <div className="bid">
      <Navbar />
      <div className="bid-left">
        <div className="bid-info-container">
          <div className="client-profile">
            <div className="user-img">
              <img src={clientImg} alt="client img" />
            </div>
            <div className="title">{BidData.title}</div>
          </div>

          <div className="desc">{BidData.desc}</div>
          <h2>Skills Required</h2>
          <div className="skills">
            {BidData.skills.map((skill, index) => (
              <div key={index} className="skill">
                {skill}
              </div>
            ))}
          </div>
          <div className="form">
            <div className="price">
              <input type="text" placeholder="Your Bid In Rupees..." />
            </div>
            <div className="btn">Bid Now</div>
          </div>
        </div>
        <div className="comments-container">
          <div className="title">Comments</div>
          <div className="form">
            <div className="user-img">
              <img src={clientImg} alt="" />
            </div>
            <input type="text" placeholder="Add a comment..." />
            <div className="btn">Comment</div>
          </div>
          <div className="comments">
            <div className="comment">
              <div className="user-profile">
                <img src={clientImg} alt="user img" />
                <div className="info">
                  <div className="user-name">Cha Eun Woo</div>
                  <div className="comment-desc">
                    Hi, I had a doubt in your post. Do you want hourly paid or
                    One time paid freelancer
                  </div>
                </div>
              </div>
            </div>
            <div className="comment">
              <div className="user-profile">
                <img src={clientImg} alt="user img" />
                <div className="info">
                  <div className="user-name">Cha Eun Woo</div>
                  <div className="comment-desc">
                    Hi, I had a doubt in your post. Do you want hourly paid or
                    One time paid freelancer
                  </div>
                </div>
              </div>
            </div>
            <div className="comment">
              <div className="user-profile">
                <img src={clientImg} alt="user img" />
                <div className="info">
                  <div className="user-name">Cha Eun Woo</div>
                  <div className="comment-desc">
                    Hi, I had a doubt in your post. Do you want hourly paid or
                    One time paid freelancer
                  </div>
                </div>
              </div>
            </div>
            <div className="comment">
              <div className="user-profile">
                <img src={clientImg} alt="user img" />
                <div className="info">
                  <div className="user-name">Cha Eun Woo</div>
                  <div className="comment-desc">
                    Hi, I had a doubt in your post. Do you want hourly paid or
                    One time paid freelancer
                  </div>
                </div>
              </div>
            </div>
            <div className="comment">
              <div className="user-profile">
                <img src={clientImg} alt="user img" />
                <div className="info">
                  <div className="user-name">Cha Eun Woo</div>
                  <div className="comment-desc">
                    Hi, I had a doubt in your post. Do you want hourly paid or
                    One time paid freelancer
                  </div>
                </div>
              </div>
            </div>
            <div className="comment">
              <div className="user-profile">
                <img src={clientImg} alt="user img" />
                <div className="info">
                  <div className="user-name">Cha Eun Woo</div>
                  <div className="comment-desc">
                    Hi, I had a doubt in your post. Do you want hourly paid or
                    One time paid freelancer
                  </div>
                </div>
              </div>
            </div>
            <div className="comment">
              <div className="user-profile">
                <img src={clientImg} alt="user img" />
                <div className="info">
                  <div className="user-name">Cha Eun Woo</div>
                  <div className="comment-desc">
                    Hi, I had a doubt in your post. Do you want hourly paid or
                    One time paid freelancer
                  </div>
                </div>
              </div>
            </div>
            <div className="comment">
              <div className="user-profile">
                <img src={clientImg} alt="user img" />
                <div className="info">
                  <div className="user-name">Cha Eun Woo</div>
                  <div className="comment-desc">
                    Hi, I had a doubt in your post. Do you want hourly paid or
                    One time paid freelancer
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bid-right">
        <div className="people-bid-info">
          <div className="title">
            12 freelancer are bidding on an average of 5000₹
          </div>
          <div className="freelancers">
            <div className="freelancer">
              <div className="user-info">
                <img src={clientImg} alt="" />
                <div className="user-name">Karen</div>
              </div>
              <div className="flex">
                <div className="price">Price : 4000₹</div>
                <div className="star">Rating : 4.9</div>
              </div>

              <div className="desc">
                Hi Jose. I can do this project. I am a professional Linux and
                developer in PHP, Wordpress, Laravel, Magento, Joomla,
                Prestashop, OpenCart, Yii, NodeJS, Angular, Vue.js, HTML5, CSS3
                and jQuery. I can do this project.
              </div>
            </div>
            <div className="freelancer">
              <div className="user-info">
                <img src={clientImg} alt="" />
                <div className="user-name">Karen</div>
              </div>
              <div className="flex">
                <div className="price">Price : 4000₹</div>
                <div className="star">Rating : 4.9</div>
              </div>

              <div className="desc">
                Hi Jose. I can do this project. I am a professional Linux and
                developer in PHP, Wordpress, Laravel, Magento, Joomla,
                Prestashop, OpenCart, Yii, NodeJS, Angular, Vue.js, HTML5, CSS3
                and jQuery. I can do this project.
              </div>
            </div>
            <div className="freelancer">
              <div className="user-info">
                <img src={clientImg} alt="" />
                <div className="user-name">Karen</div>
              </div>
              <div className="flex">
                <div className="price">Price : 4000₹</div>
                <div className="star">Rating : 4.9</div>
              </div>

              <div className="desc">
                Hi Jose. I can do this project. I am a professional Linux and
                developer in PHP, Wordpress, Laravel, Magento, Joomla,
                Prestashop, OpenCart, Yii, NodeJS, Angular, Vue.js, HTML5, CSS3
                and jQuery. I can do this project.
              </div>
            </div>
            <div className="freelancer">
              <div className="user-info">
                <img src={clientImg} alt="" />
                <div className="user-name">Karen</div>
              </div>
              <div className="flex">
                <div className="price">Price : 4000₹</div>
                <div className="star">Rating : 4.9</div>
              </div>

              <div className="desc">
                Hi Jose. I can do this project. I am a professional Linux and
                developer in PHP, Wordpress, Laravel, Magento, Joomla,
                Prestashop, OpenCart, Yii, NodeJS, Angular, Vue.js, HTML5, CSS3
                and jQuery. I can do this project.
              </div>
            </div>
            <div className="freelancer">
              <div className="user-info">
                <img src={clientImg} alt="" />
                <div className="user-name">Karen</div>
              </div>
              <div className="flex">
                <div className="price">Price : 4000₹</div>
                <div className="star">Rating : 4.9</div>
              </div>

              <div className="desc">
                Hi Jose. I can do this project. I am a professional Linux and
                developer in PHP, Wordpress, Laravel, Magento, Joomla,
                Prestashop, OpenCart, Yii, NodeJS, Angular, Vue.js, HTML5, CSS3
                and jQuery. I can do this project.
              </div>
            </div>
            <div className="freelancer">
              <div className="user-info">
                <img src={clientImg} alt="" />
                <div className="user-name">Karen</div>
              </div>
              <div className="flex">
                <div className="price">Price : 4000₹</div>
                <div className="star">Rating : 4.9</div>
              </div>

              <div className="desc">
                Hi Jose. I can do this project. I am a professional Linux and
                developer in PHP, Wordpress, Laravel, Magento, Joomla,
                Prestashop, OpenCart, Yii, NodeJS, Angular, Vue.js, HTML5, CSS3
                and jQuery. I can do this project.
              </div>
            </div>
            <div className="freelancer">
              <div className="user-info">
                <img src={clientImg} alt="" />
                <div className="user-name">Karen</div>
              </div>
              <div className="flex">
                <div className="price">Price : 4000₹</div>
                <div className="star">Rating : 4.9</div>
              </div>

              <div className="desc">
                Hi Jose. I can do this project. I am a professional Linux and
                developer in PHP, Wordpress, Laravel, Magento, Joomla,
                Prestashop, OpenCart, Yii, NodeJS, Angular, Vue.js, HTML5, CSS3
                and jQuery. I can do this project.
              </div>
            </div>
            <div className="freelancer">
              <div className="user-info">
                <img src={clientImg} alt="" />
                <div className="user-name">Karen</div>
              </div>
              <div className="flex">
                <div className="price">Price : 4000₹</div>
                <div className="star">Rating : 4.9</div>
              </div>

              <div className="desc">
                Hi Jose. I can do this project. I am a professional Linux and
                developer in PHP, Wordpress, Laravel, Magento, Joomla,
                Prestashop, OpenCart, Yii, NodeJS, Angular, Vue.js, HTML5, CSS3
                and jQuery. I can do this project.
              </div>
            </div>
            <div className="freelancer">
              <div className="user-info">
                <img src={clientImg} alt="" />
                <div className="user-name">Karen</div>
              </div>
              <div className="flex">
                <div className="price">Price : 4000₹</div>
                <div className="star">Rating : 4.9</div>
              </div>

              <div className="desc">
                Hi Jose. I can do this project. I am a professional Linux and
                developer in PHP, Wordpress, Laravel, Magento, Joomla,
                Prestashop, OpenCart, Yii, NodeJS, Angular, Vue.js, HTML5, CSS3
                and jQuery. I can do this project.
              </div>
            </div>
            <div className="freelancer">
              <div className="user-info">
                <img src={clientImg} alt="" />
                <div className="user-name">Karen</div>
              </div>
              <div className="flex">
                <div className="price">Price : 4000₹</div>
                <div className="star">Rating : 4.9</div>
              </div>

              <div className="desc">
                Hi Jose. I can do this project. I am a professional Linux and
                developer in PHP, Wordpress, Laravel, Magento, Joomla,
                Prestashop, OpenCart, Yii, NodeJS, Angular, Vue.js, HTML5, CSS3
                and jQuery. I can do this project.
              </div>
            </div>
            <div className="freelancer">
              <div className="user-info">
                <img src={clientImg} alt="" />
                <div className="user-name">Karen</div>
              </div>
              <div className="flex">
                <div className="price">Price : 4000₹</div>
                <div className="star">Rating : 4.9</div>
              </div>

              <div className="desc">
                Hi Jose. I can do this project. I am a professional Linux and
                developer in PHP, Wordpress, Laravel, Magento, Joomla,
                Prestashop, OpenCart, Yii, NodeJS, Angular, Vue.js, HTML5, CSS3
                and jQuery. I can do this project.
              </div>
            </div>
            <div className="freelancer">
              <div className="user-info">
                <img src={clientImg} alt="" />
                <div className="user-name">Karen</div>
              </div>
              <div className="flex">
                <div className="price">Price : 4000₹</div>
                <div className="star">Rating : 4.9</div>
              </div>

              <div className="desc">
                Hi Jose. I can do this project. I am a professional Linux and
                developer in PHP, Wordpress, Laravel, Magento, Joomla,
                Prestashop, OpenCart, Yii, NodeJS, Angular, Vue.js, HTML5, CSS3
                and jQuery. I can do this project.
              </div>
            </div>
            <div className="freelancer">
              <div className="user-info">
                <img src={clientImg} alt="" />
                <div className="user-name">Karen</div>
              </div>
              <div className="flex">
                <div className="price">Price : 4000₹</div>
                <div className="star">Rating : 4.9</div>
              </div>

              <div className="desc">
                Hi Jose. I can do this project. I am a professional Linux and
                developer in PHP, Wordpress, Laravel, Magento, Joomla,
                Prestashop, OpenCart, Yii, NodeJS, Angular, Vue.js, HTML5, CSS3
                and jQuery. I can do this project.
              </div>
            </div>
            <div className="freelancer">
              <div className="user-info">
                <img src={clientImg} alt="" />
                <div className="user-name">Karen</div>
              </div>
              <div className="flex">
                <div className="price">Price : 4000₹</div>
                <div className="star">Rating : 4.9</div>
              </div>

              <div className="desc">
                Hi Jose. I can do this project. I am a professional Linux and
                developer in PHP, Wordpress, Laravel, Magento, Joomla,
                Prestashop, OpenCart, Yii, NodeJS, Angular, Vue.js, HTML5, CSS3
                and jQuery. I can do this project.
              </div>
            </div>
            <div className="freelancer">
              <div className="user-info">
                <img src={clientImg} alt="" />
                <div className="user-name">Karen</div>
              </div>
              <div className="flex">
                <div className="price">Price : 4000₹</div>
                <div className="star">Rating : 4.9</div>
              </div>

              <div className="desc">
                Hi Jose. I can do this project. I am a professional Linux and
                developer in PHP, Wordpress, Laravel, Magento, Joomla,
                Prestashop, OpenCart, Yii, NodeJS, Angular, Vue.js, HTML5, CSS3
                and jQuery. I can do this project.
              </div>
            </div>
            <div className="freelancer">
              <div className="user-info">
                <img src={clientImg} alt="" />
                <div className="user-name">Karen</div>
              </div>
              <div className="flex">
                <div className="price">Price : 4000₹</div>
                <div className="star">Rating : 4.9</div>
              </div>

              <div className="desc">
                Hi Jose. I can do this project. I am a professional Linux and
                developer in PHP, Wordpress, Laravel, Magento, Joomla,
                Prestashop, OpenCart, Yii, NodeJS, Angular, Vue.js, HTML5, CSS3
                and jQuery. I can do this project.
              </div>
            </div>
            <div className="freelancer">
              <div className="user-info">
                <img src={clientImg} alt="" />
                <div className="user-name">Karen</div>
              </div>
              <div className="flex">
                <div className="price">Price : 4000₹</div>
                <div className="star">Rating : 4.9</div>
              </div>

              <div className="desc">
                Hi Jose. I can do this project. I am a professional Linux and
                developer in PHP, Wordpress, Laravel, Magento, Joomla,
                Prestashop, OpenCart, Yii, NodeJS, Angular, Vue.js, HTML5, CSS3
                and jQuery. I can do this project.
              </div>
            </div>
            <div className="freelancer">
              <div className="user-info">
                <img src={clientImg} alt="" />
                <div className="user-name">Karen</div>
              </div>
              <div className="flex">
                <div className="price">Price : 4000₹</div>
                <div className="star">Rating : 4.9</div>
              </div>

              <div className="desc">
                Hi Jose. I can do this project. I am a professional Linux and
                developer in PHP, Wordpress, Laravel, Magento, Joomla,
                Prestashop, OpenCart, Yii, NodeJS, Angular, Vue.js, HTML5, CSS3
                and jQuery. I can do this project.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bid;
