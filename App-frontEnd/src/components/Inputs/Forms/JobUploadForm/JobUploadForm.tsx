import React, {useEffect, useState} from "react";
import {Button, Form, TextArea} from "semantic-ui-react";
import "./JobUploadForm.css";
import {JobData} from "../../../pages/DocumentPage/CompanyDocumentPage"; // Import the CSS for styling

export const JobUploadForm = (props:any) => {
    const [jobTitle, setJobTitle] = useState<string>("");
    const [requiredSkills, setRequiredSkills] = useState<string>("");
    const [salaryRange, setSalaryRange] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const jobData: JobData = {jobTitle, requiredSkills, salaryRange,description};
        console.log(jobData)
         // Pass the data to the parent component
        clearForm(); // Clear the form after submission
    };

    const clearForm = () => {
        setJobTitle("");
        setRequiredSkills("");
        setSalaryRange("");
    };

    return (
        <div className="parentBigDiv">
            <div className="bigDiv">
                <Form className="jobUploadForm">
                    <Form.Field>
                        <label className="formLabel">Job Title</label>
                        <input
                            type="text"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            placeholder="Enter job title"
                            required
                        />
                    </Form.Field>
                    <Form.Field>
                        <label className="formLabel">Required Skills</label>
                        <input
                            type="text"
                            value={requiredSkills}
                            onChange={(e) => setRequiredSkills(e.target.value)}
                            placeholder="Enter required skills"
                            required
                        />
                    </Form.Field>
                    <Form.Field>
                        <label className="formLabel">Salary Range</label>
                        <input
                            type="text"
                            value={salaryRange}
                            onChange={(e) => setSalaryRange(e.target.value)}
                            placeholder="Enter salary range"
                            required
                        />
                    </Form.Field>
                    <Form.Field>
                        <label className="formLabel">Description</label>
                        <TextArea
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter salary range"
                            required
                        />
                    </Form.Field>
                    <Form.Field>
                        <Button onClick={handleSubmit}>Submit!</Button>
                    </Form.Field>
                    {/*<Button type="submit" className="submitButton">Upload Job Listing</Button>*/}
                </Form>
            </div>
        </div>
    );
};