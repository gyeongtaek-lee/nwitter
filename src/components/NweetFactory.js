import { storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { dbService } from "fbase";

const NweetFactory = ({ userObj }) => {

    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = async (event) => {
        
        event.preventDefault();

        let attachmentUrl = "";

        if (attachment !== "") {

            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);

            const response = await attachmentRef.putString(attachment, "data_url");
    
            // response.ref 는 스토리지 레퍼런스(storageService.ref())가 아닌 스냅샷 레퍼런스야!
            // getDownloadURL 함수는 파일을 다운로드할 수 있는 스토리지 URL을 반환해.
            attachmentUrl = await response.ref.getDownloadURL();

        } 

        // useState의 nweet 값을 문서에 저장.
        const nweetObj = {
            text: nweet,
            createAt: Date.now(),
            creatorId : userObj.uid,
            attachmentUrl,
        };

        await dbService.collection("nweets").add(nweetObj);

        // 데이터 DB 입력 후 useState 값을 빈 문자열로 초기화
        setNweet("");
        setAttachment("");

    };

    const onChange = (event) => {
        event.preventDefault();

        const {
            target : { value },
        } = event;

        setNweet(value);

    };

    const onFileChange = (event) => {
        
        const {target : {files},} = event;

        const theFile = files[0];

        const reader = new FileReader();

        // onloadend의 경우 readAsDataURL 함수에 전달할 인자가 들어간 이후 해당 결과값이 나온 다음 상황에 호출 되는데, 그때 생긴 이벤트 값을 리턴해줘.
        // 해당 이벤트 값에는 우리가 원하는 해당 파일의 브라우저 URL 정보가 있고 말이야.
        reader.onloadend = (finishedEvent) => {
            
            // 구조 분해 할당. finishedEvent.currentTarget.result에 URL 존재
            const { currentTarget : { result }, } = finishedEvent;

            setAttachment(result);

        }
        // 파일 위치를 URL로 반환.        
        reader.readAsDataURL(theFile);

    };

    const onClearAttachment = () => setAttachment("");

    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                value={nweet}
                onChange={onChange}
                type="text"
                placeholder="What's on your mind?"
                maxLength={120}
                />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Nweet" />
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>                
                )}
            </form>
        </>
    );

};

export default NweetFactory;