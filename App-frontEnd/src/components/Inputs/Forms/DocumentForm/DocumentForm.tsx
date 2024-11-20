import "./DocumentForm.css"
import {Divider, Form, Input} from "semantic-ui-react";
import {useEffect, useState} from "react";
import {UploadButton} from "../../Buttons/UploadButton/UploadButton";
import {DocumentService} from "../../../../services/api/DocumentService";

export interface DocumentFormInterface{
    setFileForward:any,
    setDocumentName:any,
}

export const DocumentForm = (props:DocumentFormInterface) =>{

    const [documentName,setDocumentName] = useState("")
    const [file,setFile] = useState("")


    useEffect(()=>{
        if(file != "")
            props.setFileForward(file)
    },[file])

    useEffect(()=>{
        if(documentName != "")
            props.setDocumentName(documentName)
    },[documentName])

    // DocumentService
    return (
        <div style={{display:"grid",width:"17vw"}}>
            <Input placeholder={"Document Name"} value={documentName} onChange={(e)=>{setDocumentName(e.target.value)}}/>
            <Divider/>
            <UploadButton settingFunction={setFile} fileType={".pdf"}></UploadButton>
        </div>
    )
}