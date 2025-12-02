import React, { useState } from 'react';
import { assets } from '../../assets/assets/myassets';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ data, variant = 'default' }) => {
    const navigate = useNavigate();
    const [input, setInput] = useState(data ? data : '');

    const onSearchHandle = (e) => {
        e.preventDefault();
        navigate(`/course-list/` + input);
    };

    return (
        <div className={`${variant === 'inline' ? 'w-auto' : 'flex justify-center w-full mt-8'}`}>
            <form 
                onSubmit={onSearchHandle} 
                className={`h-12 md:h-14 flex items-center bg-white border border-gray-500/20 rounded overflow-hidden 
                ${variant === 'inline' ? 'w-full md:w-80' : 'w-full md:w-1/2'}`}
            >
                <div className="h-full flex items-center px-3">
                    <img src={assets.search_icon} alt="search icon" className='w-6 h-6' />
                </div>
                <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    type="text" 
                    placeholder='Search your courses' 
                    className='w-full h-full outline-none text-gray-600 placeholder:text-gray-400 px-2' 
                />
                <button 
                    type='submit' 
                    className='bg-blue-600 text-white md:px-10 px-5 h-full'>
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
