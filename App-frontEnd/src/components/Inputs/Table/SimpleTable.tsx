
export interface SimpleTableProps{
    tableColumnNames:string[];
    tableColumnValues:Array<string[]>;
}

export const SimpleTable = (props:any) => {
    const data = props.props.tableColumnNames;
    const info = props.props.tableColumnValues;
    return (
        // <table className="ui celled table customTable">
        <table>
            <thead className="tableHead">
            <tr className = "headCell">
                {
                    data!=undefined?data.map((item:any, index:any) => (
                        <th>{data[index]}</th>
                    )):(<div/>)
                }
            </tr>
            </thead>
            <tbody>

            {
                info!=undefined?info.map((item:any, index:any) => (
                    <tr className = "rowCell">
                        {
                            info[index]!=undefined?info[index].map((item1:any, index1:any) => (
                                <td data-label = {data[index1]}>{item1}</td>
                            )):(<div/>)
                        }
                    </tr>
                )):(<div/>)
            }
            {/*<tr>*/}
            {/*    <td data-label="Name">James</td>*/}
            {/*    <td data-label="Age">24</td>*/}
            {/*    <td data-label="Job">Engineer</td>*/}
            {/*</tr>*/}
            {/*<tr>*/}
            {/*    <td data-label="Name">Jill</td>*/}
            {/*    <td data-label="Age">26</td>*/}
            {/*    <td data-label="Job">Engineer</td>*/}
            {/*</tr>*/}
            {/*<tr>*/}
            {/*    <td data-label="Name">Elyse</td>*/}
            {/*    <td data-label="Age">24</td>*/}
            {/*    <td data-label="Job">Designer</td>*/}
            {/*</tr>*/}
            </tbody>
        </table>
    )
}