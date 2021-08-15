import React from "react";
import { Link } from "react-router-dom";
import { Col } from "reactstrap";
import "./Footer.css"

const Footer = () => {
  return (
    <Col xs={{ size: 12 }} className="footer">
      <a
        target="blank"
        style={{ textDecoration: "none", color: "grey", fontSize: 20 }}
        href="https://forms.gle/3kC9Rz6piAHptxS6A"
      >
        Feedback
      </a>

      <Link
        to={"/faq/"}
        style={{ textDecoration: "none", color: "grey", fontSize: 20 }}
      >
        FAQs
      </Link>

      <a
        target="blank"
        style={{ textDecoration: "none", color: "grey", fontSize: 20 }}
        href="mailto:ritik@readneed.org"
      >
        Contact us
      </a>

      <img
        alt="status up"
        src={
          "https://healthchecks.io/badge/9eb09fbb-348a-4316-ba4d-c2e543/E6nWgXCq-2/site.svg"
        }
        style={{ marginLeft: 10, marginTop: 10 }}
      />
    </Col>
  );
};

export default Footer;
