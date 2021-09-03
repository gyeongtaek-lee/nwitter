import Nweet from "components/Nweet";
import { authService, dbService } from "fbase";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ refreshUser, userObj }) => {

    // const [myNweets, setMyNweets] = useState([]);
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const history = useHistory();

    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };

    // const getMyNweets = async () => {
    //     // where() 함수의 인자는 필드, 조건, 찾으려는 값
    //     const nweets = await dbService.collection("nweets").where("creatorId", "==", userObj.uid).orderBy("createAt", "asc").get();

    //     const newArray = nweets.docs.map((doc) => ({id : doc.id, ...doc.data(),}));

    //     setMyNweets(newArray);

    // };

    // useEffect(() => {
    //     getMyNweets();
    // }, []);

    const onChange = (event) => {

        const {
            target : { value }
        } = event;

        setNewDisplayName(value);

    };

    const onSubmit = async (event) => {

        event.preventDefault();

        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({ displayName: newDisplayName })
            refreshUser();
        }        

    };

    return (
        <>
            {/* <div>
                {
                    myNweets.map((nweet) => (                        
                        <Nweet key={nweet.id} nweetObj={nweet} isOwner={false} />
                    ))
                }
            </div> */}
            <form onSubmit={onSubmit}>
                <input type="text" onChange={onChange} placeholder="Display name" value={newDisplayName} />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );

};

export default Profile;