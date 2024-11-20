import "./DocumentPage.css"
import {Button, Divider} from "semantic-ui-react";
import {SimpleTable, SimpleTableProps} from "../../Inputs/Table/SimpleTable";
import FormModal from "../../Modals/Dialog/FormModal/FormModal";
import {useEffect, useState} from "react";
import {DocumentForm} from "../../Inputs/Forms/DocumentForm/DocumentForm";
import {DocumentTable, DocumentTableProps} from "../../Inputs/Table/DocumentTable";
import {DocumentService} from "../../../services/api/DocumentService";
import {DocumentModal} from "../../../services/Models/DocumentModal";

// import jwt from 'jsonwebtoken';
// import { useJwt } from 'react-jwt';
import {jwtDecode} from 'jwt-decode';
interface DecodedToken {
    sub: string;
    [key: string]: any; // Allows for other properties to be included
}

export const DocumentPage = (props: any) => {
    const names = ["Position", "Skills", "Points of experince"];
    const [values, setValues] = useState([["SoftDev", "Python,React", "10/10"]])
    const data: DocumentTableProps = {
        deleteDocument: (index: number) => {
            const newItems = values.filter((_, i) => i !== index);
            setValues(newItems)
        }, tableColumnNames: names, tableColumnValues: values
    }
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState("")
    const [document, setDocument] = useState("")
    const documentService: DocumentService = new DocumentService();

    //astea is exemplu de folosire


    function decodeJwtAndExtractSub(token: any): string | null {
        try {

            const decoded = jwtDecode<DecodedToken>(token); // Decode the JWT// Decode the JWT without verification
            return decoded?.sub || null; // Return the "sub" value or null if not found
        } catch (error) {
            console.error('Error decoding JWT:', error);
            return null; // Return null in case of an error
        }
    }

    const formatDate = (): string => {
        const now = new Date(Date.now()); // Get current date
        const day = String(now.getDate()).padStart(2, '0'); // Get day, add leading zero
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Get month, add leading zero
        const year = now.getFullYear(); // Get year
        return `${day}/${month}/${year}`; // Format as DD/MM/YYYY
    };


    useEffect(() => {
        if (!open) {
            if (document !== "" && file !== "") {
                const token = localStorage.getItem("token")
                if(token === null)
                    return
                const email = decodeJwtAndExtractSub(JSON.parse(token).token)
                if (email !== null) {
                    const doc: DocumentModal = {
                        base64: file,
                        data: "empty",
                        date: formatDate(),
                        emailUser: email,
                        name: document
                    }
                    documentService.add(doc)?.then(()=>{console.log("Gata!")})
                }
            }
        }

    }, [open])

    return (
        <div className={"pageDiv"}>

            <div className={"title"}>
                {/*<label className={"titleLabel"}> {props.pageName}</label>*/}
                <label className={"titleLabel"}>Documents</label>
                <Button onClick={() => setOpen(true)} className={"activeTitleButton"}>Upload document CV</Button>
                <FormModal form={<DocumentForm setFileForward={setFile} setDocumentName={setDocument}/>}
                           modalTitle={"Document adding"} open={open} setOpen={setOpen} style={{}}/>
            </div>

            <Divider className={"divider"}/>

            <div className={"tableDiv"}>
                <DocumentTable props={data}/>
            </div>
        </div>
    )
}