import React, {useState} from 'react';
import UserTable from './tables/UserTable.js'
import AddUserForm from './forms/AddUserForm.js'
import EditUserForm from './forms/EditUserForm.js'

function App() {
  const usersData = [
    {id: 1, name: 'Tania', username: 'floppydiskette', spiritAnimal: "Bear"},
    {id: 2, name: 'Craig', username: 'siliconeidolon', spiritAnimal: "Koala"},
    {id: 3, name: 'Ben', username: 'benisphere', spiritAnimal: "Camel"},
  ]

  const [users, setUsers] = useState(usersData)
  const [editing, setEditing] = useState(false)

  const initialFormState = { id: null, name: '', username: '' }
  const [currentUser, setCurrentUser] = useState(initialFormState)

  const editRow = (user) => {
    setEditing(true)

    setCurrentUser({ id: user.id, name: user.name, username: user.username, spiritAnimal: user.spiritAnimal })
  }

  const addUser = (user) => {
    user.id = users.length + 1
    setUsers([...users, user])
  }

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id))
    setEditing(false)
  }

  const updateUser = (id, updatedUser) => {
    setEditing(false)

    setUsers(users.map((user) => (user.id === id ? updatedUser : user)))
  }

  return (
    <div className="container">
      <h1>Pat's CRUD app with hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <div>
              <h2>Edit user</h2>
              <EditUserForm
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
        <div className="flex-large">
          <h2>View Users</h2>
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
        </div>
      </div>
    </div>
  );
}

export default App;
