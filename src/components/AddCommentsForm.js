import axios from "axios";
import { useState } from "react";


const AddCommentForm = ({articelName, onArticleUpdated}) => {
  const [name, setName] = useState('');
  const [commentText, setCommentText] = useState('');
  const addComment = async () => {
    console.log(name + commentText);
    const response = await axios.post(`/api/articles/${articelName}/comments`,
      {
        postedBy: name,
        text: commentText
      }
    );
    const updatedArticle = response.data;
    onArticleUpdated(updatedArticle);
    setName('');
    setCommentText('');
  }
  return (
    <div id="add-comment-form">
      <h3>Add a comment</h3>
      <label>Name:
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>  
      <label>Comment:
        <textarea
          row="4"
          cols="50"
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
        />
      </label>  
      <button onClick={addComment}>Add comment </button>
    </div>
  )
}

export default AddCommentForm;
