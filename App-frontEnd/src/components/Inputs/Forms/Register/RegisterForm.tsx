import React, { useState } from "react";
import "./RegisterForm.css";
import { Button, ButtonContent, Icon, Input } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import validator from "validator";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const [passwordValid, setPasswordValid] = useState({
    minLength: false,
    hasUpperCase: false,
    hasNumber: false,
    hasSymbol: false,
  });

  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/login");
  };

  function isValidEmail(email: string) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const result = pattern.test(email);
    if (!result) {
      setErrorMessage("Incorrect Email!");
    }
    return result;
  }

  const isValidPassword = (value: any) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return true;
    } else {
      setErrorMessage("Incorrect Password!");
      return false;
    }
  };

  function isSamePassword(password: string, confirmedPassword: string) {
    if (password == confirmedPassword) {
      setErrorMessage("Passwords Do Not Match!");
    }
    return password != confirmedPassword;
  }

  function existentUsername(userName: string) {
    //todo:search in database if it is existent!If needed
    return true;
  }

  const submit = (e: any) => {
    e.preventDefault();
    if (
      !isValidEmail(email) ||
      !isValidPassword(password) ||
      isSamePassword(confirmedPassword, password) ||
      existentUsername(userName)
    ) {
      setError(true);
    }
    return;
  };

  // Add password validation check on change
  const checkPasswordValidation = (value: string) => {
    setPasswordValid({
      minLength: value.length >= 8,
      hasUpperCase: /[A-Z]/.test(value),
      hasNumber: /\d/.test(value),
      hasSymbol: /[!@#$%^&*]/.test(value),
    });
  };

  const slideDownVariants = {
    open: {
      maxHeight: 300,
      padding: "1rem",
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    closed: {
      maxHeight: 0,
      padding: "0",
      opacity: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <form className={"RegisterForm"}>
      <div className={"InputFields"}>
        <Input
          type="text"
          className={"Email"}
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
            setError(false);
          }}
        />
        <Input
          type="text"
          className={"Username"}
          placeholder="Username"
          onChange={(e) => {
            setUserName(e.target.value);
            setError(false);
          }}
        />
        <Input
          type="password"
          className="Password"
          placeholder="Password"
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
          onChange={(e) => {
            setPassword(e.target.value);
            checkPasswordValidation(e.target.value);
            setError(false);
          }}
        />
        <AnimatePresence>
          {isPasswordFocused && (
            <motion.div
              className="validation-messages"
              initial="closed"
              animate="open"
              exit="closed"
              variants={slideDownVariants}
              style={{ overflow: "hidden" }}
            >
              <p className={passwordValid.minLength ? "valid" : "invalid"}>
                At least 8 characters
              </p>
              <p className={passwordValid.hasUpperCase ? "valid" : "invalid"}>
                At least one uppercase letter
              </p>
              <p className={passwordValid.hasNumber ? "valid" : "invalid"}>
                At least one number
              </p>
              <p className={passwordValid.hasSymbol ? "valid" : "invalid"}>
                At least one special character
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        <Input
          type="password"
          className={"ConfirmPassword"}
          placeholder="Confirm Password"
          onChange={(e) => {
            setConfirmedPassword(e.target.value);
            setError(false);
          }}
        />
        {error ? <label className={"errorLabel"}>{errorMessage}</label> : <></>}
      </div>
      <Button
        animated
        className={"SendButton"}
        onClick={(e) => {
          submit(e);
        }}
      >
        <ButtonContent visible>Register</ButtonContent>
        <ButtonContent hidden>
          <Icon name="arrow right" />
        </ButtonContent>
      </Button>
    </form>
  );
};
