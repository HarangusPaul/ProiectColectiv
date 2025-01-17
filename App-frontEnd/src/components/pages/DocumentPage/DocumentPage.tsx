import "./DocumentPage.css"
import {Button, Divider} from "semantic-ui-react";
import {NavBar} from '../../NavBar/NavBar';
import {SimpleTable, SimpleTableProps} from "../../Inputs/Table/SimpleTable";
import FormModal from "../../Modals/Dialog/FormModal/FormModal";
import React, {useEffect, useState} from "react";
import {DocumentForm} from "../../Inputs/Forms/DocumentForm/DocumentForm";
import {DocumentTable, DocumentTableProps} from "../../Inputs/Table/DocumentTable";
import axios from "axios";

export interface UserData {
    name: string;
    date: string;
    data: string;
    base64: string;
    emailUser: string;
}

export const DocumentPage = (props: any) => {
    const names = ["Position", "Skills", "Points of experince"];
    const [values, setValues] = useState([["SoftDev", "Python,React", "10/10"],["MachineLeaning", "Python,Ollama", "60% Interview"],["Backend", "Java,Rust", "75% Interview"]])
    const data: DocumentTableProps = {
        deleteDocument: (index: number) => {
            const newItems = values.filter((_, i) => i !== index);
            setValues(newItems)
        }, tableColumnNames: names, tableColumnValues: values
    }
    const [open, setOpen] = useState(false)
    const [fileForward, setFileForward] = useState("")
    const [documentName, setDocumentName] = useState("")
    const [,] = useState()
    const [visibleTable, setVisibleTable] = useState(false)
    //astea is exemplu de folosire
    const getCurrentDate = (): string => {
        const today = new Date();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(today.getDate()).padStart(2, '0');
        const year = today.getFullYear();

        return `${month}/${day}/${year}`;
    };

    useEffect(() => {
        if (fileForward != "") {
            const user: UserData = {
                base64: fileForward,
                data: fileForward,
                date: getCurrentDate(),
                emailUser: "paulharangus1@gmail.com",
                name: "paul"
            }
            const data = localStorage.getItem("token")
            if (data !== null) {
                const token = JSON.parse(data)
                axios.post(`http://localhost:8080/app/v2/documents/add`, user, {
                    headers: {
                        'Authorization': `Bearer ${token.token}`
                    }
                }).then(() => {
                    setVisibleTable(true)
                })
            }
        }

        console.log(documentName)
        console.log(fileForward)
    }, [fileForward])


    const mapData = (data:string[]) => {
        // Map the data
        const mappedData = data.map(item => {
            // Remove square brackets and split by commas
            const parts = item.slice(1, -1).split(',');

            // Get the category (first item)
            const category = parts[0];

            // Technologies are all items between the first (category) and last (score)
            const technologies = parts.slice(1, parts.length - 1).join(',') + ","; // Add a trailing comma

            // Experience is the last part (score)
            const experience = parts[parts.length - 1];

            return [category, technologies, experience];
        });

        return mappedData; // Return the mapped data
    };

    useEffect(()=>{
        const token = localStorage.getItem("token")
        const email = localStorage.getItem("email")
        if(token !== null && email !== null){
            axios.get(`http://localhost:8080/app/v2/documents/getUserData?email=${email}`, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(token).token}`,
                'Content-Type': 'application/json'
            }
        }).then((res)=>{
            setValues(mapData(res.data))
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
                    <FormModal form={<DocumentForm setFileForward={setFileForward} setDocumentName={setDocumentName}/>}
                               modalTitle={"Document adding"} open={open} setOpen={setOpen}
                               style={{fontFamily: "'Comic-Sans', sans-serif", fontSize: "16px"}}/>
                </div>

                <div className={"tableDiv"}>
                    <Button onClick={() => setOpen(true)} className={"activeTitleButton"}>Upload document CV</Button>
                    <DocumentTable props={data}/>
                </div>
            </div>
        </div>
    )
}