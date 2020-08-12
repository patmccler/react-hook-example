import React, {useState} from 'react';

function UserSelector({selectUser, users, value = false}) {
  const handleChange = e => {
    let newValue = e.target.value
    selectUser(users.find(user => user.id === parseInt(newValue)))
  }

  return(
    <form>
      <select value={value} onChange={handleChange}>
        <option value="false"> -- select an option -- </option>
        {
          users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)
        }
      </select>
    </form>
  )
}

export default UserSelector