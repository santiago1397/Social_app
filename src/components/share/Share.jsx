import './share.css'
import {
    Cancel,
    PermMedia,
    Label,
    FmdGood,
    EmojiEmotions
} from '@mui/icons-material'
import { useContext, useState, useRef } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

export default function Share() {
    const [file, setFile] = useState(null)
    const desc = useRef()
    const SF = process.env.REACT_APP_SERVER_FOLDER;
    const { user: currentUser } = useContext(AuthContext);

    async function HandleSubmit(e) {
        e.preventDefault()
        const post = {
            userId: currentUser._id,
            desc: desc.current.value,
        }

        if (file) {
            const data = new FormData() //create a form data
            const fileName = Date.now() + file.name; //add to the file name the current date
            data.append("name", fileName) //add name and file to the form
            data.append("file", file)
            post.img = "assets/" + fileName; //add the name to the json that will be send to the mongodb
            try {
                await axios.post(SF + "api/upload", data)
            } catch (err) { console.log(err) }
        }


        try {
            await axios.post(SF + "api/posts", post)
            window.location.reload();
        } catch (err) { console.log(err) }
    }

    return (
        <form className="shareFeeling" onSubmit={HandleSubmit}>
            <div className="shareTop">
                <img className="shareProfileImg"
                    src={
                        currentUser.profilePicture
                            ? SF + currentUser.profilePicture
                            : SF + "public/assets/person/noAvatar.png"
                    }
                    alt="" />
                <input className="shareInput" ref={desc} type="text"
                    placeholder={"What's in your mind " + currentUser.username + "?"}
                />
            </div>
            {file && 
            <div className="postCenter">
                <img className="postImg" src={URL.createObjectURL(file)} alt="" />
                <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
            </div>}
            <hr className="shareHr" />
            <div className="shareBottom">
                <div className="shareOptions">
                    <label htmlFor="file" className="shareOption" >
                        <PermMedia htmlColor="tomato" className="shareIcon" />
                        Photo or Video
                        <input
                            style={{ display: "none" }}
                            type="file"
                            id="file"
                            accept=".png,.jpeg,.jpg"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </label>
                    <label className="shareOption">
                        <Label htmlColor="blue" className="shareIcon" />
                        Tag
                    </label>
                    <label className="shareOption">
                        <FmdGood htmlColor="green" className="shareIcon" />
                        Location
                    </label>
                    <label className="shareOption">
                        <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                        Feelings
                    </label>
                </div>
                <button className="shareButton" type="submit">Share</button>
            </div>
        </form>
    )
}