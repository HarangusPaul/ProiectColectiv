import React, { useState } from "react";
import "./CompanyDocumentPage.css";
import { Button, Divider } from "semantic-ui-react";
import FormModal from "../../Modals/Dialog/FormModal/FormModal";
import { DocumentForm } from "../../Inputs/Forms/DocumentForm/DocumentForm";
import { JobUploadForm } from "../../Inputs/Forms/JobUploadForm/JobUploadForm";
import { DocumentTable, DocumentTableProps } from "../../Inputs/Table/DocumentTable";
import { SimpleTable, SimpleTableProps } from "../../Inputs/Table/SimpleTable";
import FormModalStyle from "../../Modals/Dialog/FormModal/FormModalStyle";

export interface JobData {
    jobTitle: string;
    requiredSkills: string;
    salaryRange: string;
    description: string;
}

export const CompanyDocumentPage: React.FC = () => {
    const documentNames = ["Position", "Skills", "Points of Experience"];
    const [documentValues, setDocumentValues] = useState<string[][]>([
        ["SoftDev", "Python, React", "10/10"]
    ]);

    const jobNames = ["Job Title", "Required Skills", "Salary Range"];
    const [jobValues, setJobValues] = useState<string[][]>([
        ["Software Engineer", "JavaScript, Node.js", "$70,000 - $90,000"]
    ]);

    const data: DocumentTableProps = {
        deleteDocument: (index: number) => {
            const newItems = documentValues.filter((_, i) => i !== index);
            setDocumentValues(newItems);
        },
        tableColumnNames: documentNames,
        tableColumnValues: documentValues,
    };

    const [openDocumentModal, setOpenDocumentModal] = useState<boolean>(false);
    const [openJobModal, setOpenJobModal] = useState<boolean>(false);




    return (
        <div className={"backGround"}>
        <div className={"pageDiv"}>
            <div className={"title"}>
                <label className={"titleLabel"}>Company Documents</label>
                <p className={"bodyTextDocuments"}>
                    Upload job listings and view potential candidates that match your requirements.
                </p>
                <FormModal
                    form={<DocumentForm  setFileForward={(a:string)=>{console.log(1)}} setDocumentName={(a:string)=>{console.log(1)}}/>}
                    modalTitle={"Upload Document"}
                    open={openDocumentModal}
                    setOpen={setOpenDocumentModal}
                    style={{ fontFamily: "'Comic-Sans', sans-serif", fontSize: "16px" }}
                />
                <FormModalStyle
                    form={<JobUploadForm />} // Pass handleJobSubmit
                    modalTitle={"Upload Job Listing"}
                    open={openJobModal}
                    setOpen={setOpenJobModal}
                    style={{
                        width: "25vw",
                        height: "70vh",
                        borderRadius: "10px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        padding: "5px",
                        backgroundColor: "#28304B",
                        fontFamily: "'Comic-Sans', sans-serif",
                        fontSize: "16px",
                        overflow:"scroll"
                    }}
                />
            </div>

            <div className={"tableDiv"}>
                <Button onClick={() => setOpenDocumentModal(true)} className={"activeTitleButton"}>
                    Upload Document CV
                </Button>
                <Button onClick={() => setOpenJobModal(true)} className={"activeTitleButton"}>
                    Upload Job Listing
                </Button>

                <Divider />

                <h3 className="tableTitle">Uploaded Documents</h3>
                <DocumentTable props={data} />

                <h3 className="tableTitle">Matching Users</h3>
                <SimpleTable props={{
                    tableColumnNames: jobNames,
                    tableColumnValues: jobValues
                }} />
            </div>
        </div>
        </div>
    );
};
