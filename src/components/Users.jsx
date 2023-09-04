import { useEffect, useState } from 'react'
import { Alert, Table } from "react-bootstrap"
import { loadUsers } from '../actions/user.js';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [errorPage, setErrorPage] = useState("")
    
    useEffect(() => {
        loadUsers()
        .then((data) => {
            setUsers(data);
        })
        .catch((e) => {
          setErrorPage("No se pudieron cargar las ventas")
        });
    }, []);

  return (
    <div>
        {errorPage && <Alert variant="danger">{errorPage}</Alert>}
        <h3>Usuarios</h3>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                </tr>
            </thead>
      {users.map((user) =>(
      <tbody>

        <tr>
          <td>{user.name}</td>
          <td>{user.email}</td>
          { user.role === 'admin' ?  <td>Admin</td> :  <td>Cliente</td>}
        </tr>
      </tbody>
      ))}
    </Table>


     
    </div>
  )
}

export default Users;