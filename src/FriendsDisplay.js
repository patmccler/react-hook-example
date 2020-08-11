import React, {useState, useEffect, useCallback} from 'react';
import FriendsTable from './tables/FriendsTable'
import UserSelector from './forms/UserSelector'

function FriendsDisplay({users}) {

  const getFriendableUsers = user => users.filter(u => (u.id !== user.id) && !user.friendIds.includes(u.id))
  const getFriends = user => user.friendIds.map(id => users.find(user => user.id === id))

  const [currentUser, setCurrentUser] = useState({...users[0]})
  // const [currentUserFriends, setCurrentUserFriends] = useState(getFriends(currentUser))
  // const [friendableUsers, setFriendableUsers] = useState(getFriendableUsers(currentUser))

  // const syncFriendData = useCallback((user = currentUser) => {
  //     console.log(user)
  //     // setCurrentUserFriends(getFriends(user))
  //     // setFriendableUsers(getFriendableUsers(user))
  //   }, [currentUser,getFriendableUsers,getFriends, users]
  // )

  const addNewFriend = useCallback((newFriend) => {
    currentUser.friendIds.push(newFriend.id)
    newFriend.friendIds.push(currentUser.id)
    setCurrentUser({...currentUser})
  }, [currentUser])

  const removeFriendship = useCallback((friendUser) => {
    currentUser.friendIds.filter(id => id !== friendUser.id)
    friendUser.friendIds.filter(id => id !== currentUser.id)
    setCurrentUser({...currentUser})
  }, [currentUser])

  const changeUser = useCallback((user) => {
    setCurrentUser(Object.assign({}, user))
  }, [])

  const currentUserFriends = getFriends(currentUser)
  const friendableUsers = getFriendableUsers(currentUser)

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