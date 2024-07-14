import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../Assets/logo.png'

export default function MainNav() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
      <Container>
        <Navbar.Brand href="#home" className=' m-auto'>
          <div className=' text-center'><img src={logo} alt="logo" className=' w-50'/>
          </div>
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}
