import "./EmployPage.css"
import {Button, Divider} from "semantic-ui-react";
import {NavBar} from '../../NavBar/NavBar';
import {SimpleTable, SimpleTableProps} from "../../Inputs/Table/SimpleTable";
import FormModal from "../../Modals/Dialog/FormModal/FormModal";
import React, {useState} from "react";
import {DocumentForm} from "../../Inputs/Forms/DocumentForm/DocumentForm";
import {DocumentTable, DocumentTableProps} from "../../Inputs/Table/DocumentTable";
import {useNavigate} from "react-router-dom";
import {InterviewForm} from "../../Inputs/Forms/InterviewForm/InterviewForm";

export const EmployPage = (props: any) => {
    const nav = useNavigate();
    const names = ["User Name", "Skills Set (Important)", "Interview Score","PosstionFitted"];
    const [values, setValues] = useState([["Jenny Hess", "Python 8/10,React 7/10", "No interview tried","AI"],
        ["Elliot Fu", "Java 7/10,Angular 6/10", "No interview tried","Backend Java"]])
    const data: DocumentTableProps = {
        deleteDocument: (index: number) => {
            const newItems = values.filter((_, i) => i !== index);
            setValues(newItems)
        }, tableColumnNames: names, tableColumnValues: values
    }
    const [open, setOpen] = useState(false)
    const [,] = useState()
    //astea is exemplu de folosire


    const Users: ({ text: string; value: string; key: string } | { text: string; value: string; key: string })[] = [
        {
            key: 'Jenny Hess',
            text: 'Jenny Hess',
            value: 'Jenny Hess',
        },
        {
            key: 'Elliot Fu',
            text: 'Elliot Fu',
            value: 'Elliot Fu',},
    ]
    return (
        <div className={"backGround"}>
            <div className={"pageDiv"}>
                <div className={"title"}>
                    <label className={"titleLabel"}>Employes Page</label>
                    <p className={"bodyTextDocuments"}>All of the employes that fits your description are in the system are listed below.
                        Add your updated versions anytime, and delete the ones that are no longer relevant for a clean
                        search.</p>
                    <FormModal form={<InterviewForm users={Users}/>} modalTitle={"cANDIDATE"} open={open} setOpen={setOpen}
                               style={{fontFamily: "'Comic-Sans', sans-serif", fontSize: "16px"}}/>
                </div>

                <div className={"tableDiv"}>
                    <Button onClick={() => setOpen(true)} className={"activeTitleButton"}>Request Interview!</Button>
                    <DocumentTable props={data}/>
                </div>
            </div>
        </div>
    )
}