import { useState } from "react";
import Button from "./Button";
import TextInput from "./TextInput";

const List = ({lst, load, del, delAll, focus}) => {
  
return (<>
    <ul>
      {lst.toReversed().map(item => <li
        style={focus === item.id?{backgroundColor: "blue"}:{backgroundColor: "black"}}
        key={item.id} id={item.id}>{item.name} 
        <Button text="load" handleClick={load}/>
        <Button text="delete" handleClick={del}/>
        </li>)}
    </ul>
    <Button text="delete all" handleClick={delAll}/>
  </>)


}

export default List;