import React, { useState } from "react";
import "./PaymentModal.css";

import {
    Modal,
    ModalHeader,
    ModalContent,
    ModalDescription,
    ModalActions,
    Button,
    Radio,
} from "semantic-ui-react";

interface PaymentModalProps {
    open: boolean;
    onClose: () => void;
    selectedPackage: {
        name: string;
        monthlyPrice: number;
        yearlyPrice: number;
    };
}

const PaymentModal: React.FC<PaymentModalProps> = ({ open, onClose, selectedPackage }) => {
    const [subscriptionType, setSubscriptionType] = useState<"monthly" | "yearly">("monthly");

    const price =
        subscriptionType === "monthly"
            ? selectedPackage.monthlyPrice
            : selectedPackage.yearlyPrice;

    // TODO: Redirect this where you think is appropriate this is just an example
    const handleGoToPayment = () => {
        // Example: Redirect to a payment page
        const paymentUrl = `/payment?package=${selectedPackage.name}&type=${subscriptionType}&price=${price}`;
        window.location.href = paymentUrl;
    };

    return (
        <Modal open={open} onClose={onClose}>
            <ModalHeader>{selectedPackage.name} - Subscription</ModalHeader>
            <ModalContent>
                <ModalDescription>
                    <p>Choose your subscription type:</p>
                    <div>
                        <Radio
                            label="Monthly"
                            name="subscriptionType"
                            value="monthly"
                            checked={subscriptionType === "monthly"}
                            onChange={() => setSubscriptionType("monthly")}
                        />
                        <Radio
                            label="Yearly"
                            name="subscriptionType"
                            value="yearly"
                            checked={subscriptionType === "yearly"}
                            onChange={() => setSubscriptionType("yearly")}
                            style={{ marginLeft: "1em" }}
                        />
                    </div>
                    <p style={{ marginTop: "1em" }}>
                        Selected Price: <strong>${price}</strong>
                    </p>
                </ModalDescription>
            </ModalContent>
            <ModalActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleGoToPayment} primary>
                    Go to Payment
                </Button>
            </ModalActions>
        </Modal>
    );
};

export default PaymentModal;
