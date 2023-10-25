import CloseButton from "../../general_components/CloseButton";
import AngleIcon from "../../../assets/icons/AngleIcon";
import RadiusIcon from "../../../assets/icons/RadiusIcon";
import { useContext } from "react";
import { TooltipContext } from "../../general_components/TooltipWithContext";
import CoeffTableAdder from "./CoeffTableAdder";


const CoeffTable = ({lst, del, angle, setAngle, radius, setRadius, pushCoeff}) => {
    const tableItems = [];
    const {tooltipIn, tooltipOut} = useContext(TooltipContext);

    for (let i=2; i<lst.length;) {
        tableItems.push(
            <tr key={i} id={i}>
                <td
                    data-tooltip={lst[i]}
                    onMouseEnter={tooltipIn}
                    onMouseLeave={tooltipOut}
                >
                    {(lst[i++]).toFixed(1)}
                </td>
                <td
                    data-tooltip={lst[i]}
                    onMouseEnter={tooltipIn}
                    onMouseLeave={tooltipOut}
                >
                    {(lst[i++]).toFixed(2)}
                </td>
                <td>
                    <CloseButton handleClick={del}
                        className='me-2'/>
                </td>
            </tr>)
    }

    return (<>
            <table className="table table-sm table-dark table-striped table-hover mb-1" 
                onWheel={tooltipOut}>
                <thead style={{position:'sticky', insetBlockStart:0}}>
                    <tr>
                        <th scope="col">Radius <RadiusIcon/></th>
                        <th scope="col">Angle <AngleIcon/></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {tableItems}
                </tbody>
                <tfoot style={{position:'sticky', insetBlockEnd:0}}>
                <CoeffTableAdder
                        {... {radius, setRadius, angle, setAngle, pushCoeff}}/>
                </tfoot>
            </table>
        </>)
};

export default CoeffTable;