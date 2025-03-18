import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { cartcontext } from "./Cartcontext";

export let Usercontext = createContext(0);

export default function UsercontextProvider(props) {
    let [usertoken, Setusertoken] = useState(null);
    let [userid, Setuserid] = useState(null);
let {Setcart}=useContext(cartcontext);
    async function setid(emailToFind) {
            try {
                console.log("email",emailToFind);
                const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/users?email=${emailToFind}`);
        
                if (response?.data?.users?.length > 0 && localStorage.getItem('email')!=null) {
                    Setuserid(response.data.users[0]._id);
                    console.log("User ID Found:", response.data.users[0]._id);
                    localStorage.setItem('User_ID',response.data.users[0]._id);
                } else if(localStorage.getItem('email')==null){
                    console.warn("User not found");
                }
            } catch (error) {
                console.error("Error fetching user:", error.response?.data || error.message);
            }
        
        
    /*   let page = 1;
        let userFound = null;
        const emailToFind = "muhammedahmed7878@gmail.com"; // Replace with dynamic email

        try {
            // Get total pages first (avoid unnecessary requests)
            const firstPageResponse = await axios.get(`https://ecommerce.routemisr.com/api/v1/users?page=1`);
            console.log("Page 1 Response:", firstPageResponse.data);

            const totalUsers = firstPageResponse.data.totalUsers;
            const usersPerPage = firstPageResponse.data.metadata.limit; // Example: 40 users per page
            const totalPages = Math.ceil(totalUsers / usersPerPage); // Calculate total pages

            // Check first page before looping
            const users = firstPageResponse.data?.users || [];
            userFound = users.find(user => user.email === emailToFind);

            if (userFound) {
                Setuserid(userFound._id);
                console.log("User ID Found on Page 1:", userFound._id);
                return; // Exit function if found
            }

            // If not found, loop through remaining pages (starting from page 2)
            for (let page = 2; page <= totalPages; page++) {
                const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/users?page=${page}`);
                console.log(`Page ${page} Response:`, response.data);

                userFound = response.data.users.find(user => user.email === emailToFind);
                if (userFound) {
                    Setuserid(userFound._id);
                    console.log("User ID Found:", userFound._id);
                    return;
                }
            }

            console.warn("User not found in all available pages.");
        } catch (error) {
            console.error("Error fetching users:", error.response?.data || error.message);
        }*/
    }

    useEffect(() => {
        Setcart();
        setid();
        if (localStorage.getItem('usertoken') !== null) {
            Setusertoken(localStorage.getItem('usertoken'));
        }
    }, []);

    return <Usercontext.Provider value={{ usertoken, Setusertoken ,setid ,userid }}>
        {props.children}
    </Usercontext.Provider>;
}
