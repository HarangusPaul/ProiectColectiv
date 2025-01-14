import "./PricePageRegister.css";
import React, {useEffect, useState} from "react";
import { ChoiceModal, ModalPropsChoice } from "../../Modals/Dialog/ChoiceModal/ChoiceModal";
import {Button} from "semantic-ui-react";

export const PricePage = () => {
    const [open, setOpen] = useState(false)
    const [type,setType] = useState(false)

    useEffect(() => {
        const typeS = localStorage.getItem("accountType") === "company"
        setType(typeS);
    },[])


    return (
        <div className={"backGround"}>
            <div className={"price-page-container"}>

                {/* Header for Users Pricing */}
                <h1 className={"pricing-title"}>Price for Users</h1>

                <div className={"pricing-grid"}>
                    {/* Basic Package */}
                    <div className={"pricing-card basic"} onClick={()=>{console.log(1)}}>
                        <h2>Basic Package</h2>
                        <p className="price">FREE!</p>
                        <ul className={"features-list"}>
                            <li>30 days access</li>
                            <li>Upload a CV</li>
                            <li>No AI discussions about the CV</li>
                            <li>1 training per day</li>
                        </ul>
                    </div>

                    {/* Core Package */}
                    <div className={"pricing-card core"}>
                        <h2>Core Package</h2>
                        <p className="price">$5/month <span className="price-separator"/> $50/year</p>
                        <ul className={"features-list"}>
                            <li>30 days accessi</li>
                            <li>Upload a CV</li>
                            <li>1 AI discussion about the CV (every 24 hours)</li>
                            <li>10 trainings per day</li>
                        </ul>
                        <Button></Button>
                    </div>

                    {/* Pro Bunny Package */}
                    <div className={"pricing-card pro-bunny"}>
                        <h2>Pro Bunny Package</h2>
                        <p className="price">$20/month <span className="price-separator"/> $200/year</p>
                        <ul className={"features-list"}>
                            <li>30 days access</li>
                            <li>Upload a CV</li>
                            <li>Unlimited AI discussions about the CV</li>
                            <li>Unlimited trainings</li>
                            <li>More insights and better AI interviews</li>
                        </ul>
                    </div>
                </div>
                <Button onClick={() => setOpen(true)} className={"activeBuyButton"}>Buy Now!</Button>


                {/* Header for Companies Pricing */}
                <h1 className={"pricing-title"}>Price for Companies</h1>

                <div className={"pricing-grid"}>
                    {/* Basic Package */}
                    <div className={"pricing-card basic"}>
                        <h2>Basic Package</h2>
                        <p className="price">FREE!</p>
                        <ul className={"features-list"}>
                            <li>15 days access</li>
                            <li>Basic UI onboarding</li>
                            <li>Non-highlighted, organic promotion</li>
                        </ul>
                    </div>

                    {/* Core Package */}
                    <div className={"pricing-card core"}>
                        <h2>Core Package</h2>
                        <p className="price">$200/month <span className="price-separator"/> $2250/year</p>
                        <ul className={"features-list"}>
                            <li>200-question setlist for AI interview preparation</li>
                            <li>Automatic candidate filtering (20 additional criteria)</li>
                        </ul>
                    </div>

                    {/* Enhanced Package */}
                    <div className={"pricing-card enhanced"}>
                        <h2>Enhanced Package</h2>
                        <p className="price">$500/month <span className="price-separator"/> $5200/year</p>
                        <ul className={"features-list"}>
                            <li>Unlimited question setlists</li>
                            <li>Non-organic, highlighted promotion</li>
                            <li>Automatic candidate filtering (50 criteria)</li>
                        </ul>
                    </div>
                </div>

                {/*<Button onClick={() => setOpen(true)} className={"activeBuyButton"}>Buy Now!</Button>*/}
            </div>
        </div>
    );
};
