import "./CompanyPage.css"
import {Button, Divider} from "semantic-ui-react";
import {NavBar} from '../../NavBar/NavBar';
import {SimpleTable, SimpleTableProps} from "../../Inputs/Table/SimpleTable";
import FormModal from "../../Modals/Dialog/FormModal/FormModal";
import React, {useEffect, useState} from "react";
import {DocumentForm} from "../../Inputs/Forms/DocumentForm/DocumentForm";
import {DocumentTable, DocumentTableProps} from "../../Inputs/Table/DocumentTable";
import {useNavigate} from "react-router-dom";
import axios from "axios";

interface Job {
    position: string;
    skills: string;
    score: string;
}

export const CompanyPage = (props: any) => {
    const nav = useNavigate();
    const names = ["Position Available", "Skills Needed", "Close"];
    const [values, setValues] = useState([["SoftDeveloper", "Python,React", "80% Interview"]])
    const [fileForward,setFileForward] = useState("")
    const data: DocumentTableProps = {
        deleteDocument: (index: number) => {
            const newItems = values.filter((_, i) => i !== index);
            setValues(newItems)
        }, tableColumnNames: names, tableColumnValues: values
    }
    const [open, setOpen] = useState(false)
    const [documentName,setDocumentName] = useState("")
    const [,] = useState()
    //astea is exemplu de folosire
    const mapJobData = (data: Job[]): [string, string, string][] => {
        return data.map(item => [
            item.position.trim().replace('"', ''),  // Clean up position string
            item.skills,
            item.score // Ensure score is treated as a string
        ]);
    };

    useEffect(()=>{
        const token = localStorage.getItem("token")
        const email = localStorage.getItem("email")
        if(token !== null && email !== null){
            axios.get(`http://localhost:8080/app/v2/documents/getUserPositions?email=${email}`, {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(token).token}`,
                    'Content-Type': 'application/json'
                }
            }).then((res)=>{
                console.log(mapJobData(res.data))
                setValues(mapJobData(res.data))
            })
        }
    },[])

    return (
        <div className={"backGround"}>
            <div className={"pageDiv"}>
                <div className={"title"}>
                    <label className={"titleLabel"}>Documents</label>
                    <p className={"bodyTextDocuments"}>All essential info in your CV, listed below in an easy-to-read
                        format!
                        Add your updated versions anytime, and delete the ones that are no longer relevant for a clean
                        search.</p>
                    <FormModal form={<DocumentForm setFileForward={setFileForward}  setDocumentName={setDocumentName}/>} modalTitle={"Document adding"} open={open} setOpen={setOpen}
                               style={{fontFamily: "'Comic-Sans', sans-serif", fontSize: "16px"}}/>
                </div>

                <div className={"tableDiv"}>
                    <Button onClick={() => {nav("/DocumentPage")}} className={"activeTitleButton"}>Go to CV</Button>
                    <DocumentTable props={data}/>
                </div>
            </div>
        </div>
    )
}