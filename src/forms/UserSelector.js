import React, {useState} from 'react';

function UserSelector({selectUser, users, initial = false}) {

  let [selected, setSelected] = useState(initial)

  const handleChange = e => {
    if(e.target.value !== "false") {
      setSelected(e.target.value)

      selectUser(users.find(user => user.id === parseInt(e.target.value)))
    }

  }

  return(
    <form>
      <select value={selected} onChange={handleChange}>
        <option disabled value="false"> -- select an option -- </option>
        {
          users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)
        }
      </select>
    </form>
  )
}

export default UserSelector