import React, { useState, useEffect } from 'react';
import '../styles/sub-style.css';
import '../styles/layout.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faXTwitter, faSoundcloud, faInstagram, faSquareInstagram } from '@fortawesome/free-brands-svg-icons';

const images = [
  "https://personal-portfolio-postcontent.s3.ap-northeast-3.amazonaws.com/images/miku-banner.gif",
  "https://personal-portfolio-postcontent.s3.ap-northeast-3.amazonaws.com/images/avatar5.jpg"
];

// img = card.image1_dir, content = card.contents, title = card.title

const Card = ({title, content, imageUrl, date}) => {
  return (
    <article className="hov">
      <img src={imageUrl} alt="thumbnail"></img>
      <p>{date}</p>
      <h3>{title}</h3>
    </article>
  );
}

const scrollToTop = () => {
  window.scrollTo({
      top: 0,
      behavior: "smooth"
  });
};

const Portfolio = () => {

  //Data retrieve
  const [data, setData] = useState([{}])
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    fetch("https://ijeu91pkf2.execute-api.ap-northeast-3.amazonaws.com/default/personal-portfolio-server", {
      method: 'GET',
      mode: 'cors', 
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        // console.log(data)
      }
    ).catch(
      error => {
        console.log('There was a problem with the fetch operation: ' + error.message);
      }
    )
  }, [])

  useEffect(() => {
    const checkScroll = () => {
        if (!showButton && window.pageYOffset > 50) {
            setShowButton(true);
        } else if (showButton && window.pageYOffset <= 50) {
            setShowButton(false);
        }
    };

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, [showButton]);
  
  return (
    <React.Fragment>
      <button className={`navtotop ${showButton ? 'show' : 'none'}`} onClick={scrollToTop}>
        <FontAwesomeIcon icon={faAngleDoubleUp} size="sm" />
      </button>
      <div className="header">
        <div className="boundary-container">
          <div className="wrapper">
            <div className="container-name">
              <a href="#profile">
                Riscat
              </a>
            </div>
            <div className="container-menu">
              <ul>
                <li>
                  <a href="#profile">
                    ABOUT
                  </a>
                </li>
                <li>
                  <a href="#posts">
                    POST
                  </a>
                </li>
                <li>
                  <a href="#contact">
                    CONTACT
                  </a>
                </li>
                {/* <div className="searchContainer">
                  <input type="text" className='searchBox' name="q" placeholder="Search "></input>
                  <FontAwesomeIcon icon={faMagnifyingGlass} size="xs" className='searchIcon'/>
                </div> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="banner-holder">
        <img src={images[0]} alt="Banner" className="banner-image" />
        <div className="original-image"></div>
      </div>
      <section className="section-profile" id="profile">
        <div className="section-container">
          <h2 className="section-header">
            Profile
          </h2>
          <div className="profile-wrapper">
            <div className="profile-image">
              <img src={images[1]} alt="avatar"></img>
            </div>
            <div className="profile-content">
              <h3>
                About Me
              </h3>
              <p>"We dance in constellations around arrays of colored squares." ฅ^._.^ฅ</p>
              <p>
              Hi I'm Riscat. This website serves as a place for me to post about interesting moments that 
              happen in my life and I plan to make posts on a monthly basis. The content will revolve primarily around gaming, real world happenings, and various events or activities I participate in.</p>
              <h3>
                My social links
              </h3>
              <ul className="social-links">
                <li>
                  <a href="https://twitter.com/riscatms" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faXTwitter} size="lg" className="icon-style"/>
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/channel/UCcNX26yomKu-nZpiSpAef6g" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faYoutube} size="lg" className="icon-style"/>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/riscatms/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faSquareInstagram} size="lg" className="icon-style"/>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="section-post" id="posts">
        <div className="section-container">
          <h2 className="section-header">
            Posts
          </h2>
          <div className="post-content">
            {data.map((post, index) => (
              <Card 
                key={index}
                title={post.title}
                content={post.contents}
                imageUrl={post.image1_dir}
                date={post.date}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="section-contact" id="contact">
        <div className="section-container">
          <h2 className="section-header">
            Contact
          </h2>
        </div>
        <div className="content-wrapper">
          <h3>Discord Tag:</h3>
          <p>riscatms</p>
          <h3>Github ID:</h3>
          <p>riscatms</p>
          <h3>Email:</h3>
          <p>riscatmsgaming@gmail.com</p>
        </div>
      </section>
      <section className="section-footer">
        <div className="section-container">
          <p>© 2024 Riscat All rights reserved.</p>
        </div>
      </section>
    </React.Fragment>
  );
};


export default Portfolio;


