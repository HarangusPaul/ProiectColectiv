import {Button, Divider, Modal, ModalActions, ModalContent, ModalHeader} from "semantic-ui-react";
import React, {useEffect} from "react";
import './ResponsesModal.css'

export interface ModalProps {
    open: boolean;
    size: any;
    setOpen: (opt: boolean) => {};
}

export const ResponsesModal = (props: any) => {
    const [open, setOpen] = React.useState(false);
    const [counter, setCounter] = React.useState(0);

    useEffect(() => {
            if (counter === 0) {
                setCounter(1)
                return;
            }
            setOpen(true)
            props.props.setOpen(false);
        }
        , [props])

    return (
        <Modal className={"modalFrame"}
               size={props.props.size}
               open={open}
               onClose={() => {
                   if (props.props.setOpen != undefined) props.setOpen(false)
               }}
               style={{
                   borderRadius: "10px",
                   // padding: "5px",
                   backgroundColor: "#28304B"
               }}
        >
            <ModalHeader style={{backgroundColor:"#38405A", color:"#C1CEF5", borderTopRightRadius: "7px", borderTopLeftRadius: "7px"}} >{props.props.header} </ModalHeader>
            <ModalContent style={{backgroundColor:"transparent", color:"#919DC3"}}>
                <p>{props.props.text}</p>
            </ModalContent>
            <Divider style={{left:"5%"}}/>
            <ModalActions style={{backgroundColor:"transparent"}}>
                <Button className="responseModalBtn" positive onClick={() => {
                    setOpen(false)
                }}>
                    {props.props.messageButton}
                </Button>
            </ModalActions>
        </Modal>
    )
}