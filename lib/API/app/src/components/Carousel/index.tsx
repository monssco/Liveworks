import React, {useRef} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from "swiper";

/*
IMPORTANT! MAKE SURE YOU ALSO IMPORT SWIPER'S CSS CLASSES AS WELL.
https://swiperjs.com/get-started#download-assets
*/

import LiveworksCaseStudy from './liveworksCaseStudy';
import ServinCaseStudy from './servinCaseStudy';

SwiperCore.use([Navigation, Pagination]);

const Carousel = () => {

    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        
        <section className="my-20">

            <div className="md:container md:mx-auto p-5 select-none">
                {/* <p className="font-sans pb-4 text-3xl">Paths we have travelled</p> */}
            <Swiper
                autoplay
                navigation={{
                    prevEl: prevRef.current ? prevRef.current : undefined,
                    nextEl: nextRef.current ? nextRef.current : undefined,
                }}
                onInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                    swiper.navigation.update();
                }}
                className="relative container"
                loop
                pagination={{ clickable: true }}
            >

                <SwiperSlide >
                    <LiveworksCaseStudy title="Modernizing the hospitality industry" subTitle="We collaborated with the Liveworks team to bring their designs to life. We helped with user research, development and testing on all platforms"
                    ></LiveworksCaseStudy>
                </SwiperSlide>

                <SwiperSlide >
                    <ServinCaseStudy title="Creating a local service platform" subTitle="We designed and developed a mobile app that allowed users to offer and exchange services." ></ServinCaseStudy>
                </SwiperSlide>
                
                <LeftArrow prevRef={prevRef}/>
                <RightArrow nextRef={nextRef}/>
            </Swiper>
            </div>
        </section>
    );
};

export default Carousel;

// import { arrow_right_monss as RightIcon } from "../../svg/arrow_right_monss.svg";

const LeftSvg = require('../../svg/arrow_left_monss.svg') as string;
const RightSvg = require('../../svg/arrow_right_monss.svg') as string;


const LeftArrow = ({prevRef}) => {
    return(
        <div className="cursor-pointer absolute top-0 left-0 bottom-0 z-10 p-5" ref={prevRef}>
            <div className="hidden md:block relative top-1/2">
                <LeftSvg />
            </div>
        </div>
    )
}

const RightArrow = ({nextRef}) => {
    return(
        <div className="cursor-pointer absolute top-0 right-0 bottom-0 z-10 p-5" ref={nextRef}>
            <div className="hidden md:block relative top-1/2">
                <RightSvg />
            </div>
        </div>
    )
}
