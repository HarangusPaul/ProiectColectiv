import React, {useEffect, useState} from "react";
import {Button, Form, TextArea} from "semantic-ui-react";
import "./JobUploadForm.css";
import {JobData} from "../../../pages/DocumentPage/CompanyDocumentPage";
import axios from "axios";
import {UserData} from "../../../pages/DocumentPage/DocumentPage"; // Import the CSS for styling

export interface JobsData{
    currentJobs:string[][]
}

export const JobUploadForm = (jobs:JobsData) => {
    const [jobTitle, setJobTitle] = useState<string>("");
    const [requiredSkills, setRequiredSkills] = useState<string>("");
    const [salaryRange, setSalaryRange] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const getCurrentDate = (): string => {
        const today = new Date();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(today.getDate()).padStart(2, '0');
        const year = today.getFullYear();

        return `${month}/${day}/${year}`;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        jobs.currentJobs.push([jobTitle,requiredSkills,salaryRange,description])
        console.log(jobs.currentJobs)
        const user: UserData = {
            base64: "",
            data: JSON.stringify(jobs.currentJobs),
            date: getCurrentDate(),
            emailUser: "paulharangus@gmail.com",
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
            })
        }
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