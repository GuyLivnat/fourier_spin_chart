import NumberInput from "../../general_components/NumberInput";

const CoeffTableCellEditor = ({
  editNode,
  setEditNode,
  acceptEdit,
  cancelEdit,
}) => {
  return (
    <td>
      <NumberInput
        autoFocus={true}
        number={editNode.value}
        setNumber={(num) => setEditNode({ ...editNode, value: num })}
        accept={acceptEdit}
        cancel={cancelEdit}
        className="text-bg-dark p-0"
      />
    </td>
  );
};

export default CoeffTableCellEditor;
