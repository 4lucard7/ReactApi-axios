import axios from 'axios';
import { useEffect, useState } from 'react';
import { UserContext } from '../Context';
import UserPosts from './UserPosts';



export default function UserList() {

    const [users, setUsers] = useState([]);
    const [id, setId] = useState(0);
    const [btn, setBtn] = useState(false);

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(function (res) {
            setUsers(res.data);
            console.log(res.data); 
        })
        .catch(function (error) {
            console.error(error);
        })
        .finally(function () {
            console.log("Final");
        });
        }, []);
        
        const afficher = (id) =>{

            setId(id)
            setBtn(!btn)
        }

    return(
        <>
            <UserContext.Provider value={id}>
            <h1>Users List</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                    <span>{user.name}</span>
                    <button onClick={() => afficher(user.id)} style={{marginLeft: '8px'}}>afficher post</button>
                    </li>
                ))}
            </ul>

            {btn && (<UserPosts/>)
                
            }
            </UserContext.Provider>
        </>
    );
}