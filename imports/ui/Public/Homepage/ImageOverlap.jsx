import React from 'react';

import './ImageOverlap.scss';

const DEFAULT_IMAGE = 'images/testing_image_1.jpg';
const DEFAULT_OPACITY = 0.1;
const DEFAULT_LEFT_POSITION = '0';
const DEFAULT_TOP_POSITION = '0';

const ImageOverlap = ({
    image = DEFAULT_IMAGE,
    opacity = DEFAULT_OPACITY,
    top = DEFAULT_TOP_POSITION,
    left = DEFAULT_LEFT_POSITION,
}) => {
    const style = {
        opacity: opacity || DEFAULT_OPACITY,
        top: `${top}px`,
        left: `${left}px`,
    };

    return (
        <div className="image-overlap__container">
            <div className="image-overlap__wrapper" style={style} >
                <img src={image} alt="Testing artwork" />
            </div>
        </div>
    );
}

export default ImageOverlap;
