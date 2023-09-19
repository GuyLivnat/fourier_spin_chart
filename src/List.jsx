import { useState } from "react";
import Button from "./Button";
import TextInput from "./TextInput";
import UploadButton from "./UploadButton";


const List = ({lst, load, del, delAll, focus, rename, upload, uploadText, resetDefaults}) => {
  const [renameId, setRenameId] = useState(null)
  const [newName, setNewName] = useState("")

  const handleRename = (e) => {
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
      <div className="row text-bg-info border-bottom">
        <div className="col mx-2 mt-2">
          <UploadButton
            handleFile={upload}
            text={uploadText}/>
        </div>
        <div className="col mx-2">
          <Button
            text="defaults"
            handleClick={resetDefaults}
            className={"btn btn-outline-danger my-2"}/>
        </div>
        <div className="col mx-2">
          <Button
            text="delete all"
            handleClick={delAll}
            className={"btn btn-outline-danger my-2"}/>
        </div>
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
          className={item.id === focus? "list-group-item text-bg-secondary" : "list-group-item text-bg-dark"}
          aria-current={focus === item.id? true : null}
          onBlur={e => { //cancel if unfocused
            (e.relatedTarget === null || ('id' in e.relatedTarget && (e.relatedTarget.id !== "saveButton" && e.relatedTarget.id !== "setNewName"))) && cancelRename()
          }}> 
            <div className="d-flex justify-content-between mb-2">
              {item.id === renameId?
                <TextInput
                  text={newName}
                  setText={setNewName}
                  id="setNewName"
                  focus={true}
                  accept={saveRename}
                  cancel={cancelRename}/>
                : 
                <div onDoubleClick={handleRename}>
                  {item.name}
                </div>} 
            </div>
            <div>
              <Button
                id={item.id === renameId? "saveButton" : null}
                text={item.id === renameId? "save" : "rename"}
                handleClick={item.id === renameId? saveRename : handleRename}
                className={"btn btn-outline-primary mb-1 me-2 float-start"}/>
              {focus !== item.id && 
                <Button
                  text={"load"}
                  handleClick={load}
                  className={"btn btn-outline-primary mb-1 me-2 float-start"}/>}
              <Button
                text="delete"
                handleClick={del}
                className={"btn btn-outline-danger float-end mb-1"}/>
            </div>
          </li>)}
        </ul>
      </div>
    </div>
  </>)


}

export default List;