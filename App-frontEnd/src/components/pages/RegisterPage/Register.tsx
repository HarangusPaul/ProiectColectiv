import React from "react";
import "./Register.css";
import { RegisterForm } from "../../Inputs/Forms/Register/RegisterForm";
import { Button, ButtonContent, Icon, Image } from "semantic-ui-react";
import logo from "../../../assets/images/logo corporatist bunny.png";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="backGround">
      <div className="register-container">
        <div className="left-section-register">
          <div className="RegisterContainer">
            <Image src={logo} className="LogoReg" wrapped />
            <RegisterForm />
          </div>
        </div>
        <div className="right-section-register">
          <div className="welcome-message">
            <div className="welcome-title">Join us!</div>
            <div className="welcome-text">
              Get started by creating an account if you don't have one yet. If
              you do, you can log in by clicking the button below.
            </div>
            <div className="login-button-container">
              <Button
                animated
                type="submit"
                className="LoginButton"
                onClick={navigateToLogin}
              >
                <ButtonContent visible>Login</ButtonContent>
                <ButtonContent hidden>
                  <Icon name="arrow left" />
                </ButtonContent>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
