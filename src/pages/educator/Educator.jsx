import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/educator/Navbar';
import Sidebar from '../../components/educator/Sidebar';
import Footer from '../../components/educator/Footer';

const Educator = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Top Navbar */}
            <div className="sticky top-0 z-50">
                <Navbar />
            </div>

            {/* Main Layout */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="hidden md:block">
                    <Sidebar />
                </div>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
            <Footer/>
        </div>
    );
};

export default Educator;
