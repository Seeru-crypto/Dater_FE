import React from "react"

import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

const Navbar = () => {

    return(
        <Container>

        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
        </Navbar>
                </Container>

                

    )
}
export default Navbar;