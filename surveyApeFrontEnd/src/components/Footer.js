import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Ionicon from 'react-ionicons';

class Footer extends Component {
  render() {
    return (
      <div className="footer-background">
              <section className="container">
                  <div className="row">
                      <div className="col-md-4">
                          <h3>About us</h3>
                          <p>SurveyApe is best finest, greatest, top, foremost, leading, preeminent, premier, prime, first, chief, principal, supreme, of the highest quality, superlative, par excellence, unrivaled, second to none, without equal, nonpareil, unsurpassed, peerless, matchless, unparalleled, unbeaten, unbeatable, optimum, optimal, ultimate, incomparable, ideal, perfect; highest, record-breaking; informalstar, number-one, a cut above the rest, top-drawer survey application.</p>
                      </div>

                      <div className="col-md-4" id="contact">
                          <h3>Contact info</h3>
                          <p>Available 24 * 7</p>
                          <ul>
                              <li><i className="icon-home"></i> 1110 Bates Avenue Los Angeles, CA 90029, US</li>
                              <li><i className="icon-phone"></i> Telephone: 00.00.00.99.00 </li>
                              <li><i className="icon-envelope"></i> Email: <a href="#">info@surveyape.com </a></li>
                              <li><i className="icon-skype"></i> Skype name: Survey_Ape</li>
                          </ul>
                      </div>

                      <div className="col-md-4">
                          <h3>Latest tweet</h3>
                          <div className="latest-tweets" data-number="10" data-username="ansonika" data-mode="fade" data-pager="false" data-nextselector=".tweets-next" data-prevselector=".tweets-prev" data-adaptiveheight="true"></div>
                          <div className="tweet-control">
                              <div className="tweets-prev"></div>
                              <div>Awesome Experience!</div>
                              <div>Awesome Experience!</div>
                              <div>Awesome Experience!</div>
                              <div className="tweets-next"></div>
                          </div>
                      </div>

                  </div>
              </section>
      </div>
    );
  }
}

export default Footer;
