import { useState } from "react";
import Editor from "./Editor/Editor";
import SavedChains from "./SavedChains";
import CollapseTitle from "../general_components/CollapseTitle";
import Colorizer from "./Colorizer/Colorizer";
import Graphs from "./Graphs/Graphs";
import Filters from "./Filters/Filters";

const ToolBar = () => {
  return (
    <>
      <CollapseTitle title="Saved Chains" forBody="uploads" />
      <div className="collapse" id="uploads">
        <SavedChains />
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
      <CollapseTitle title="Filters (WIP)" forBody="filters" />
      <div className="collapse" id="filters">
        <Filters />
      </div>
    </>
  );
};

export default ToolBar;
