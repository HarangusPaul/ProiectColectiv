import {DocumentModal} from "../Models/DocumentModal";
import axios from "axios";

const ipServer = "http://localhost:8080/app/v2/documents/";
export class DocumentService{
    add(document:DocumentModal){
        const token = localStorage.getItem("token")
        if(token !== null){
        return axios.post(ipServer+"add",document,
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token).token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        }
    }
}