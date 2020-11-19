import React from "react";

function AddEmployee__field({descrip, classes, index, changeInfo}) {
  const [value, setValue] = React.useState('');
  let addClasses = classes.join(' ');
  return (
    <label className="PanelAddEmployee__field">
      <span className="PanelAddEmployee__descrip">{ descrip }</span>
      <input  className={ addClasses }
              value={value}
              data-index={index}
              onChange={ev => {setValue(ev.target.value); changeInfo(ev)}}
      />
    </label>
  );
}

export default AddEmployee__field;