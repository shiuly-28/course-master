import React from 'react';
import { assets, dummyTestimonial } from '../../assets/assets/myassets';

const TestomonialSection = () => {
    return (
        <div className='pb-14 px-8 md:px-0'>
           <h2 className='text-3xl font-medium text-center text-gray-900'>Testimonials</h2>
<p className='md:text-base text-gray-500 mt-3 text-center'>
    Hear from our students as they share their journey of connecting with the Quran, improving their recitation, <br />
    and how our platform helped them achieve their learning goals with ease.
</p>


            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 max-w-[75%] mx-auto'>

                {dummyTestimonial.map((testimonial, index) => (
                    <div 
                        key={index} 
                        className='bg-white shadow-md rounded-lg p-10'
                    >
                        <div className="flex items-center gap-4 px-5 py-4 bg-gray-500/10 mt-3">
                            <img 
                                src={testimonial.image} 
                                alt={testimonial.name} 
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <h3 className='font-semibold text-gray-800 mt-2'>{testimonial.name}</h3>
                                <p className='text-sm text-gray-500'>{testimonial.role}</p>
                            </div>
                        </div>

                        <div className='flex gap-1 mt-4'>
                            {[...Array(5)].map((_, i) => (
                                <img
                                    key={i}
                                    src={i<Math.floor(testimonial.rating)?assets.star:assets.star_blank}
                                    alt="star"
                                    className="w-4 h-4"
                                />
                            ))}
                        </div>

                       <p className='text-sm text-gray-600 mt-6 max-w-3xl text-left mx-auto'>
               {testimonial.feedback}
      </p>


                        <a href="#" className='text-blue-500 text-left text-sm mt-3 inline-block hover:underline'>
                            Read more
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestomonialSection;
