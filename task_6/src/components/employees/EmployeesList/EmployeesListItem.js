import React from "react";

function EmployeesListItem({user, clickHandler}) {
  return (
    <li className="EmployeesList__item">
      <span>{user.id}</span>
      <span>{user.first_name.trim()}&nbsp;{user.last_name.trim()}</span>
      <span>
        <button onClick={() => {clickHandler(user.id)}}>delete</button>
      </span>
    </li>
  );
}

export default EmployeesListItem;