<<<<<<< HEAD
import React, { useState } from "react";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import "./ImageSlider.css"

export default function ImageSlider({ products }) {
    const [current, setCurrent] = useState(0)

    const sliderData = [
        { image: products.image_1 },
        { image: products.image_2 },
        { image: products.image_3 },
        { image: products.image_4 }
    ]

    const length = sliderData.length

    if (!Array.isArray(sliderData) || length <= 0) {
        return null
    }

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
    }

    return (
        <div className="slider">
            <BsChevronDoubleLeft className="left-arrow" onClick={prevSlide} />
            <BsChevronDoubleRight className="right-arrow" onClick={nextSlide} />
            {sliderData.map((slide, index) => {
                return (
                    <div className={index === current ? 'slide active' : 'slide'} key={index}>
                        {index === current && (<img className="carouselImages" src={slide.image} alt='item image' />)}
                        
                    </div>
                )
            })}
        </div>
    )
}
=======
// import React, {useState} from "react";
// import {BsChevronDoubleLeft, BsChevronDoubleRight} from 'react-icons'

// export default function ImageSlider({products}){
//     const [current, setCurrent] = useState(0)
//     const length = slides.length

//     const sliderData = [
//         {image: products.image_1},
//         {image: products.image_2},
//         {image: products.image_3},
//         {image: products.image_4}
//     ]

//     return(
//         <div className="slider">

//             {sliderData.map((slide,index) => {
//                 return <img src={slide.image} alt='item image'/>
//             })}
//         </div>
//     )
// }
>>>>>>> origin/homer
