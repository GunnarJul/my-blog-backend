import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import articles from './article-content';
import CommentsList from '../components/CommentsList';
import AddCommentForm from '../components/AddCommentsForm';

const ArticlePage = () => {
  const { articleId } = useParams();
  const [articleInfo, setArticleInfo] = useState({upvotes:0, comments:[]});
  const article = articles.find(article => article.name === articleId);
  
  useEffect(() => {
    const loadArticleInfo = async () => {
      const response = await axios.get(`/api/articles/${articleId}`);
      const newArticleInfo = response.data;
      setArticleInfo(newArticleInfo);
      console.log(articleInfo.comments)

    }
    loadArticleInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[articleId]);
  
  const addUpvote = async()  => {

    const response = await axios.put(`/api/articles/${articleId}/upvote`);
    const updatedArticle = await response.data;
    setArticleInfo(updatedArticle);

  }
  if (!article) {
    return <NotFoundPage />
  }

    return (
        <>
        <h1>{article.title}</h1>
        <div className='upvote-section'>
          <button onClick={addUpvote}>Upvote</button>
          <p>This article has {articleInfo.upvotes} upvote(s)</p>
        </div>
        
        {article.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
        ))}
        <AddCommentForm
          articelName={articleId}
          onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)}
        />
        <CommentsList comments={articleInfo.comments} />
        </>
    );
}

export default ArticlePage;
