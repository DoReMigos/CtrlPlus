import React, { useState, useEffect } from "react";
import { getUserProfile } from "../databaseAdapter";


export default function Profile(){
    const [userInfo, setUserInfo] = useState({});

    useEffect(()=>{
        let token = localStorage.getItem("token");
        console.log(token)
        async function getUserInfo(){
            const response = await getUserProfile(token);
            console.log(token)
            console.log(response)
            setUserInfo(response)
        }
        getUserInfo()
    },[])
    console.log(userInfo)
return(
    <div>
        <h2>Welcome {userInfo.email}</h2>
    </div>
)
}