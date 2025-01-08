import {Button} from "semantic-ui-react";
import {useEffect, useRef, useState} from "react";


export interface UploadButtonInterface {
    settingFunction:any,
    fileType:string
}
export const UploadButton = (props:UploadButtonInterface) => {

    const [fileBase64,setFileBase64] = useState("")
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        // @ts-ignore
        fileInputRef.current.click();
    };

    useEffect(()=>{
        if(fileBase64 !== "")
            props.settingFunction(fileBase64)
    },[fileBase64])

    const handleFileChange = (event:any) => {
        const file = event.target.files[0];
        if (file) {
            const data = convertToBase64(file)
            console.log(`Selected file: ${file.name}`);
        }
    };

    const convertToBase64 = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setFileBase64(reader.result as string); // Set the base64 string
        };
        reader.onerror = (error) => {
            console.error('Error converting file to base64:', error);
        };
        return ""
    };

    return (
        <div>
            <input
                type="file"
                ref={fileInputRef}
                id="upload"
                hidden
                onChange={handleFileChange}
                accept={props.fileType}
            />
            <Button icon={"upload"}
                    label={
                       <span style={{ backgroundColor:"#C1CEF5", fontFamily:"Poppins, sans-serif", fontSize: "16p", color: "#28304B", paddingTop: "12px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "10px", borderTopRightRadius: "5px", borderBottomRightRadius:"5px"}}>
                             Upload file
                       </ span>
                    }
                    style={{width: "100%",left: "0.2vw", top: "1.5vw", position: "relative", color: "#4260D8"}} onClick={handleButtonClick} primary>
            </Button>
        </div>
    );
}
