import { useState, useContext } from "react";
import Button from "./Button";
import TextInput from "./TextInput";
import UploadButton from "./UploadButton";
import CloseButton from "./CloseButton";
import { TooltipContext } from "./TooltipWithContext";


const List = ({lst, load, del, delAll, focus, rename, upload, resetDefaults, uploadTooltip}) => {
  const {tooltipIn, tooltipOut} = useContext(TooltipContext);
  const [renameId, setRenameId] = useState(null)
  const [newName, setNewName] = useState("")

  const handleRename = (e) => {
    e.stopPropagation();
    const element = e.target.parentElement.parentElement;
    const text =  element.childNodes[0].childNodes[0].childNodes[0].wholeText;
    setRenameId(element.id);
    setNewName(text);
  }

  const saveRename = () => {
    rename(renameId, newName);
    setRenameId(null);
  }

  const cancelRename = () => {
    setRenameId(null)
  }

  return (<>
    <div className="rounded border overflow-hidden">
      <div className=" row text-bg-info border-bottom justify-content-between mx-0">
          <UploadButton
            handleFile={upload}
            text={"upload"}
            className='btn btn-outline-primary m-1 col'
            dataTooltip={uploadTooltip}
            onMouseEnter={tooltipIn}
            onMouseLeave={tooltipOut}/>
          <Button
            text="defaults"
            handleClick={resetDefaults}
            className="btn btn-outline-primary m-1 col"
            dataTooltip="reapplies the missing defaults"
            onMouseEnter={tooltipIn}
            onMouseLeave={tooltipOut}/>
          <Button
            text="del all"
            handleClick={delAll}
            className="btn btn-outline-danger m-1 col"
            dataTooltip="removes all saved paths from local storage"
            onMouseEnter={tooltipIn}
            onMouseLeave={tooltipOut}/>
      </div>
      <div
        style={{
          boxSizing:"content-box",
          maxHeight: "20rem",
          overflowY:"auto",
          overflowX:"clip"}}>
        <ul
          className="list-group list-group-flush">
          {lst.toReversed().map((item, i) =>
          <li
          key={item.id}
          id={item.id}
          onClick={load}
          className={item.id === focus? "list-group-item text-bg-secondary" : "list-group-item text-bg-dark"}
          aria-current={focus === item.id? true : null}
          onBlur={e => { //cancel if unfocused
            (e.relatedTarget === null || ('id' in e.relatedTarget && (e.relatedTarget.id !== "setNewName"))) && saveRename()
          }}> 
            <div
              className="d-flex justify-content-between">
              {item.id === renameId?
                <TextInput
                  text={newName}
                  setText={setNewName}
                  id="setNewName"
                  focus={true}
                  accept={saveRename}
                  cancel={cancelRename}/>
                : 
                <div
                  style={{paddingLeft:"1px", fontStyle: item.default? "italic":"normal", overflow:"clip", marginTop:"3px"}}
                  onDoubleClick={handleRename}>
                  {item.name}
                </div>} 
                <CloseButton
                handleClick={del}/>
            </div>
          </li>)}
        </ul>
      </div>
    </div>
  </>)


}

export default List;