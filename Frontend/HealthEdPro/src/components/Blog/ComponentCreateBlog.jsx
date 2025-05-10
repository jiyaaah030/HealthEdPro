import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from "../../api.js";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  
  const TITLE_MAX_WORDS = 20;
  const DESCRIPTION_MAX_WORDS = 100;
  const CONTENT_MAX_WORDS = 5000;

  const countWords = (text) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const handleTitleChange = (e) => {
    const inputText = e.target.value;
    const words = inputText.trim().split(/\s+/);
    
    if (words.length <= TITLE_MAX_WORDS) {
      setTitle(inputText);
    }
  };

  const handleDescriptionChange = (e) => {
    const inputText = e.target.value;
    const words = inputText.trim().split(/\s+/);
    
    if (words.length <= DESCRIPTION_MAX_WORDS) {
      setDescription(inputText);
    }
  };

  const handleContentChange = (e) => {
    const inputText = e.target.value;
    const words = inputText.trim().split(/\s+/);
    
    if (words.length <= CONTENT_MAX_WORDS) {
      setContent(inputText);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault(); 

    const titleWordCount = countWords(title);
    const descriptionWordCount = countWords(description);
    const contentWordCount = countWords(content);

    if (
      titleWordCount > 0 && titleWordCount <= TITLE_MAX_WORDS &&
      descriptionWordCount > 0 && descriptionWordCount <= DESCRIPTION_MAX_WORDS &&
      contentWordCount > 0 && contentWordCount <= CONTENT_MAX_WORDS
    ) {
      let submitObject = {
        title: title,
        description: description,
        content: content,
        dateCreated: new Date()
      };

      try {
        await createPost(submitObject);
        navigate('/Blog');
      } catch  {
        alert("Failed to create blog post. Please try again.");
      }
    } else {
      alert(`Please check your input:
        - Title: 1-${TITLE_MAX_WORDS} words
        - Description: 1-${DESCRIPTION_MAX_WORDS} words
        - Content: 1-${CONTENT_MAX_WORDS} words`);
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 mt-23">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Blog Post Title (Max {TITLE_MAX_WORDS} words):</label>
          <input 
            value={title}
            onChange={handleTitleChange} 
            name="title" 
            className="w-full p-2 border rounded"
            placeholder="Enter blog post title"
          />
          <p className="text-sm text-gray-500">
            Words used: {countWords(title)}/{TITLE_MAX_WORDS}
          </p>
        </div>

        <div>
          <label className="block mb-2">Blog Post Description (Max {DESCRIPTION_MAX_WORDS} words):</label>
          <input 
            value={description}
            onChange={handleDescriptionChange} 
            name="description" 
            className="w-full p-2 border rounded"
            placeholder="Enter a brief description"
          />
          <p className="text-sm text-gray-500">
            Words used: {countWords(description)}/{DESCRIPTION_MAX_WORDS}
          </p>
        </div>

        <div>
          <label className="block mb-2">Blog Post Content (Max {CONTENT_MAX_WORDS} words):</label>
          <textarea 
            value={content}
            onChange={handleContentChange} 
            name="content" 
            className="w-full p-2 border rounded h-40"
            placeholder="Write your blog post content"
          />
          <p className="text-sm text-gray-500">
            Words used: {countWords(content)}/{CONTENT_MAX_WORDS}
          </p>
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit Blog Post
        </button>
      </form>
    </div>
  );
}

export default CreateBlog;