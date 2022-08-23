import React from "react";
import "./ImageCarousel.css"

export default function ImageCarousel({ products }) {
    return(
        <div className="carousel">
            <button className="carouselButton carButton--Left"> « </button>
                
            <div className="carouselTrackContainer">
                <ul className="carouselTrack">
                    <li className="carouselSlide currentSlide"><img src={products.image_1} alt="img1" /></li>
                    <li className="carouselSlide"><img src={products.image_2} alt="img2" /></li>
                    <li className="carouselSlide"><img src={products.image_3} alt="img3" /></li>
                    <li className="carouselSlide"><img src={products.image_3} alt="img3" /></li>
                </ul>
            </div>

            <button className="carouselButton carButton--Right">»</button>

            <div className="carouselNav">
                <button className="carouselIndicator"></button>
                <button className="carouselIndicator"></button>
                <button className="carouselIndicator"></button>
                <button className="carouselIndicator"></button>
            </div>
        </div>
    )
}