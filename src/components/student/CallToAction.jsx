import React from 'react';
import { assets } from '../../assets/assets/myassets';

const CallToAction = () => {
    return (
        <div className='flex flex-col items-center gap-4 pt-10 pb-20 px-5 md:px-0'>
         <h2 className='text-4xl font-bold text-center text-gray-900'>Learn Quran, Anytime, Anywhere</h2>
<p className='md:text-base text-gray-500 mt-3 text-center'>
    Access expert-led Quran courses and Tajweed lessons from the comfort of your home. <br />
    Flexible learning designed for every age and level.
</p>


          <div className='flex flex-col md:flex-row items-center gap-4 mt-6'>
            <button className='px-10 py-3 bg-blue-600 text-white rounded'>Get Started</button>
            <button className='flex items-center gap-2'>Learn More <img src={assets.arrow_icon} alt="arrow_icon" /></button>

          </div>
        </div>
    );
};

export default CallToAction;