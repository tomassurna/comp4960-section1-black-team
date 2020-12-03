import React from "react";
import { CFooter } from "@coreui/react";

const Footer = () => {
  return (
    <CFooter fixed={false}>
      <div className="mfs-auto">
        <a
          href="https://www.bostoncodecamp.com/CC33/info"
          target="_blank"
          rel="noopener noreferrer"
        >
          Boston Code Camp
        </a>
        <span className="ml-1">&copy; 2020</span>
      </div>
    </CFooter>
  );
};

export default React.memo(Footer);
