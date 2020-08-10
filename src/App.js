import React, {useState} from 'react';
import UserTable from './tables/UserTable'

function App() {
  const usersData = [
    {id: 1, name: 'Tania', username: 'floppydiskette'},
    {id: 2, name: 'Craig', username: 'siliconeidolon'},
    {id: 3, name: 'Ben', username: 'benisphere'},
  ]

  const [users, setUsers] = useState(usersData)

  return (
    <div className="container">
      <h1>Pat's CRUD app with hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          <h2>Add User</h2>
        </div>
        <div className="flex-large">
          <h2>View Users</h2>
          <UserTable users={users} />
        </div>
      </div>
    </div>
  );
}

export default App;
