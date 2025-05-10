import React, { useState, useEffect } from 'react';

const MentalHealthLibrary = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('mental health');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [savedBooks, setSavedBooks] = useState([]);
  const [currentView, setCurrentView] = useState('search'); // 'search' or 'saved'

  const fetchBooks = async (term) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(term)}+subject:psychiatry&maxResults=30`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      
      const data = await response.json();
      setBooks(data.items || []);
    } catch (err) {
      setError('Error fetching books. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

useEffect(() => {
  fetchBooks(searchTerm);
}, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks(searchTerm);
  };

  const saveBook = (book) => {
    if (!savedBooks.find(saved => saved.id === book.id)) {
      setSavedBooks([...savedBooks, book]);
    }
  };

  const removeBook = (bookId) => {
    setSavedBooks(savedBooks.filter(book => book.id !== bookId));
  };

  const viewBookDetails = (book) => {
    setSelectedBook(book);
  };

  const closeBookDetails = () => {
    setSelectedBook(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8 px-4 mt-22">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-800 mb-2">Mental Health Book Library</h1>
          <p className="text-lg text-gray-600">Discover books to support your mental wellbeing</p>
        </div>
        
        <div className="flex justify-center mb-8">
          <button 
            className={`px-6 py-2 rounded-l-lg ${currentView === 'search' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setCurrentView('search')}
          >
            Search Books
          </button>
          <button 
            className={`px-6 py-2 rounded-r-lg ${currentView === 'saved' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setCurrentView('saved')}
          >
            My Saved Books ({savedBooks.length})
          </button>
        </div>
        
        {currentView === 'search' && (
          <>
            <form onSubmit={handleSearch} className="mb-8 flex justify-center">
              <div className="flex w-full max-w-2xl">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for mental health topics..."
                  className="flex-grow px-4 py-3 rounded-l-lg border-2 border-indigo-300 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-6 py-3 rounded-r-lg hover:bg-indigo-700 transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
            
            {isLoading && (
              <div className="text-center py-10">
                <div className="inline-block w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-2 text-gray-600">Loading books...</p>
              </div>
            )}
            
            {error && (
              <div className="text-center py-10 text-red-500">
                <p>{error}</p>
              </div>
            )}
            
            {!isLoading && !error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {books.map((book) => (
                  <div
                    key={book.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="h-56 bg-gray-200 flex items-center justify-center">
                      {book.volumeInfo.imageLinks ? (
                        <img
                          src={book.volumeInfo.imageLinks.thumbnail.replace('http:', 'https:')}
                          alt={book.volumeInfo.title}
                          className="max-h-full max-w-full object-cover"
                        />
                      ) : (
                        <div className="text-gray-500 text-center px-4">No image available</div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1 line-clamp-2">{book.volumeInfo.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}
                      </p>
                      <div className="flex mt-4 justify-between">
                        <button
                          onClick={() => viewBookDetails(book)}
                          className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 text-sm"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => saveBook(book)}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 text-sm"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {books.length === 0 && !isLoading && (
                  <div className="col-span-full text-center py-10 text-gray-500">
                    No books found. Try a different search term.
                  </div>
                )}
              </div>
            )}
          </>
        )}
        
        {currentView === 'saved' && (
          <div>
            <h2 className="text-2xl font-semibold text-indigo-800 mb-6 text-center">My Saved Books</h2>
            
            {savedBooks.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-lg shadow-md">
                <p className="text-gray-600">You haven't saved any books yet.</p>
                <button
                  onClick={() => setCurrentView('search')}
                  className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Discover Books
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {savedBooks.map((book) => (
                  <div
                    key={book.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="h-56 bg-gray-200 flex items-center justify-center">
                      {book.volumeInfo.imageLinks ? (
                        <img
                          src={book.volumeInfo.imageLinks.thumbnail.replace('http:', 'https:')}
                          alt={book.volumeInfo.title}
                          className="max-h-full max-w-full object-cover"
                        />
                      ) : (
                        <div className="text-gray-500 text-center px-4">No image available</div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1 line-clamp-2">{book.volumeInfo.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}
                      </p>
                      <div className="flex mt-4 justify-between">
                        <button
                          onClick={() => viewBookDetails(book)}
                          className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 text-sm"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => removeBook(book.id)}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {selectedBook && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-indigo-800">{selectedBook.volumeInfo.title}</h2>
                  <button
                    onClick={closeBookDetails}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/3 flex-shrink-0">
                    <div className="bg-gray-200 rounded-lg flex items-center justify-center p-4 h-64">
                      {selectedBook.volumeInfo.imageLinks ? (
                        <img
                          src={selectedBook.volumeInfo.imageLinks.thumbnail.replace('http:', 'https:')}
                          alt={selectedBook.volumeInfo.title}
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <div className="text-gray-500 text-center">No image available</div>
                      )}
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <p className="font-semibold">Authors:</p>
                      <p>{selectedBook.volumeInfo.authors ? selectedBook.volumeInfo.authors.join(', ') : 'Unknown Author'}</p>
                      
                      <p className="font-semibold">Publisher:</p>
                      <p>{selectedBook.volumeInfo.publisher || 'Not available'}</p>
                      
                      <p className="font-semibold">Published Date:</p>
                      <p>{selectedBook.volumeInfo.publishedDate || 'Not available'}</p>
                      
                      <p className="font-semibold">Pages:</p>
                      <p>{selectedBook.volumeInfo.pageCount || 'Not available'}</p>
                      
                      <p className="font-semibold">Categories:</p>
                      <p>{selectedBook.volumeInfo.categories ? selectedBook.volumeInfo.categories.join(', ') : 'Not available'}</p>
                      
                      <div className="pt-4">
                        {selectedBook.volumeInfo.previewLink && (
                          <a
                            href={selectedBook.volumeInfo.previewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-center bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors"
                          >
                            Preview on Google Books
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-2/3">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Description</h3>
                      <div className="prose max-w-none">
                        {selectedBook.volumeInfo.description ? (
                          <div dangerouslySetInnerHTML={{ __html: selectedBook.volumeInfo.description }} />
                        ) : (
                          <p>No description available for this book.</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold mb-3">Why This Matters for Mental Health</h3>
                      <p className="text-gray-700">
                        Books on mental health and wellness can provide valuable insights, coping strategies,
                        and support for those navigating mental health challenges. They can offer perspectives 
                        from experts, personal stories from others who have faced similar struggles, and 
                        evidence-based approaches to managing mental wellbeing.
                      </p>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      {!savedBooks.find(saved => saved.id === selectedBook.id) ? (
                        <button
                          onClick={() => {
                            saveBook(selectedBook);
                            closeBookDetails();
                          }}
                          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                        >
                          Save to My Books
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            removeBook(selectedBook.id);
                            closeBookDetails();
                          }}
                          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                        >
                          Remove from My Books
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentalHealthLibrary;