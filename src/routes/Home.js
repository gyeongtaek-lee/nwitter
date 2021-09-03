import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
import { dbService } from "fbase";
import { useEffect, useState } from "react";

const Home = ({ userObj }) => {

    const [nweets, setNweets] = useState([]);

    // const getNweets = async () => {

    //     const dbNweets = await dbService.collection("nweets").get();        
        
    //     dbNweets.forEach((document) => {

    //         const nweetObject = {...document.data(), id : document.id};            

    //         setNweets((prev) => [nweetObject, ...prev]);
    //     });

    // };

    // 컴포넌트가 모두 마운트 된 이후에 문서 가져오기. 실시간 데이터베이스 도입 onSnapShot()
    useEffect(() => {
        // getNweets();

        dbService.collection("nweets").onSnapshot((snapshot) => {

            const newArray = snapshot.docs.map((document) => ({id : document.id, ...document.data(),}));

            setNweets(newArray);

        });

    }, []);

    return (
        <>
            <NweetFactory userObj={userObj} />
            <div>
                {
                    nweets.map((nweet) => (                        
                        <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                    ))
                }
            </div>
        </>
    );

};

export default Home;