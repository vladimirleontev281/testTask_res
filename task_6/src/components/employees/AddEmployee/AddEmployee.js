import React from "react";
import "./AddEmployee.css";
import AddEmployee__field from './AddEmployee__field';

function AddEmployee({addUser}) {
  const [clearInputs, setClearInputs] = React.useState(false);
  const [addUserFields, setAddUserFields] = React.useState([
    {descrip: 'first name', classes: ['PanelAddEmployee__input'], value: ''},
    {descrip: 'last name', classes: ['PanelAddEmployee__input'], value: ''},
    {descrip: 'email', classes: ['PanelAddEmployee__input'], value: ''},
    {descrip: 'avatar', classes: ['PanelAddEmployee__input'], value: ''},
  ]);

  function changeInfo(ev){
    if (ev) {
      let newAddUserFields = addUserFields;
      newAddUserFields[ev.target.dataset.index].value = ev.target.value;
      setAddUserFields(newAddUserFields);
    }
  }
  
  function submitHendler(ev) {
    ev.preventDefault();
    let newAddUserFields = addUserFields;
    let counter = 0;
    newAddUserFields.forEach(item => {
      if (!item.value) {
        counter++;
        if(!item.classes.includes('error')) item.classes.push('error')
      } else {
        item.classes.length = 1;
      }
    });
    setAddUserFields(newAddUserFields);
    if (!counter) {
      addUser(addUserFields.map(item => {return item.value}));
      setClearInputs(true);
    } 
  }
  

  return (
    <form className="AddEmployee" onSubmit={ev => {submitHendler(ev)}}>
      <h3 className="AddEmployee__header">add amploye</h3>
      <div className="AddEmployee__fields">
        {
          addUserFields.map((item, index) => {
            return <AddEmployee__field  key={index} descrip={item.descrip} index={index}
              classes={item.classes} changeInfo={changeInfo} 
            />
          })
        }
      </div>
      <button type="submit" className="PanelAddEmployee__button">add</button>
    </form>
  );
}

export default AddEmployee;