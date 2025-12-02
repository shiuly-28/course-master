import React from 'react';
import { assets } from '../../assets/assets/myassets';

const Companies = () => {
    return (
        <div className="pt-16">
            <h1 className="text-base text-gray-500">Trusted by Top Companies</h1>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-6 md:mt-10">
                <img src={assets.microsoft_logo} alt="Microsoft" className="w-20 md:w-28" />
 <img src={assets.walmart_logo} alt="Walmart" className="w-20 md:w-28" />
<img src={assets.accenture_logo} alt="Accenture" className="w-20 md:w-28" />
<img src={assets.adobe_logo} alt="Adobe" className="w-20 md:w-28" />
<img src={assets.paypal_logo} alt="Paypal" className="w-20 md:w-28" />

            </div>
        </div>
    );
};

export default Companies;
