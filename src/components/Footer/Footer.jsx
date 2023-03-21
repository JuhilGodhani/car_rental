import React from 'react'
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'
import "../../style/footer.css";
import { Link } from 'react-router-dom'

const quickLinks = [
  {
    path: '/about',
    display: 'About'
  },
  {
    path: '/#',
    display: 'Privacy Policy'
  },
  {
    path: '/cars',
    display: 'Car Listing'
  },
  {
    path: '/blogs',
    display: 'Blog'
  },
  {
    path: '/contact',
    display: 'Contact'
  },
]


const Footer = () => {

  const date = new Date()
  const year = date.getFullYear()
  return(<footer className='footer'>
    <Container>
      <Row>
        <Col lg='4' md='4' sm='12'>
          <div className="logo footer_logo">
            <h1><Link to='/home' className='d-flex align-items-center gap-3'>
              <i className="ri-car-line"></i>
              <span>Rent Car <br /> Service</span>
            </Link>
            </h1>
          </div>
          <p className="footer_logo_content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas eos commodi cum eum eius rerum enim fugit quos explicabo sint. Mollitia beatae a, dolore corporis qui voluptatum in culpa voluptates.
          </p>
        </Col>

        <Col lg='2' md='4' sm='6'>
          <div className="mb-4">
            <h5 className="footer_link_title">Quick Links</h5>
            <ListGroup>
              {
                quickLinks.map((item, index) => (
                  <ListGroupItem key={index} className="p-0 mt-3 quick_link">
                    <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                ))
              }
            </ListGroup>
          </div>
        </Col>

        <Col lg='3' md='4 ' sm='6'>
          <div className="mb-4">
            <h5 className="footer_link_title mb-4">Head Office</h5>
            <p className="office_info">A/401-sidhhivinayak app,surat</p>

            <p className="office_info">Phone: +91-8758491244</p>

            <p className="office_info">Email: harshnariya556@gmail.com</p>

            <p className="office_info">Office Time: 10am - 7pm</p>
          </div>
        </Col>

        <Col lg='3' md='4' sm='12'>
              <div className="mb-4">
                <h5 className="footer_link_title">Newsletter</h5>
                <p className="section_description">Subscribe our newsleter</p>
                <div className="newsletter">
                  {/* <input type='email' placeholder='Email'> </input> */}
                  {/* <span><i className="ri-send-plane-line"></i></span> */}
                </div>
              </div>
        </Col>
       <Col lg='12'>
        <div className="footer_bottom">
          <p className="section_description d-flex align-item-center justify-content-center gap-1 pt-4">
          <i className="ri-copyright-line"></i>Copyright {year},
          All right reserved
          </p>
        </div>
       </Col>
      </Row>
    </Container>

  </footer>
  );
}

export default Footer