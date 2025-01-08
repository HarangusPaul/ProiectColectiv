import "./InterviewForm.css"
import {Divider, Dropdown, Form, Input} from "semantic-ui-react";
import {useEffect, useState} from "react";
import {UploadButton} from "../../Buttons/UploadButton/UploadButton";

export interface InterviewFormProps {
    users: any[]
}
export const InterviewForm = (props:InterviewFormProps) =>{

    const [documentName,setDocumentName] = useState("")
    const [file,setFile] = useState("")




    return (
        <div style={{display:"grid",width:"17vw"}}>
            <Dropdown
                placeholder='Candidate Name'
                fluid
                selection
                multiple
                options={props.users}
            />
            {/*<Input className="inputDocument" placeholder={"Candidate Name"} value={documentName} onChange={(e)=>{setDocumentName(e.target.value)}}*/}
            {/*style ={{*/}
            {/*    backgroundColor:"transparent",*/}
            {/*    border: "solid, 2px, #C1CEF5",*/}
            {/*    borderRadius: "7px",*/}
            {/*    width: "22vw"*/}
            {/*}}/>*/}
            {/*<Input className="inputDocument" placeholder={"Document Name"} value={documentName} onChange={(e)=>{setDocumentName(e.target.value)}}*/}
            {/*       style ={{*/}
            {/*           backgroundColor:"transparent",*/}
            {/*           border: "solid, 2px, #C1CEF5",*/}
            {/*           borderRadius: "7px",*/}
            {/*           width: "22vw"*/}
            {/*       }}/>*/}
            {/*<UploadButton settingFunction={setFile} fileType={".pdf"}></UploadButton>*/}
        </div>
    )
}