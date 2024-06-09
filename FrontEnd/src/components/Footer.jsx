import React from 'react';

const Footer = () => {
    const year = new Date().getFullYear();

    return <footer className="flex justify-center items-center h-12">
        <p>
        {`Copyright © Upbeat Code ${year}`}
        </p>
        </footer>;
};

export default Footer;