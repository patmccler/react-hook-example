import React, {useState} from 'react';
import FriendsTable from './tables/FriendsTable'
import UserSelector from './forms/UserSelector'

function FriendsDisplay({users, getFriends, newFriendForCurrent}) {

  const [currentUser, setCurrentUser] = useState(users[0])
  const friendableUsers = () => users.filter(u => (u !== currentUser) && !currentUser.friendIds.includes(u.id))

  return (
    <>
      <div className="flex-row">
        <div className="flex-large">
          <h2>Friends</h2>
            Current user:
          <UserSelector selectUser={setCurrentUser} users={users} initial={users[0].id}/>
        </div>
        <div className="flex-large">
          <h3>New Friends</h3>
          Choose a new friend for {currentUser.name}
          <UserSelector selectUser={newFriendForCurrent(currentUser)} users={friendableUsers()} />
        </div>
      </div>
      <div className="flex-row">
        <FriendsTable user={currentUser} friends={getFriends(currentUser)}/>
      </div>
    </>
  )
}

export default FriendsDisplay