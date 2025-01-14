import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import "./JobUploadForm.css"; // Import the CSS for styling

export const JobUploadForm: React.FC<{ onSubmit: (data: JobData) => void }> = ({ onSubmit }) => {
    const [jobTitle, setJobTitle] = useState<string>("");
    const [requiredSkills, setRequiredSkills] = useState<string>("");
    const [salaryRange, setSalaryRange] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const jobData: JobData = { jobTitle, requiredSkills, salaryRange };
        onSubmit(jobData); // Pass the data to the parent component
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
        <Form className="jobUploadForm" onSubmit={handleSubmit}>
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
            <Button type="submit" className="submitButton">Upload Job Listing</Button>
        </Form>
        </div>
        </div>
    );
};

// Define the structure of job data
interface JobData {
    jobTitle: string;
    requiredSkills: string;
    salaryRange: string;
}
