import {Link} from "react-router-dom";

const Footer = () => {
    return(
        <div>

            <footer className="site-footer ">

                <div className="footer-Block">
                    <div className="footerLogo">
                        <Link to="/"> <img src="assets/images/logo.png" alt="Saleshub Logo"/> </Link>
                    </div>

                    <div className="widget nav-widget">
                        <h4 className="widget-title">Support</h4>
                        <ul>
                            <li><a href="about">Privacy Policy</a></li>
                            <li><a href="faq">Faq &amp; Terms</a></li>
                            <li><a href="contact">Contact Us</a></li>
                        </ul>
                    </div>


                    <div className="widget contact-widget">
                        <h4 className="widget-title">Contact Us</h4>
                        <ul className="info-list">
                            <li>

                                <span className="icon"><i className="far fa-phone"></i></span>

                                <span className="info">

                                    <span className="info-title">Phone : </span><a href="#">+216 11 111 111</a></span>
                            </li>

                            <li>
                                <span className="icon"><i className="far fa-map-marker-alt"></i></span>

                                <span className="info"><span className="info-title">Location : </span><a href="#">Avenue XXxxXX Tunis, Tunisia</a></span>
                            </li>
                        </ul>
                    </div>
                </div>


                <div className="copyright-area">

                    <p className="copyright-text">© 2000-2024 <span> </span><a href="#">SalesHub</a>. All Rights Reserved</p>

                </div>


            </footer>
        </div>
    )
}

export default Footer;