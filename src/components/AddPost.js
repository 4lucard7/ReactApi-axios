import axios from 'axios';
import { useState, useContext } from 'react';
import { UserContext } from '../Context';

export default function AddPost({ onPostAdded }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userId = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim() || !body.trim()) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    setIsSubmitting(true);

    axios.post('https://jsonplaceholder.typicode.com/posts', {
      userId: userId,
      title: title,
      body: body
    })
    .then((res) => {
      console.log('Post créé:', res.data);
      
      const newPost = {
        ...res.data,
        id: Date.now() 
      };
      
      if (onPostAdded) {
        onPostAdded(newPost);
      }
      
      setTitle('');
      setBody('');
    })
    .catch((error) => {
      console.error('Erreur lors de la création du post:', error);
      alert('Erreur lors de la création du post');
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <div className="add-post-container">
      <h3>Ajouter un nouveau post</h3>
      <form onSubmit={handleSubmit} className="add-post-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Titre du post"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <textarea
            placeholder="Contenu du post"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            disabled={isSubmitting}
            rows="4"
            className="form-textarea"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="submit-button"
        >
          {isSubmitting ? 'Publication...' : 'Publier'}
        </button>
      </form>
    </div>
  );
}