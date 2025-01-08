import React from "react";
import "./LogIn.css";
import { LogInForm } from "../../Inputs/Forms/LogInForm/LogInForm";
import { Button, ButtonContent, Icon, Image } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo corporatist bunny.png";

export const LogIn = () => {
  const navigate = useNavigate();
  const navigateToRegister = () => {
    navigate("/register");
  };

  // return (
  //     <div className={"backGround"}>
  //         <div className={"LogInContainerLogIn"}>
  //             <Image src='https://cdn.discordapp.com/attachments/1219648191474176000/1300441864662683729/iepuras_degerat.png?ex=67222bdd&is=6720da5d&hm=8000a6770caef12b598b6175abe7a1390247fdd1acbedd071c61d8b996b46aa7&' className={"LogoLogIn"} size='small' wrapped />
  //             <LogInForm></LogInForm>
  //             <a onClick={navigateToRegister} className={"hyperToRegister"}>Don't have an account?go to register</a>
  //         </div>
  //     </div>
  // );
  return (
    <div className="backGround">
      <div className="login-container">
        <div className="left-section-login">
          <div className="welcome-message">
            <div className="welcome-title">Welcome!</div>
            <div className="welcome-text">
              Log into your account if you already have one. If not, you can
              register by clicking the button below
            </div>
          </div>
          {/*<button onClick={navigateToRegister} className="hyperToRegister">*/}
          {/*    Register*/}
          {/*</button>*/}
          <div className="register-button-container">
            <Button
              animated
              type="submit"
              className={"RegisterButton"}
              onClick={navigateToRegister}
            >
              <ButtonContent visible>Register</ButtonContent>
              <ButtonContent hidden>
                <Icon name="arrow right" />
              </ButtonContent>
            </Button>
          </div>
        </div>
        <div className="right-section-login">
          <div className="LogInContainerLogIn">
            <Image src={logo} className="LogoLogIn" wrapped />
            <LogInForm />
          </div>
        </div>
      </div>
    </div>
  );
};
