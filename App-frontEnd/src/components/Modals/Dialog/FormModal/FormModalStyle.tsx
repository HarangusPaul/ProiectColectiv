import React from 'react';
import './FormModal.css';
import {
    ModalHeader,
    ModalDescription,
    ModalContent,
    ModalActions,
    Button,
    Modal,
} from 'semantic-ui-react'


export interface ModalFormProps {
    modalTitle: string;
    form: any;
    open: boolean;
    setOpen: any;
    style: any
}

function FormModal(props: ModalFormProps) {

    return (
        <Modal
            onClose={() => props.setOpen(false)}
            onOpen={() => props.setOpen(true)}
            open={props.open}
            style={props.style}
        >
            <ModalHeader style={{ fontSize: "24px", fontFamily: "Poppins, sans-serif", backgroundColor: "#28304B", color:"#C1CEF5", top :"2.5vw" }}>
                {props.modalTitle}
            </ModalHeader>
            <ModalContent style={{backgroundColor: "#28304B"}}>
                <div>{props.form}</div>
            </ModalContent>
            <ModalActions style={{backgroundColor: "#28304B"}}>
                <Button className="modalButton" onClick={() => props.setOpen(false)}>Done!</Button>
            </ModalActions>
        </Modal>
    )
}

export default FormModal
