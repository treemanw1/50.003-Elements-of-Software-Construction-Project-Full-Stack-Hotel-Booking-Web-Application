import React from "react";
import { Link } from "react-router-dom";
import "./notFoundPage.css";

class NotFoundPage extends React.Component {
  render() {
    return (
      <div>
        <div className="nfpContainer">
          <div className="nfpChildContainer">
            <div className="nfpSubChildContainer">
              <div className="nfpheading" align="center">
                Error 404
              </div>
              <div className="nfpsubHeading">
                <Link to="/" style={{ textDecoration: 'none', color: 'black'}}>
                  Sorry, we couldn't find the page you're looking for :(<br></br> But don't worry, you can
                  find plenty of other things on our home page by clicking here!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default NotFoundPage;
