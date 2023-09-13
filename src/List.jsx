import { useState } from "react";
import Button from "./Button";
import TextInput from "./TextInput";
import UploadButton from "./UploadButton";


const List = ({lst, load, del, delAll, focus, rename, upload, uploadText}) => {
  const [renameId, setRenameId] = useState(null)
  const [newName, setNewName] = useState("")

  const handleRename = (e) => {
    const element = e.target.parentElement.parentElement;
    const text = element.childNodes[0].childNodes[0].wholeText;
    setRenameId(element.id);
    setNewName(text);
  }

  const saveRename = () => {
    rename(renameId, newName);
    setRenameId(null);
  }

  const itemClassName = (id, i) => {
    let name = "list-group-item border-end-0 border-start-0 ";
    if (i===0) name += "border-top-0 ";
    if (i===lst.length-1) name += "border-bottom-0 ";
    if (id===focus) {
      name += "active text-bg-secondary"
    } else {
      name += "text-bg-dark"}
    return name;
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
          <Button text="delete all"
            handleClick={delAll}
            className={"btn btn-outline-danger my-2 float-end"}/>
        </div>
      </div>
      <div className=""
        style={{
          boxSizing:"content-box",
          maxHeight: "20rem",
          overflowY:"auto",
          overflowX:"clip"}}>
        <ul className="list-group list-group-flush">
          {lst.toReversed().map((item, i) =>
          <li
          key={item.id}
          id={item.id}
          className={itemClassName(item.id, i)}
          aria-current={focus === item.id? true : null}> 
            <div className="d-flex justify-content-between mb-2">
              {item.id == renameId?
                <TextInput text={newName}
                  setText={setNewName}
                  id="setNewName"
                  focus={true}
                  accept={saveRename}/>
              : item.name} 
            </div>
            <div>
              <Button  text={item.id == renameId? "save" : "rename"}
                handleClick={item.id == renameId? saveRename : handleRename}
                className={item.id == renameId? "btn btn-outline-success mb-1 me-4 float-start" : "btn btn-outline-primary mb-1 me-2 float-start"}/>
              {focus !== item.id && 
                <Button text={focus === item.id? "loaded" : "load"}
                  handleClick={load}
                  className={"btn btn-outline-primary mb-1 me-1 float-start"}/>}
              <Button text="delete"
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