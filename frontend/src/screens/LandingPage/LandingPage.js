import React, { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  // const navigate = useNavigate();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [navigate, userInfo]);
  return (
    <div className="main bg-dark">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title text-white">Welcome to Note Keeper</h1>
              <p className="subtitle text-white">
                One Safe place for all your notes.
              </p>
            </div>
            <div className="buttonContainer">
              <Link to="/login">
                <Button
                  size="lg"
                  className="landingbutton d-flex justify-content-center align-items-center"
                  variant="outline-dark"
                >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  size="lg"
                  className="landingbutton d-flex justify-content-center align-items-center"
                  variant="outline-dark"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
