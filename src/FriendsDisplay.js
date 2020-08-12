import React, {useState, useEffect, useCallback, useMemo} from 'react';
import FriendsTable from './tables/FriendsTable'
import UserSelector from './forms/UserSelector'

function FriendsDisplay({updateUser, users}) {
  const [currentUserId, setCurrentUserId] = useState(users[0].id)
  const getCurrentUser = () => {
    let user = users.find(user => user.id === currentUserId)
    if(!user && currentUserId !== 0) {
      user = users[0]
      setCurrentUserId(user.id)
    }
    return user
  }

  const getFriendableUsers = () => users.filter(u => (u.id !== currentUserId) && !getCurrentUser()?.friendIds.includes(u.id))
  const getFriends = () => getCurrentUser()?.friendIds.map(id => users.find(user => user.id === id))

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
    if(user)
      setCurrentUserId(user.id)
    else
      setCurrentUserId(0)
  }

  let currentUserFriends = getFriends()
  let friendableUsers = getFriendableUsers() || []
  let currentUser = getCurrentUser()

  return (
    <>
      <div className="flex-row">
        <div className="flex-large">
          <h2>Friends</h2>
          Current user:
          <UserSelector selectUser={changeUser} users={users} value={currentUserId}/>
        </div>
        <div className="flex-large">
          <h3>New Friends</h3>
          {(currentUserId > 0) ?
            (
              <>
              Choose a new friend for {currentUser.name}
              <UserSelector selectUser={addNewFriend} users={friendableUsers} initial={false} />
              </>
            ) : (
              "Choose a User to Give them new friends"
            )
          }
        </div>
      </div>
      <div className="flex-row">
        {(currentUserId > 0)
        ? <FriendsTable user={currentUser} friends={currentUserFriends} removeFriendship={removeFriendship}/>
        : <div>No User Selected</div>
        }
      </div>
    </>
  )
}

export default FriendsDisplay