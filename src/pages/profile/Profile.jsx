import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Timeline from '../../components/timeline/Timeline'
import Rightbar from '../../components/rightbar/Rightbar'
import './profile.css'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function Profile() {
  const [user, setUser] = useState({})
  const { username } = useParams()
  const SF = process.env.REACT_APP_SERVER_FOLDER

  useEffect(()=>{
    const getUser = async() =>{
      try{
        const data = await axios.get(SF+"api/users?username="+username)
        setUser(data.data)
      }catch(err){console.log(err)}
    }
    getUser()
  },[username])

  return (
    <>
      <Topbar />
      <main className='profileContainer'>
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture ? SF + user.coverPicture : SF + 'public/assets/person/noCover.png'}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilePicture ? SF + user.profilePicture : SF + 'public/assets/person/noAvatar.png'}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Timeline username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </main>
    </>
  )
}