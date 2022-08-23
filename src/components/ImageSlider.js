import React, {useState} from "react";
import {BsChevronDoubleLeft, BsChevronDoubleRight} from 'react-icons'

export default function ImageSlider({products}){
    const [current, setCurrent] = useState(0)
    const length = slides.length

    const sliderData = [
        {image: products.image_1},
        {image: products.image_2},
        {image: products.image_3},
        {image: products.image_4}
    ]

    return(
        <div className="slider">

            {sliderData.map((slide,index) => {
                return <img src={slide.image} alt='item image'/>
            })}
        </div>
    )
}