import React, {useEffect} from "react";
import "./EmployeesPage.css";
import AddEmployee from './AddEmployee/AddEmployee';
import EmployeesList from './EmployeesList/EmployeesList';

function EmployeesPage() {
  let [users, setUsers] = React.useState([]);
  let [lastID, setLastID] = React.useState(0);

  useEffect(() => {
    fetch('https://reqres.in/api/users?per_page=12')
      .then(response => response.json())
      .then(response => {
        setUsers(response.data);
        setLastID(response.data.length);
      });
  }, []);

  function removeUser(id) {
    setUsers(users.filter(item => item.id != id));
  }

  function addUser(values) {
    setUsers(users.concat([{
      first_name: values[0],
      last_name: values[1],
      email: values[2],
      avatar: values[3],
      id: lastID + 1
    }]));
    setLastID(lastID + 1);
  }

  return (
    <div className="EmployeesPage">
      <AddEmployee addUser={addUser} />
      <EmployeesList users={users} remover={removeUser} />
    </div>
  );
}

export default EmployeesPage;