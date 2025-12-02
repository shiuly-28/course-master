import React from 'react';

const Rating = () => {
    return (
        <div>
       {
        Array.from({length :5},(_,index)=>{
            const starValue=index+1;
            return (
                <span key={index}>
                    <i className={`fa fa-star ${starValue <= 3 ? 'text-warning' :
                    starValue <= 4 ? 'text-primary' : 'text-danger'}`} />
                </span>
            )


        })
       }
            
        </div>
    );
};

export default Rating;