import React from 'react'
import Slider from 'react-slick'
import ava01 from '../../assests/all-images/ava-1.jpg'
import ava02 from '../../assests/all-images/ava-2.jpg'
import ava03 from '../../assests/all-images/ava-3.jpg'
import ava04 from '../../assests/all-images/ava-4.jpg'
import '../../style/testimonial.css'
const Testimonial = () => {


    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 1000,
        swipeToSlide: true,
        autoplaySpeed: 2000,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };
    
    return <Slider  {...settings}>
        <div className="testimonial py-4 px-3">
            <p className="section_description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ipsum ipsam ad doloribus voluptatum doloremque ullam sint molestias repellat. Quae, optio dolor tempore eius numquam harum iure impedit fugit quod?</p>
            <div className="mt3 d-flex align-items-center gap-4">
                <img src={ava01} alt="" className='w-25 h-25 rounded-2' />
                <div>
                    <h6 className="mb-0 mt-3">Harsh N.</h6>
                    <p className="section_description">Customer</p>
                </div>
            </div>

        </div>


        <div className="testimonial py-4 px-3">
            <p className="section_description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ipsum ipsam ad doloribus voluptatum doloremque ullam sint molestias repellat. Quae, optio dolor tempore eius numquam harum iure impedit fugit quod?</p>
            <div className="mt3 d-flex align-items-center gap-4">
                <img src={ava02} alt="" className='w-25 h-25 rounded-2' />
                <div>
                    <h6 className="mb-0 mt-3">Jasmi G.</h6>
                    <p className="section_description">Customer</p>
                </div>
            </div>

        </div>


        <div className="testimonial py-4 px-3">
            <p className="section_description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ipsum ipsam ad doloribus voluptatum doloremque ullam sint molestias repellat. Quae, optio dolor tempore eius numquam harum iure impedit fugit quod?</p>
            <div className="mt3 d-flex align-items-center gap-4">
                <img src={ava03} alt="" className='w-25 h-25 rounded-2' />
                <div>
                    <h6 className="mb-0 mt-3">Juhil G.</h6>
                    <p className="section_description">Customer</p>
                </div>
            </div>

        </div>


        <div className="testimonial py-4 px-3">
            <p className="section_description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ipsum ipsam ad doloribus voluptatum doloremque ullam sint molestias repellat. Quae, optio dolor tempore eius numquam harum iure impedit fugit quod?</p>
            <div className="mt3 d-flex align-items-center gap-4">
                <img src={ava04} alt="" className='w-25 h-25 rounded-2' />
                <div>
                    <h6 className="mb-0 mt-3">Manis S.</h6>
                    <p className="section_description">Customer</p>
                </div>
            </div>

        </div>
    </Slider>
}

export default Testimonial