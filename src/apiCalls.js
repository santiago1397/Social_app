import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
    const SF = process.env.REACT_APP_SERVER_FOLDER
    dispatch({ type: "LOGIN_START" });
    try {
        const res = await axios.post(SF +"api/auth/login", userCredential);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
};