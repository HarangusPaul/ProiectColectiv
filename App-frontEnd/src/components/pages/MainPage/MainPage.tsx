import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { LogIn } from "../LogInPage/LogIn";
import { Register } from "../RegisterPage/Register";
import React, {useEffect, useState} from "react";
import { HomePage } from "../HomePage/HomePage";
import { ProtectedRoute } from "../../../utils/router/ProtectedRoute";
import { TablePage } from "../TabelPage/TablePage";
import { NavBar } from "../../NavBar/NavBar";
import { credentialVerifier } from "../../../utils/router/CredentialVerifier";
import { PublicRoute } from "../../../utils/router/PublicRoute";
import { NotificationBar } from "../../NotifBar/NotifBar";
import { NotificationService } from "../../../services/api/NotificationService";
import { Button, Icon } from "semantic-ui-react";

import "./MainPage.css"
import { DocumentPage } from "../DocumentPage/DocumentPage"; // Import DocumentPage
import { AvatarPage } from "../AvatarPage/AvatarPage";
import { CompanyDocumentPage } from "../DocumentPage/CompanyDocumentPage";
import {CompanyPage} from "../Companys/CompanyPage";
import {EmployPage} from "../Employs/EmployPage"; // Import CompanyDocumentPage
import {Interview} from "../InterviewPage/Interview";
import {PricePage} from "../PricePage/PricePage";
import axios from "axios";

export const MainPage = () => {
    const [pressed, setPressed] = useState(false);
    const notificationService = new NotificationService();
    const [notifications, setNotifications] = useState([]);

    useEffect(()=>{
        const email = localStorage.getItem("email")
        axios.get(`http://localhost:8080/app/v1/accounts/emailInterview/${email}`).then((res) => {
            const data = res.data
            try {
                // @ts-ignore
                const outputList = data.map((name:string) => ({
                    title: name,
                    message: "You got a notification regarding company: "+name+" which wants you to take part at an interview with our AI",
                }));
                setNotifications(outputList)
                localStorage.setItem("notificationCount",outputList.length.toString())
            } catch (e) {
            }
        });
    },[])
    let auth = !credentialVerifier();
    return (
        <Router>
            {auth ? (
                <div className={"navBar"}>
                    <NavBar />
                </div>
            ) : (<div />)}

            <Button inverted={false} className={"NotificationButton"} onClick={() => setPressed(!pressed)}>
                <Icon className={"IconBell"} inverted={true} size={"large"} name='bell' />
            </Button>

            {
                pressed ? <NotificationBar notificationList={notifications} /> : (<div />)
            }
            <div className="App">

                <div className="content">

                    <Routes>
                        <Route element={<ProtectedRoute />}>
                            <Route path="/" element={<HomePage  />} />
                            <Route path="/DocumentPage" element={<DocumentPage />} />
                            <Route path="/Interview" element={<Interview />} />
                            <Route path="/Avatar" element={< AvatarPage/>} />
                            <Route path="/CompanyDocumentPage" element={<CompanyDocumentPage />} /> {/* Add route for CompanyDocumentPage */}
                            <Route path="/Companys" element={<CompanyPage/>} />
                            <Route path="/EmployPage" element={<EmployPage/>} />
                            <Route path="/PricePage" element={<PricePage/>}  />
                        </Route>
                        <Route element={<PublicRoute />}>
                            <Route path="/login" element={<LogIn />} />
                            <Route path="/register" element={<Register />} />
                        </Route>
                    </Routes>
                </div>
            </div>
        </Router>
    );
};
