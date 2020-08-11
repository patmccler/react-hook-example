import React from 'react'

const FriendsTable = (props) => {
  const handleDeleteButtonClick = (user) => () => props.deleteFriend(user.id)
  return (
    <table>
      <thead>
        <tr>
          <th>Friend ID</th>
          <th>Name</th>
          <th>Username</th>
          <th>Spirit Animal</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.friends.length > 0 ? (
          props.friends.map(friend => (
            <tr key={friend.id}>
              <td>{friend.id}</td>
              <td>{friend.name}</td>
              <td>{friend.username}</td>
              <td>{friend.spiritAnimal}</td>
              <td>
                <button
                  onClick={handleDeleteButtonClick(friend)}
                  className="button muted-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>No Friends. How sad.</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default FriendsTable