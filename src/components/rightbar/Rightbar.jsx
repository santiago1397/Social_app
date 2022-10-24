import './rightbar.css'
import { Users } from "../../dummyData";
import Online from "../online/Online"
import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from "axios"
import { Add } from '@mui/icons-material'

export default function Rightbar({ user }) {
  const SF = process.env.REACT_APP_SERVER_FOLDER
  const [friendList, setFriendList] = useState([])
  const { user: currentUser, dispatch } = useContext(AuthContext)
  const [follow, setFollow] = useState()

  useEffect(() => {
    if (user) {
      setFollow(currentUser.followings.includes(user._id))
    }
  }, [currentUser, user])

  useEffect(() => {
    if (user) {
      const getFriends = async () => {
        try {
          const data = await axios.get(SF + "api/users/friends/" + user._id)
          setFriendList(data.data)
        } catch (err) { console.log(err) }
      }
      getFriends()
    }
  }, [user])

  console.log()
  const Follow = async () => {
    try {
      if (follow) {
        await axios.put(SF + "api/users/" + user._id + "/unfollow", { userId: currentUser._id, })
        dispatch({ type: "UNFOLLOW", payload: user._id })
      } else {
        await axios.put(SF + "api/users/" + user._id + "/follow", { userId: currentUser._id, })
        dispatch({ type: "FOLLOW", payload: user._id })
      }
      setFollow(follow => !follow)
    } catch (err) { console.log(err) }
  }

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {currentUser.username !== user.username
          ? follow
            ? <button onClick={Follow} className="followButton"> Unfollow </button>
            : <button onClick={Follow} className="followButton"> Follow <Add /></button>
          : ""
        }
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City: </span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From: </span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship: </span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                  ? "Married"
                  : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friendList.map((friend) => {
            return (
              <div key={friend._id} className="rightbarFollowing">
                <img
                  src={friend.profilePicture ? SF + friend.profilePicture : SF + "public/assets/person/noAvatar.png"}
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            )
          })}
        </div>
      </>
    );
  };

  return (
    <div className="RightbarContainer">
      {user ? <ProfileRightbar /> : <HomeRightbar />}
    </div>
  );

}
