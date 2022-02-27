import React, { useEffect } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";
import logo from "../../logo.png";

const Header = ({ setSearch }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <Navbar expand="lg" variant="dark" bg="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <img
              style={{
                width: 150,
                height: 150,
              }}
              src={logo}
              alt="logo"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          {userInfo ? (
            <Nav className="m-auto w-50">
              <Form className="w-100 h-50">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form>
            </Nav>
          ) : (
            <div></div>
          )}
          {userInfo ? (
            <Nav className="m-auto my-2 my-lg-0" style={{ maxHeight: "100px" }}>
              <Nav.Link>
                <Link to="/mynotes">My Notes</Link>
              </Nav.Link>

              <NavDropdown title={`${userInfo?.name}`}>
                <NavDropdown.Item href="/profile" className="text-white">
                  My Profile
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={logoutHandler}
                  className="text-white"
                >
                  Logout
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
            </Nav>
          ) : (
            <Nav
              className="w-100"
              style={{ marginLeft: "70%", marginRight: 0 }}
            >
              <Nav.Link href="#action1">
                <Link to="/login">Login</Link>
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
