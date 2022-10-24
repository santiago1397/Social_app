import './timeline.css'
import Share from '../share/Share'
import Post from '../postShared/Post'
import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"

export default function Timeline({ username }) {
  const SF = process.env.REACT_APP_SERVER_FOLDER
  const [posts, setPosts] = useState([])
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const fetchPost = async () => {
      const res = username
        ? await axios.get("http://localhost:8800/" + `api/posts/profile/${username}`)
        : await axios.get("http://localhost:8800/" + `api/posts/timeline/${user._id}`);
        
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt)
        })
      )

    }
    fetchPost()
  }, [username, user._id])


  return (
    <div className="TimelineContainer">
      {user.username === username ? <Share /> : (username?  "" : <Share />)}
      {posts.map((p) => {
        return <Post key={p._id} post={p} />
      })}

    </div>
  )
}
