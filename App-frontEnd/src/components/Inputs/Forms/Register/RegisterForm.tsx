import React, {useState} from "react";
import "./RegisterForm.css"
import {Button, ButtonContent, Icon, Input} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import validator from "validator";



export const RegisterForm= () =>{
    const [error,setError] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");
    const [email,setEmail] = useState("");
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const [confirmedPassword,setConfirmedPassword] = useState("");

    function isValidEmail(email:string) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const result = pattern.test(email);
        if(!result){
            setErrorMessage("Incorrect Email!");
        }
        return result;
    }

    const isValidPassword = (value:any) => {

        if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            return true;
        } else {
            setErrorMessage("Incorrect Password!");
            return false;
        }
    }


    function isSamePassword(password:string, confirmedPassword:string) {
        if(password == confirmedPassword) {setErrorMessage("Passwords Do Not Match!")}
        return password != confirmedPassword;
    }

    function existentUsername(userName: string) {
        //todo:search in database if it is existent!If needed
        return true;
    }

    const submit = (e:any)=>{
        e.preventDefault();
        if (!isValidEmail(email) || !isValidPassword(password) || isSamePassword(confirmedPassword,password) || existentUsername(userName)) {
            setError(true);
        }
        return;
    }

    return (
        <div className="formDiv">
            <form className={"form"}>
                <Input type="text" className={"Email"} placeholder="Email" onChange={(e)=>{
                    setEmail(e.target.value);
                    setError(false);
                }}/>
                <Input type="text" className={"Username"} placeholder="Username" onChange={(e)=>{
                    setUserName(e.target.value);
                    setError(false);
                }}/>
                <Input type="password" className={"Password"} placeholder="Password" onChange={(e)=>{
                    setPassword(e.target.value);
                    setError(false);
                }}/>
                <Input type="password" className={"ConfirmPassword"} placeholder="confirmedPassword" onChange={(e)=>{
                    setConfirmedPassword(e.target.value);
                    setError(false);
                }}/>
                {error?(<label className={"errorLabel"}>{errorMessage}</label>):(<></>)}

            <Button animated className={"SendButton"} onClick={(e) => {submit(e)}}>
                <ButtonContent visible className="buttonText">Register</ButtonContent>
                <ButtonContent hidden>
                    <Icon name='arrow right' />
                </ButtonContent>
            </Button>
            </form>
        </div>
    )
}