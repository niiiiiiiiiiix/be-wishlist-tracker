import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <section className="footer">
      <div class="footer-top">
        <p>All icons and images made by Freepik from www.flaticon.com</p>
      </div>
      <div class="footer-bottom">
        <p>Copyright © 2021 niiiiiiiiiiix. All rights reserved.</p>
        <a
          href="https://github.com/niiiiiiiiiiix/wishlist-tracker"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="github-mark"
            src={process.env.PUBLIC_URL + "/images/GitHub-Mark-120px-plus.png"}
            alt=""
          />
        </a>
      </div>
    </section>
  );
}

export default Footer;
