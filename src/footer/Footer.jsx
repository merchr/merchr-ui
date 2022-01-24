import React from 'react';

import './Footer.css';

function Footer () {

  return (
    <div className="footer-dark">
    <footer>
        <div className="container">
            <div className="row">     
            {/* Social Medias Icons*/}
              <div className="col item social"><a href="#"><i className="icon ion-social-facebook"></i></a><a href="#"><i className="icon ion-social-twitter"></i></a><a href="#"><i className="icon ion-social-snapchat"></i></a><a href="#"><i className="icon ion-social-instagram"></i></a></div>
            </div>
            <p className="copyright"> Merch © 2022</p>
        </div>
    </footer>
</div>
  )

}

export default Footer;