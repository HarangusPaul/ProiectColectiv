import "./PricePage.css";
import React, {useEffect, useState} from "react";
import PaymentModal from "../../Modals/Dialog/PaymentModal/PaymentModal";

export const PricePage: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [isCompany, setIsCompany] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState({
        name: "",
        monthlyPrice: 0,
        yearlyPrice: 0,
    });

    useEffect(() => {
        // Retrieve account type from localStorage
        const accountType = localStorage.getItem("accountType") === "company";
        console.log(accountType)
        setIsCompany(accountType);
    }, []);

    const handleOpenModal = (name: string, monthlyPrice: number, yearlyPrice: number) => {
        setSelectedPackage({name, monthlyPrice, yearlyPrice});
        setOpen(true);
    };

    return (
        <div className={"backGround"}>
            <div className={"price-page-container"}>

                {/* Show User Pricing if not a company */}
                {!isCompany ? (
                    <>
                        <h1 className={"pricing-title"}>Price for Users</h1>
                        <div className={"pricing-grid"}>
                            {/* Basic Package */}
                            <div className={"pricing-card basic"}>
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
                            <div
                                className={"pricing-card core"}
                                onClick={() => handleOpenModal("Core Package", 5, 50)}
                            >
                                <h2>Core Package</h2>
                                <p className="price">
                                    $5/month <span className="price-separator"/> $50/year
                                </p>
                                <ul className={"features-list"}>
                                    <li>30 days access</li>
                                    <li>Upload a CV</li>
                                    <li>1 AI discussion about the CV (every 24 hours)</li>
                                    <li>10 trainings per day</li>
                                </ul>
                            </div>

                            {/* Pro Bunny Package */}
                            <div
                                className={"pricing-card pro-bunny"}
                                onClick={() => handleOpenModal("Pro Bunny Package", 20, 200)}
                            >
                                <h2>Pro Bunny Package</h2>
                                <p className="price">
                                    $20/month <span className="price-separator"/> $200/year
                                </p>
                                <ul className={"features-list"}>
                                    <li>30 days access</li>
                                    <li>Upload a CV</li>
                                    <li>Unlimited AI discussions about the CV</li>
                                    <li>Unlimited trainings</li>
                                    <li>More insights and better AI interviews</li>
                                </ul>
                            </div>
                        </div>
                    </>
                ) : (<>
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
                        <div className={"pricing-card core"} onClick={() => handleOpenModal("Core Package", 200, 2250)}>
                            <h2>Core Package</h2>
                            <p className="price">$200/month <span className="price-separator"/> $2250/year</p>
                            <ul className={"features-list"}>
                                <li>200-question setlist for AI interview preparation</li>
                                <li>Automatic candidate filtering (20 additional criteria)</li>
                            </ul>
                        </div>

                        {/* Enhanced Package */}
                        <div className={"pricing-card enhanced"} onClick={() => handleOpenModal("Enhanced Package", 500, 5200)}>
                            <h2>Enhanced Package</h2>
                            <p className="price">$500/month <span className="price-separator"/> $5200/year</p>
                            <ul className={"features-list"}>
                                <li>Unlimited question setlists</li>
                                <li>Non-organic, highlighted promotion</li>
                                <li>Automatic candidate filtering (50 criteria)</li>
                            </ul>
                        </div>
                    </div>
                </>)}

                {/* Payment Modal */}
                <PaymentModal
                    open={open}
                    onClose={() => setOpen(false)}
                    selectedPackage={selectedPackage}
                />
            </div>
        </div>
    );
};
