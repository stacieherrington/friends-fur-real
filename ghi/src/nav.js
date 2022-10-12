import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

function NavBar() {
  return (
    <>
      <div className="container-fluid">
        <Navbar bg="light" variant="light" expand="lg">
          <Container>
            <div>
              <Navbar.Brand href="#home">
                <img
                  src="images/cute-icon.png"
                  width="100"
                  height="100"
                  className="d-inline-block align-top"
                  alt="Pet logo"
                />
              </Navbar.Brand>
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <NavDropdown title="Rescues" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Link 1</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.2">
                    Link 2
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.3">Link 3</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Link 4
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Adopters" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Link 1</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.2">
                    Link 2
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.3">Link 3</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Link 4
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>

              <Nav>
                <Nav.Link href="#signup">
                  <Button variant="outline-secondary">Signup</Button>
                </Nav.Link>
                <Nav.Link eventKey={2} href="#login">
                  <Button variant="outline-secondary">Login</Button>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  )
}

export default NavBar;