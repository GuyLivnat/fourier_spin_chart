import { useState } from "react";
import Button from "./Button";
import TextInput from "./TextInput";


const List = ({lst, load, del, delAll, focus, rename}) => {
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
  
return (<>
    <ul className="list-group">
      {lst.toReversed().map(item => <li
        key={item.id} id={item.id}
        className={focus === item.id? "list-group-item active" : "list-group-item"}
        aria-current={focus === item.id? true : null}> 
          <div className="d-flex justify-content-between">
            {item.id == renameId?
              <TextInput text={newName}
                setText={setNewName}
                id="setNewName"
                focus={true}
                accept={saveRename}
                size={30}/>
            : item.name} 
          </div>
          <div>
            <Button  text={item.id == renameId? "save" : "rename"}
              handleClick={item.id == renameId? saveRename : handleRename}
              className={item.id == renameId? "btn btn-success" : "btn btn-secondary"}/>
            {focus != item.id && 
              <Button text={focus === item.id? "loaded" : "load"}
                handleClick={load}
                className={"btn btn-primary"}/>}
            <Button text="delete"
              handleClick={del}
              className={"btn btn-danger float-end"}/>
          </div>
        </li>)}
    </ul>
    <div>
      <Button text="delete all"
        handleClick={delAll}
        className={"btn btn-danger float-end"}/>
    </div>
    
  </>)


}

export default List;