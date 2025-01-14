import {Button, Input} from "semantic-ui-react";
import {useState} from "react";
import "./MessegeForm.css"

export interface MessegeFormInternface{
    sendMsg:any
}



export const MessegeForm = (props:MessegeFormInternface) =>{
    const [msg,setMsg] = useState("")


    return (
        <div style={{
            position: "relative",
            bottom: "-68vh",
            width: "82vh",
            left: "14vh",
        }}>
            <Input className={"MessegeInput"} value={msg} onChange={(event)=>{setMsg(event.target.value)}}></Input>
            <Button className="sendMessage" onClick={()=>{
                props.sendMsg(msg)
                setMsg("")
            }}>Send</Button>
        </div>
    )
}