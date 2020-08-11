import React, {useState} from 'react';

function UserSelector({selectUser, users}) {

  let [selected, setSelected] = useState(false)

  const handleChange = e => {
    setSelected(e.target.value)

    selectUser(users.find(user => user.id === parseInt(e.target.value)))
  }

  return(
    <form>
      View the friends of:
      <select value={selected} onChange={handleChange}>
          {
            users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)
          }
      </select>
    </form>
  )
}

export default UserSelector