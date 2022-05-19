import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import "../css/FooterMedia.css";
function FooterMedia() {
  return (
    <div className="footerMedia">
      <a href="https://www.facebook.com/Newboxvietnam/">
        <FacebookIcon
          className="footerMedia__icons"
          id="footerMedia__iconFacebook"
        />
      </a>
      <a href="https://www.instagram.com/newbox_viet_nam/">
        <InstagramIcon
          className="footerMedia__icons"
          id="footerMedia__iconInstagram"
        />
      </a>
      <a href="https://www.youtube.com/channel/UC1Qgtnevb9JnEP3QGPOljHQ">
        <YouTubeIcon
          className="footerMedia__icons"
          id="footerMedia__iconYoutube"
        />
      </a>
      <a href="https://twitter.com/home">
        <TwitterIcon
          className="footerMedia__icons"
          id="footerMedia__iconTwitter"
        />
      </a>
    </div>
  );
}

export default FooterMedia;
