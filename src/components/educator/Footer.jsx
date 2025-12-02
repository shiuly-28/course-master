import React from 'react';
import { assets } from '../../assets/assets/myassets';

const Footer = () => {
    return (
        <footer className="flex flex-col md:flex-row items-center md:justify-between justify-center w-full px-6 py-4 border-t border-gray-300 bg-white">
            {/* Left Side - Logo & Copyright */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-6">
                <img className="w-24 hidden md:block" src={assets.logo} alt="MyCompany Logo" />
                <p className="text-xs md:text-sm text-gray-500 text-center md:text-left">
                    © 2025 MyCompany. All Rights Reserved.
                </p>
            </div>

            {/* Right Side - Social Icons */}
            <div className="flex items-center gap-4 mt-4 md:mt-0">
                <a href="#" aria-label="Facebook">
                    <img src={assets.facebook_icon} alt="Facebook" className="w-6 h-6 hover:scale-110 transition-transform" />
                </a>
                <a href="#" aria-label="Twitter">
                    <img src={assets.twitter_icon_icon} alt="Twitter" className="w-6 h-6 hover:scale-110 transition-transform" />
                </a>
                <a href="#" aria-label="Instagram">
                    <img src={assets.instagram_icon} alt="Instagram" className="w-6 h-6 hover:scale-110 transition-transform" />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
