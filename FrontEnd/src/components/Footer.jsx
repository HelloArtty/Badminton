import React from 'react';

const Footer = () => {
    const year = new Date().getFullYear();

    return <footer>
        <p>
        {`Copyright © Upbeat Code ${year}`}
        </p>
        </footer>;
};

export default Footer;