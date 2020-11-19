import React from "react";
import "./EmployeesList.css";
import EmployeesListItem from './EmployeesListItem';

function EmployeesList(props) {
  return (
    <ul className="EmployeesList">
      {
        props.users.length ? 
          props.users.map((user, index) => {
            return <EmployeesListItem user={user} key={index} clickHandler={props.remover} />
          }) : 
          <p>No users</p>
      }
    </ul>
  );
}

export default EmployeesList;