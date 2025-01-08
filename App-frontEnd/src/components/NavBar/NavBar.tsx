import {Icon, Menu, MenuItem} from "semantic-ui-react";
import {useNavigate} from "react-router-dom";
import './NavBar.css'
import {useEffect, useState} from "react";

export const NavBar = () =>{
    const navigate = useNavigate();
    const [type,setType] = useState(false)

    const navigateTo = (navDest:string) => {
        navigate(navDest);
    }

    useEffect(() => {
        const typeS = localStorage.getItem("accountType") === "company"
        setType(typeS);
    },[])

    return (
        <Menu icon='labeled' inverted vertical className={"navbar"}>

            <MenuItem
                name='Home Page'
                active={false}
                onClick={() => { navigateTo("/") }}
            >
                <Icon name='home' />
                Home Page
            </MenuItem>



            {type?<MenuItem
                name='Page 2'
                active={false}
                onClick={() => { navigateTo("/CompanyDocumentPage") }}
            >
                <Icon name='file archive outline' />
                CompanyDocumentPage
            </MenuItem>:<MenuItem
                name='Page 2'
                active={false}
                onClick={() => { navigateTo("/DocumentPage") }}
            >
                <Icon name='file archive outline' />
                DocumentPage
            </MenuItem>}

            {!type?<MenuItem
                name='Page 3'
                active={false}
                onClick={() => { navigateTo("/Companys") }}
            >
                <Icon name='file archive outline' />
                Companys
            </MenuItem>:<MenuItem
                name='Page 3'
                active={false}
                onClick={() => { navigateTo("/EmployPage") }}
            >
                <Icon name='file archive outline' />
                EmployPage
            </MenuItem>}

            <MenuItem
                name='Interview'
                active={false}
                onClick={() => { navigateTo("/Interview") }}
            >
                <Icon name='user' />
                {! type?"Interview":"Manage Interview"}
            </MenuItem>


            <MenuItem className={"signOut"}
                name='Sign out'
                active={false}
                onClick={() => { localStorage.removeItem("token");window.location.reload(); }}
            >
                <Icon name='power off' />
                Sign out
            </MenuItem>
        </Menu>
    )
}