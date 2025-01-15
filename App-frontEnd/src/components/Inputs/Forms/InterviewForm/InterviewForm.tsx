import "./InterviewForm.css"
import {Divider, Dropdown, Form, Input} from "semantic-ui-react";
import {useEffect, useState} from "react";
import {UploadButton} from "../../Buttons/UploadButton/UploadButton";
import axios from "axios";

export interface InterviewFormProps {
    users: any[]
}
export const InterviewForm = (props:InterviewFormProps) =>{

    const [documentName,setDocumentName] = useState("")
    const [file,setFile] = useState("")
    // @ts-ignore
    const handleChange = (e,data) => {
        const interview = {
            email: data.value,
            company: 'Company ABC',
        };
        axios.post('http://localhost:8080/app/v1/accounts/addInterview', interview).then(r => {});
    };

    return (
        <div style={{display:"grid",width:"17vw"}}>
            <Dropdown
                className={"ala"}
                placeholder='Candidate Name'
                fluid
                selection
                onChange={handleChange}
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