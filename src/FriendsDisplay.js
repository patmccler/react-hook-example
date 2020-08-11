import React, {useState, useCallback} from 'react';
import FriendsTable from './tables/FriendsTable'
import UserSelector from './forms/UserSelector'

function FriendsDisplay({users}) {

  const getFriendableUsers = user => users.filter(u => (u !== user) && !user.friendIds.includes(u.id))
  const getFriends = user => user.friendIds.map(id => users.find(user => user.id === id))

  const [currentUser, setCurrentUser] = useState(users[0])
  const [currentUserFriends, setCurrentUserFriends] = useState(getFriends(currentUser))
  const [friendableUsers, setFriendableUsers] = useState(getFriendableUsers(currentUser))

  const addNewFriend = (newFriend) => {
    currentUser.friendIds.push(newFriend.id)
    newFriend.friendIds.push(currentUser.id)
    setCurrentUserFriends(getFriends(currentUser))
    setFriendableUsers(getFriendableUsers(currentUser))
  }

  // const changeUser = user => {
  //   setCurrentUser(user)
  //   setCurrentUserFriends(getFriends())
  //   setFriendableUsers(getFriendableUsers())
  // }

  const changeUser = useCallback((user) => {
    console.log(user)
    setCurrentUser(user)
    setCurrentUserFriends(getFriends(user))
    setFriendableUsers(getFriendableUsers(user))
    console.log(currentUserFriends)
  })

  // const friendableUsers = useMemo(() => getFriendableUsers(currentUser), [currentUser, currentUser.friendIds.length, getFriendableUsers])
  // const currentUserFriends = useMemo(() => currentUser.friendIds.map(id => users.find(user => user.id === id))
  //                                     ,[currentUser, currentUser.friendIds.length, users]
  //                                   )
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
        <FriendsTable user={currentUser} friends={currentUserFriends}/>
      </div>
    </>
  )
}

export default FriendsDisplay