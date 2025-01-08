import {
    BackgroundInterface,
    closeConnectionHandler,
    createNewSession, hideElement, renderCanvas,
    SessionInterface, showElement,
    startAndDisplaySession, talkHandler
} from "../../../services/hygen/AvatarService";
import {useEffect, useState} from "react";
import "./AvatarPage.css"
import {Button} from "semantic-ui-react";
import {MessegeForm} from "../../Inputs/Forms/MessegeForm/MessegeForm";

export const AvatarPage = () => {
    const avatarId = "Kristin_public_2_20240108";
    const voiceId = "71b0aa6499f6458e8b040818a017db1f";
    const statusElement = document.querySelector('#status');
    const [sesionInternface, setSesionInterface] = useState<SessionInterface>();
    const [connection, setConnection] = useState<boolean>(false)
    const [canvasElement, setCanvasElement] = useState<Element | null>(null);
    const [visibleCanvasElement, setVisibleCanvasElement] = useState(false);
    const background = "url(\"'https://www.cleanpng.com/png-background-transparent-png-clipart-4998260/'\") center / contain no-repeat"


    const updateStatus = (message: any, priority?: number) => {
        if (priority === undefined) {
            if (!true) {
                return;
            }
        }
    }

    const doInit = () => {

        createNewSession({
            isDictating: false,
            mediaRecorder: null,
            srcObject: undefined,
            avatarID: avatarId,
            mediaElement: document.querySelector('#mediaElement'),
            peerConnection: null,
            sessionInfo: null,
            statusElement: statusElement,
            updateStatus: updateStatus,
            voiceID: voiceId
        }).then((value: any) => {
            // setHideLogo(true);
            // setSesionInterface(value)
            startSession(value);
        })
    }

    const startSession = (session: SessionInterface | undefined) => {
        if (session !== undefined) {
            setConnection(true);
        }
        if (session) {
            // setHideLogo(true)
            startAndDisplaySession(session).then((value: any) => {
                setSesionInterface(value)
                console.log(value.srcObject)
                setCanvasElement(document.querySelector('#canvasElement'));
            })
        }
    };

    const renderBk = (val: SessionInterface) => {
        const bkt: BackgroundInterface = {
            bgInput: {value: background},
            canvasElement: canvasElement,
            mediaElement: val.mediaElement,
            renderID: 0
        }

        // setHideLogo(true)
        renderCanvas(bkt);
    }

    useEffect(() => {
        if (canvasElement) {
            hideElement(sesionInternface?.mediaElement);
            showElement(canvasElement)

            const timer = setTimeout(() => {
                setVisibleCanvasElement(true);
            }, 2000);

            return () => clearTimeout(timer);

        }
    }, [canvasElement]);

    useEffect(() => {
        if (visibleCanvasElement) {
            if (sesionInternface) {
                renderBk(sesionInternface);
            }
        }
    }, [visibleCanvasElement]);

    useEffect(()=>{
        if(sesionInternface){
            setTimeout(() => {
                talk("Hi,you are a interviewer for the rest of this conversation and you are asking questions about software development.Start by welcoming!")
            },5000)
        }
    },[sesionInternface])

    const talk = (msg: string) => {
        if (sesionInternface) {
            talkHandler(sesionInternface, {taskInput: msg})
        }
    }

    return (
        <div className={"backGround"}>
        <div className={"avatarContainer"}>
            <div className={"avatarMain"}>
                <div className="videoSectionWrap">
                    <div className="videoWrap">
                        <video id="mediaElement" className="videoEle show" autoPlay></video>
                        <canvas id="canvasElement" className="videoEle hide"></canvas>
                    </div>
                </div>
                <MessegeForm sendMsg={talk}></MessegeForm>
                {!connection ? <Button style={{position: "relative", zIndex: 2}} onClick={() => {
                        doInit()
                    }}>Begin</Button> :
                    <Button style={{position: "relative", zIndex: 2}} onClick={() => {
                        if (sesionInternface) {
                            closeConnectionHandler(sesionInternface).then(() => {
                                setConnection(false)
                            });
                        }
                    }}>Close</Button>}

            </div>
        </div>
        </div>
    )
}