import "./TabelPage.css"
import {Divider} from "semantic-ui-react";
import {SimpleTable, SimpleTableProps} from "../../Inputs/Table/SimpleTable";

export const TablePage = (props:any) => {
    const names = ["Company","Skills needed","Probability of success"];
    const values = [["The Fist company","Close you will get the remaining points by participating in their interview","Medium"]]
    const data:SimpleTableProps = {tableColumnNames: names, tableColumnValues:values}
    //astea is exemplu de folosire

    return (
        <div className={"pageDiv"}>

            <div className={"title"}>
                {/*<label className={"titleLabel"}> {props.pageName}</label>*/}
                <label className={"titleLabel"}>Jobs for you:</label>
            </div>

            <Divider className={"divider"} />

            <div className={"tableDiv"}>
                <SimpleTable props={data}/>
            </div>
        </div>
    )
}