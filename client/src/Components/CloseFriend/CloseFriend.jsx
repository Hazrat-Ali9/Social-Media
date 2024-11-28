import "./CloseFriend.css"

export default function CloseFriend({user}) {
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
    <img src={PF+user.profilePicture} className="sidebarFriendImg" />
    <span className="sidebarFriendName">{user.username}</span>
    </li>
  )
}

// Close Friend 


