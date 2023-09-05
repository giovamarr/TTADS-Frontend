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
          setErrorPage("No se pudieron cargar los usuarios")
        });
    }, []);

  return (
    <div>
        <h3 className='text-center mt-2 mb-3 ms-1'>Usuarios</h3>
        {errorPage && <Alert variant="danger">{errorPage}</Alert>}
        <Table striped bordered hover >
            <thead>
                <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                </tr>
            </thead>
      <tbody>
      {users.map((user) =>(

        <tr>
          <td>{user.name}</td>
          <td>{user.email}</td>
          { user.role === 'admin' ?  <td>Admin</td> :  <td>Cliente</td>}
        </tr>
      ))}
      </tbody>
    </Table>


     
    </div>
  )
}

export default Users;