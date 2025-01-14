import "./PricePage.css";
import React, { useEffect, useState } from "react";
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
        setIsCompany(accountType);
    }, []);

    const handleOpenModal = (name: string, monthlyPrice: number, yearlyPrice: number) => {
        setSelectedPackage({ name, monthlyPrice, yearlyPrice });
        setOpen(true);
    };

    return (
        <div className={"backGround"}>
            <div className={"price-page-container"}>

                {/* Show User Pricing if not a company */}
                {!isCompany && (
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
                                    $5/month <span className="price-separator" /> $50/year
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
                                    $20/month <span className="price-separator" /> $200/year
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
                )}

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

// TODO: Integrate this page to the register page