import "./CompanyPage.css"
import {Button, Divider} from "semantic-ui-react";
import {NavBar} from '../../NavBar/NavBar';
import {SimpleTable, SimpleTableProps} from "../../Inputs/Table/SimpleTable";
import FormModal from "../../Modals/Dialog/FormModal/FormModal";
import React, {useState} from "react";
import {DocumentForm} from "../../Inputs/Forms/DocumentForm/DocumentForm";
import {DocumentTable, DocumentTableProps} from "../../Inputs/Table/DocumentTable";
import {useNavigate} from "react-router-dom";

export const CompanyPage = (props: any) => {
    const nav = useNavigate();
    const names = ["Position Available", "Skills Needed", "Close"];
    const [values, setValues] = useState([["SoftDeveloper", "Python,React", "80% Interview"]])
    const data: DocumentTableProps = {
        deleteDocument: (index: number) => {
            const newItems = values.filter((_, i) => i !== index);
            setValues(newItems)
        }, tableColumnNames: names, tableColumnValues: values
    }
    const [open, setOpen] = useState(false)
    const [,] = useState()
    //astea is exemplu de folosire

    return (
        <div className={"backGround"}>
            <div className={"pageDiv"}>
                <div className={"title"}>
                    <label className={"titleLabel"}>Documents</label>
                    <p className={"bodyTextDocuments"}>All essential info in your CV, listed below in an easy-to-read
                        format!
                        Add your updated versions anytime, and delete the ones that are no longer relevant for a clean
                        search.</p>
                    <FormModal form={<DocumentForm/>} modalTitle={"Document adding"} open={open} setOpen={setOpen}
                               style={{fontFamily: "'Comic-Sans', sans-serif", fontSize: "16px"}}/>
                </div>

                <div className={"tableDiv"}>
                    <Button onClick={() => {nav("/CompanyDocumentPage")}} className={"activeTitleButton"}>Go to CV</Button>
                    <DocumentTable props={data}/>
                </div>
            </div>
        </div>
    )
}