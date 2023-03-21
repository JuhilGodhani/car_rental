import React from 'react'
import '../../style/our-members.css'
import { Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import ava01 from '../../assests/all-images/ava-1.jpg'
import ava02 from '../../assests/all-images/ava-2.jpg'
import ava03 from '../../assests/all-images/ava-3.jpg'


const OUR__MEMBERS = [
  {
    name: "Jhon Doe",
    experience: "5 years of experience",
    fbUrl: "#",
    instUrl: "#",
    twitUrl: "#",
    linkedinUrl: "#",
    imgUrl: ava01,
  },

  {
    name: "David Lisa",
    experience: "5 years of experience",
    fbUrl: "#",
    instUrl: "#",
    twitUrl: "#",
    linkedinUrl: "#",
    imgUrl: ava02,
  },

  {
    name: "Hilton King",
    experience: "5 years of experience",
    fbUrl: "#",
    instUrl: "#",
    twitUrl: "#",
    linkedinUrl: "#",
    imgUrl: ava03,
  },

  {
    name: "Jhon Doe",
    experience: "5 years of experience",
    fbUrl: "#",
    instUrl: "#",
    twitUrl: "#",
    linkedinUrl: "#",
    imgUrl: ava01,
  },
];




const OurMembers = () => {
  return (
    <>
      {OUR__MEMBERS.map((item, index) => (
        <Col lg='3' md='3' sm='4' xs='6' key={index} className='mb-4'>
          <div className="single_member">
            <div className="single_member-img">
              <img src={item.imgUrl} alt="" className='w-100'/>

              <div className="single_member-social">
                <Link to={item.fbUrl} ><i className="ri-facebook-circle-fill"></i></Link>

                <Link to={item.twitUrl}><i className="ri-twitter-line"></i></Link>


                <Link to={item.linkedinUrl}><i className="ri-linkedin-fill"></i></Link>


                <Link to={item.instUrl}><i className="ri-instagram-line"></i></Link>
              </div>
            </div>
            <h6 className="text-center mb-o mt-3">{item.name}</h6>
            <p className="section_description text-lg-center">{}{item.experience}</p>
          </div>
        </Col>
      ))}

    </>
  )
}

export default OurMembers 