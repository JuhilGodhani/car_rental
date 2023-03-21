import React from 'react'
import { Container } from 'reactstrap'
import '../../style/common-section.css'

const CommonSection = ({title}) => {
  return <section className='common_section mb-0'>
    <Container className='text-center'>
        <h1 className='text-light'>{title}</h1>
        <div id="c"></div>
    </Container>
  </section>
}

export default CommonSection