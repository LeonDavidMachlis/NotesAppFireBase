import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import BootstrapNavbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export function Navbar({ user }) {
  return (
    <BootstrapNavbar expand="lg" className="bg-body-tertiary">
      <Container>
        <BootstrapNavbar.Brand href="/">Notes</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            {user ? (
              <Link to="/" className="nav-link" onClick={() => signOut(auth)}>
                Logout
              </Link>
            ) : (
              <>
                <Link to="register" className="nav-link">
                  Register
                </Link>
                <Link to="login" className="nav-link">
                  Login
                </Link>
              </>
            )}
            {user && (
              <Link to="notes" className="nav-link">
                Notes
              </Link>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}
