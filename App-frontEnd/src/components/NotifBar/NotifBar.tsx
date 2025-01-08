import {Divider, Header, Label, TextArea} from "semantic-ui-react";
import "./NotifBar.css"
import {useState} from "react";
import {ResponsesModal} from "../Modals/Dialog/ResponsesModal/ResponsesModal";

export interface notifications{
    title:string,
    message:string,
}

export interface notificationsProps{
    notificationList: Array<notifications>
}

export const NotificationBar = (props:notificationsProps) =>{
    const [notOpen,setNotOpen] = useState(false);
    const [message,setMessage] = useState("");
    const [title,setTitle] = useState("");

    const openInformationModal = (notification:notifications)=>{
        setMessage(notification.message)
        setTitle(notification.title)
        setNotOpen(true);
    }


    return (<div className={"NotificationDiv"}>
        <Header className={"NotificationHeader"}>Inbox</Header>
        <Divider className={"NotificationDivider"}/>
        <div className={"NotificationContainer"}>
        {
            props.notificationList?props.notificationList.map((item:any, index:any) => (
                <div onClick={()=>{
                    openInformationModal(item)
                }} className={"NotificationItemDiv"}>
                    <Header className={"NotificationItemHeader"}>{item.title}</Header>
                    <Divider className={"NotificationItemDivider"}/>
                    <Label className={"NotificationItemLabel"}>{item.message}</Label>
                </div>
            )):(<div/>)
        }
        </div>
        <ResponsesModal props={{open:notOpen,setOpen:setNotOpen,text:message,header:title,messageButton:"Understand!"}}/>
    </div>)
}
