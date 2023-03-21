import React from 'react'
// import Helmet from '../Helmet/Helmet'
import Slider from 'react-slick'
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom'
import "../../style/hero-slider.css";
const HeroSlider = () => {

    const setting = {
        fade: true,
        speed: 2000,
        autoplayspeed: 3000,
        infinite: true,
        autoplay: true,
        sliderToShow: 1,
        sliderToScroll: 1
    }

    return <Slider{...setting} className='hero_slider'>
        <div className='slider_item slider_item-01 mt0'>
            <Container>
                <div className='slider_content'>
                    <h6 className='text-light mb-3'>For Rent $70 Per Day</h6>
                    <h1 className='text-light mb-4'>Reserve Now and Get 50% off</h1>
                    <button type='button' className='btn reserve_btn mt-4'>
                        <Link to='/cars'>Reserve Now </Link>
                    </button>
                </div>
            </Container>

        </div>


        <div className='slider_item slider_item-01 mt0'>
            <Container>
                <div className='slider_content'>
                    <h6 className='text-light mb-3'>For Rent $70 Per Day</h6>
                    <h1 className='text-light mb-4'>Reserve Now and Get 50% off</h1>
                    <button type='button' className='btn reserve_btn  mt-4'>
                        <Link to='/cars'>Reserve Now </Link>
                    </button>
                </div>
            </Container>

        </div>

        <div className='slider_item slider_item-01 mt0'>
            <Container>
                <div className='slider_content'>
                    <h6 className='text-light mb-3'>For Rent $70 Per Day</h6>
                    <h1 className='text-light mb-4'>Reserve Now and Get 50% off</h1>
                    <button type='button' className='btn reserve_btn  mt-4'>
                        <Link to='/cars'>Reserve Now </Link>
                    </button>
                </div>
            </Container>

        </div>

    </Slider>

}

export default HeroSlider