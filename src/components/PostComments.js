// UserComments.jsx
import axios from "axios";
import { useEffect, useState } from "react";

export default function UserComments({ postId }) {
  const [comments, setComments] = useState([]);
  const [visibleComment, setVisibleComment] = useState(null);

  useEffect(() => {
    if (postId) {
      axios
        .get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then((res) => {
          setComments(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          console.log("Final");
        });
    }
  }, [postId]);

  return (
    <>
      <h2>Commentaires du post {postId}</h2>
      <ul>
        {comments.map((c) => (
          <li key={c.id} style={{ marginBottom: "12px" }}>
            <h4>{c.name}</h4>
            <button
              onClick={() =>
                setVisibleComment(visibleComment === c.id ? null : c.id)
              }
            >
              {visibleComment === c.id ? "Masquer" : "Afficher"} le commentaire
            </button>

            {visibleComment === c.id && (
              <p style={{ marginTop: "6px" }}>{c.body}</p>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
