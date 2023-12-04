import { useState } from "react";
import Editor from "./Editor/Editor";
import SavedPaths from "./SavedPaths";
import CollapseTitle from "../general_components/CollapseTitle";
import Colorizer from "./Colorizer/Colorizer";
import Graphs from "./Graphs/Graphs";

const ToolBar = () => {
  return (
    <>
      <CollapseTitle title="Saved Paths" forBody="uploads" />
      <div className="collapse" id="uploads">
        <SavedPaths />
      </div>
      <CollapseTitle title="Editor" forBody="editor" />
      <div className="collapse" id="editor">
        <Editor />
      </div>
      <CollapseTitle title="Colorizer" forBody="colorizer" />
      <div className="collapse" id="colorizer">
        <Colorizer />
      </div>
      <CollapseTitle title="Graphs" forBody="graphs" />
      <div className="collapse" id="graphs">
        <Graphs />
      </div>
    </>
  );
};

export default ToolBar;
