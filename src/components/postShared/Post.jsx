import { useState, useEffect, useContext } from 'react'
import './post.css'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import { format } from "timeago.js"
import { useNavigate } from 'react-router-dom'
import {
    MoreVert
} from '@mui/icons-material'


export default function Post({ post }) {
    const navigate = useNavigate()
    const [likes, setLikes] = useState(post.likes.length)
    const [liked, setLiked] = useState(false)
    const [user, setUser] = useState({})
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const SF = process.env.REACT_APP_SERVER_FOLDER;
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        setLiked(post.likes.includes(currentUser._id))
    }, [currentUser._id, post.likes])

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(SF + "api/users?userId=" + post.userId)
            setUser(res.data);
        };
        fetchUser();
    }, [post.userId])

    const HandleLike = () => {
        try {
            axios.put(SF + "api/posts/" + post._id + "/like", { userId: currentUser._id });
        } catch (err) { }
        setLikes(liked ? likes - 1 : likes + 1);
        setLiked(liked => !liked);
    }


    return (
        <section className="post">
            <div className="postTop">
                <div className="postTopLeft">
    
                    <img className="postProfileImg"
                        src={
                            user.profilePicture
                                ? SF + user.profilePicture
                                : SF + "public/assets/person/noAvatar.png"
                        }
                        alt="" 
                        onClick={()=>{navigate('/profile/'+user.username)}}
                    />
                    <span className="postUsername" >{user.username}</span>
                    <p className="postDate">{format(post.createdAt)}</p>
                </div>
                <div className="moreBtn">
                    <MoreVert />
                </div>
            </div>
            
            <div className="postCenter">
                <span className="postText">{post?.desc}</span>
                <img className="postImg" src={SF + "public/" + post.img} alt="" />
            </div>

            <div className="postBottom">
                <div className="postBottomLeft">
                    <img className="likeIcon" src="assets/like.png" alt="" />
                    <img className="likeIcon" src="assets/heart.png" alt="" onClick={HandleLike} />
                    <span className="postLikeCounter">{likes} people like it</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">3 comments</span>
                </div>
            </div>

        </section>
    )
}
