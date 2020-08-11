import React, {useState, useEffect, useCallback, useMemo} from 'react';
import FriendsTable from './tables/FriendsTable'
import UserSelector from './forms/UserSelector'

function FriendsDisplay({updateUser, users}) {
  const [currentUserId, setCurrentUserId] = useState(users[0].id)
  const getCurrentUser = () => users.find(user => user.id === currentUserId)

  const getFriendableUsers = () => users.filter(u => (u.id !== currentUserId) && !getCurrentUser().friendIds.includes(u.id))
  const getFriends = () => getCurrentUser().friendIds.map(id => users.find(user => user.id === id))

  const addNewFriend = (newFriend) => {
    let currentUser = getCurrentUser()
    let updatedCurrentUser = {...currentUser, friendIds: [...currentUser.friendIds, newFriend.id]}
    updateUser(currentUserId, updatedCurrentUser)
  }

  const removeFriendship = (friendUser) => {
    let currentUser = getCurrentUser()
    currentUser.friendIds = currentUser.friendIds.filter(id => id !== friendUser.id)
    updateUser(currentUserId, currentUser)
  }

  const changeUser = (user) => {
    setCurrentUserId(user.id)
  }

  const currentUserFriends = getFriends()
  const friendableUsers = getFriendableUsers()
  const currentUser = getCurrentUser()

  return (
    <>
      <div className="flex-row">
        <div className="flex-large">
          <h2>Friends</h2>
          Current user:
          <UserSelector selectUser={changeUser} users={users} initial={users[0].id}/>
        </div>
        <div className="flex-large">
          <h3>New Friends</h3>
          Choose a new friend for {currentUser.name}
          <UserSelector selectUser={addNewFriend} users={friendableUsers} initial={false} />
        </div>
      </div>
      <div className="flex-row">
        <FriendsTable user={currentUser} friends={currentUserFriends} removeFriendship={removeFriendship}/>
      </div>
    </>
  )
}

export default FriendsDisplay