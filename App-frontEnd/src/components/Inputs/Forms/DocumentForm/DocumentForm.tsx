import "./DocumentForm.css"
import {Divider, Form, Input} from "semantic-ui-react";
import {useEffect, useState} from "react";
import {UploadButton} from "../../Buttons/UploadButton/UploadButton";

export const DocumentForm = (setFileForward:any) =>{

    const [documentName,setDocumentName] = useState("")
    const [file,setFile] = useState("")


    useEffect(()=>{
        if(file != "")
            setFileForward(file)
    },[file])
    return (
        <div style={{display:"grid",width:"17vw"}}>
            <Input className="inputDocument" placeholder={"Document Name"} value={documentName} onChange={(e)=>{setDocumentName(e.target.value)}}
            style ={{
                backgroundColor:"transparent",
                border: "solid, 2px, #C1CEF5",
                borderRadius: "7px",
                width: "22vw"
            }}/>
            <UploadButton settingFunction={setFile} fileType={".pdf"}></UploadButton>
        </div>
    )
}