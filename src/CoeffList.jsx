import { useState } from "react";
import Button from "./Button";
import TextInput from "./TextInput";

const List = ({setCoeff, coeff, setSaved, saved, stop, setActiveName}) => {

    let [name, setName] = useState("")
    let [coeffList, setCoeffList] = useState(() => {
      const keys = Object.keys(localStorage);
      let localCoeff = [];
      for(let i=0; i < keys.length; i++) {
        let key = keys[i];
        let obj = JSON.parse(localStorage.getItem(key));
        localCoeff.push({id:key, name:obj.name});
      }
      return localCoeff;
    })

  const saveCoeff = () => {
    if(coeff.length) {
      const obj = JSON.stringify({name: name, coeff: coeff});
      const id = crypto.randomUUID();
      localStorage.setItem(id, obj);
      setCoeffList([...coeffList, {name:name, id:id}])
      setSaved(true)
      setName("")
    }
  }
  
  const loadCoeff = (e) => {
    const id = e.target.parentElement.id
    const obj = JSON.parse(localStorage.getItem(id));
    setCoeff(obj.coeff);
    stop();
    setActiveName(obj.name);
  }

  const deleteCoeff = (e) => {
    const id = e.target.parentElement.id
    localStorage.removeItem(id)
    setCoeffList(coeffList.filter(item => item.id != id))
  }

  const deleteAll = () => {
    setCoeffList([])
    localStorage.clear()
  }

return (<>
    <div>
      <TextInput setText={setName} defaultText="Name your image" text={name}/>
      <Button text="save" handleClick={saveCoeff} isDisabled={!(coeff.length && !saved && name.length)}/>
    </div>
      <ul>
        {coeffList.map(item => <li
          key={item.id} id={item.id}>{item.name} 
          <Button text="load" handleClick={loadCoeff}/>
          <Button text="delete" handleClick={deleteCoeff}/>
          </li>)}
    </ul>
    <Button text="delete all" handleClick={deleteAll}/>
  </>)


}

export default List;