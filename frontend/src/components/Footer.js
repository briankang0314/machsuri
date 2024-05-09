import React from "react";
import "./Footer.css"; // Your CSS file for styling

function Footer() {
  return (
    <footer>
      <div>
        <p>© 2024 마하수리. All rights reserved.</p>
      </div>
      <div>
        <ul>
          <li>
            <a href="/privacy">개인정보</a>
          </li>
          <li>
            <a href="/terms">고객약관</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
