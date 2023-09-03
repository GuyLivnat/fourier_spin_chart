import { useState } from "react";
import Button from "./Button";
import TextInput from "./TextInput";


const List = ({lst, load, del, delAll, focus, rename}) => {
  const [renameId, setRenameId] = useState(null)
  const [newName, setNewName] = useState("")

  const handleRename = (e) => {
    const element = e.target.parentElement;
    const text = element.childNodes[0].wholeText;
    setRenameId(element.id);
    setNewName(text);
  }

  const saveRename = () => {
    rename(renameId, newName);
    setRenameId(null);
  }
  
return (<>
    <ul>
      {lst.toReversed().map(item => <li
        style={focus === item.id?{backgroundColor: "blue"}:{backgroundColor: "black"}}
        key={item.id} id={item.id}> 
        {item.id == renameId? <TextInput text={newName} setText={setNewName} id="setNewName" focus={true} accept={saveRename}/> : item.name} 
        <Button text="load" handleClick={load}/>
        <Button text="delete" handleClick={del}/>
        <Button  text={item.id == renameId? "save" : "rename"} handleClick={item.id == renameId? saveRename : handleRename}/>
        </li>)}
    </ul>
    <Button text="delete all" handleClick={delAll}/>
  </>)


}

export default List;