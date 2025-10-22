import axios from 'axios';
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../Context";
import UserComments from './PostComments';
import AddPost from './AddPost';

export default function UserPosts() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const userId = useContext(UserContext);

  useEffect(() => {
    if (userId) {
      axios
        .get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then((res) => {
          setPosts(res.data);
          console.log(res.data);
        })
        .catch((error) => console.error(error))
        .finally(() => console.log("Final"));
    }
  }, [userId]);

  const handlePostAdded = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <>
      <h1>Posts de l'utilisateur {userId}</h1>
      
      <AddPost onPostAdded={handlePostAdded} />
      
      <ul>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: "16px" }}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <button
              onClick={() =>
                setSelectedPost(selectedPost === post.id ? null : post.id)
              }
              style={{ marginLeft: "8px" }}
            >
              {selectedPost === post.id
                ? "Masquer les commentaires"
                : "Afficher les commentaires"}
            </button>

            {selectedPost === post.id && (
              <UserComments postId={post.id} />
            )}
          </li>
        ))}
      </ul>
    </>
  );
}