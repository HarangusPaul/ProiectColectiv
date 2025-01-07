import React from 'react';
import './Register.css';
import {RegisterForm} from "../../Inputs/Forms/Register/RegisterForm";
import {Image} from "semantic-ui-react";
import logo from "../../../assets/images/logo corporatist bunny.png";


export const Register = () => {
    return (
        <div className="backGround">
            <div className="RegisterContainer">
                <Image 
                    src={logo}
                    className="LogoReg" 
                    wrapped 
                />
                <RegisterForm />
            </div>
        </div>
    );
}
