import axios from 'axios';
import { useEffect, useState } from 'react';

function Tp() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]); 

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

  
  const afficher = (userId) => {
    axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(function (res) {
        setPosts(res.data);
        console.log('posts for user', userId, res.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <>
      <h1>Users List</h1>
      <ul>
          {users.map(user => (
            <li key={user.id}>
              <span>{user.name}</span>
              <button onClick={() => afficher(user.id)} style={{marginLeft: '8px'}}>afficher post</button>
            </li>
          ))}
        </ul>

      {posts.length > 0 && (
          <>
            <h2>Posts</h2>
            <ul>
              {posts.map(post => (
                <li key={post.id}>{post.title}</li>
              ))}
            </ul>
          </>
        )}
    </>
  );
}

export default Tp;