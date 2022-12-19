import React from 'react'
import upArrow from './../../Images/up-arrow.png'
import './ScrollToTop.css'

const ScrollToTop = ({ backToTopVisible }) => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div>
            {backToTopVisible &&
                <img src={upArrow} alt="Back to top" className='upArrow' onClick={scrollToTop}/>}
        </div>
    )
}

export default ScrollToTop
