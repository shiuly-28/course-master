import React from 'react';
import { FaFacebookF, FaYoutube, FaWhatsapp, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-black text-gray-300 pt-14 pb-8 px-6 md:px-20 mt-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Logo & About */}
                <div>
                    <h2 className="text-3xl font-extrabold text-white mb-4">Course Master</h2>
                    <p className="text-sm leading-relaxed">
                        Bringing the light of the Holy Quran to hearts and minds through authentic learning, certified scholars, and a global online platform dedicated to Islamic education.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
                    <ul className="space-y-3 text-sm">
                        {['Home', 'Courses', 'About Us', 'Contact', 'Privacy Policy'].map((link, index) => (
                            <li key={index}>
                                <a href="#" className="hover:text-yellow-400 transition duration-300">{link}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
                    <p className="text-sm mb-2">Email: <a href="shaikhbaset2001@gmail.com" className="hover:text-yellow-400">shaikhbaset2001.com</a></p>
                    <p className="text-sm mb-2">Phone: +880 1968562688</p>
                    <p className="text-sm mb-4">Address: Markazul Quran International Hifz Madrasabr <br />Sujatpur Bazar, Matlabpur, Chandpur</p>

                    <div className="flex gap-4 mt-4">
                        <a href="#" className="bg-yellow-500 hover:bg-yellow-600 text-green-900 p-2 rounded-full transition duration-300">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="bg-yellow-500 hover:bg-yellow-600 text-green-900 p-2 rounded-full transition duration-300">
                            <FaYoutube />
                        </a>
                        <a href="#" className="bg-yellow-500 hover:bg-yellow-600 text-green-900 p-2 rounded-full transition duration-300">
                            <FaWhatsapp />
                        </a>
                        <a href="#" className="bg-yellow-500 hover:bg-yellow-600 text-green-900 p-2 rounded-full transition duration-300">
                            <FaInstagram />
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-12 pt-5 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} Quran Academy. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
