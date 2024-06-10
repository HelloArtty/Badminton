import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="flex justify-center items-center h-12">
      <p>{`© ${year} Badminton Link | CSS 234 Web Programming II`}</p>
    </footer>
  );
};

export default Footer;
