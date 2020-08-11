import React, {useState} from 'react';
import FriendsTable from './tables/FriendsTable'
import UserSelector from './forms/UserSelector'

function FriendsDisplay({users, getFriends}) {

  const [currentUser, setCurrentUser] = useState(users[0])

  return (
    <div className="flex-large">
      <h2>Friends</h2>
        Current user:
      <UserSelector selectUser={setCurrentUser} users={users} />
      <FriendsTable friends={getFriends(currentUser)}/>
    </div>
  )
}

export default FriendsDisplay