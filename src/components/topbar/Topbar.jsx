import './topbar.css'
import { useContext } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { AuthContext } from '../../context/AuthContext'
import {useNavigate} from 'react-router-dom'

export default function Topbar() {
  const SF = process.env.REACT_APP_SERVER_FOLDER
  const { user: currentUser } = useContext(AuthContext);
  const navigate = useNavigate()

  return (
    <nav>
      <div className="topbarLeft">
        <span className="logo" onClick={()=>{navigate('/')}}>SocialApp</span>
      </div>

      <div className="topbarCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>

      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink" onClick={() =>{navigate('/')}}>Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <PersonIcon />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <ChatBubbleIcon />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <NotificationsIcon />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <img src={
                  currentUser.profilePicture
                  ? SF + currentUser.profilePicture
                  : SF + "public/assets/person/noAvatar.png"
                 } 
          onClick={()=>{navigate('/profile/'+currentUser.username)}}
          alt="" className="topbarImg" />
      </div>
    </nav>
  )
}
