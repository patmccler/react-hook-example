import React from 'react'

const UserTable = (props) => {
  const handleDeleteButtonClick = (user) => () => props.deleteUser(user.id)
  const handleEditButtonClick = (user) => () => props.editRow(user)
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Username</th>
          <th>Spirit Animal</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.users.length > 0 ? (
          props.users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.spiritAnimal}</td>
              <td>
                <button
                  onClick={handleEditButtonClick(user)}
                  className="button muted-button"
                >
                  Edit
                </button>
                <button
                  onClick={handleDeleteButtonClick(user)}
                  className="button muted-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>No users</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default UserTable