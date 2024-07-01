// bug freee:
import React, { useState, useEffec
    
    
    t, useMemo } from 'react';
import Modal from '../../../utils/Modal';
import { CiSearch } from 'react-icons/ci';
import { useBlogContext } from '../../../context/Context';
import { useNavigate } from 'react-router-dom';
import { createTrie } from './utils/trie';

function Search({ modal, setModal }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const { postData } = useBlogContext();
  const navigate = useNavigate();

  // Create the trie index for fast autocomplete suggestions
  const trie = useMemo(() => createTrie(postData.map((post) => post.title)), [postData]);

  // Debounce the search input to limit API calls
  useEffect(() => {
    const debounceTimeout = setTimeout(async () => {
      if (searchTerm.trim() !== '') {
        setIsLoading(true);
        setIsSearching(true);
        const results = await searchPosts(searchTerm, currentPage);
        setSearchResults(results);
        setIsLoading(false);
      } else {
        setIsSearching(false);
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm, currentPage]);

  // Fetch search results from the server (or a simulated API)
  async function searchPosts(query, page) {
    // Implement server-side search logic with pagination and ranking
    const response = await fetch(`/api/search?q=${query}&page=${page}`);
    const data = await response.json();
    return data.results;
  }

  // Get autocomplete suggestions from the trie
  function getAutocompleteSuggestions(prefix) {
    return trie.getWords(prefix);
  }

  // Handle navigation to the post page
  function handlePostClick(post) {
    navigate(`/post/${post.id}`);
    setSearchTerm('');
  }

  return (
    <Modal modal={modal} setModal={setModal}>
      <div
        className={`absolute sm:relative right-4 left-4 top-[4rem] sm:left-0 sm:top-0 ${
          modal
            ? 'visible opacity-100'
            : 'invisible sm:visible sm:opacity-100 opacity-0'
        } transition-all duration-200`}
      >
        <div className="flex items-center gap-1 bg-gray-100 px-2 rounded-full relative z-10">
          <span className="text-2xl text-gray-400">
            <CiSearch />
          </span>
          <input
            className="bg-transparent outline-none py-[0.7rem] w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search..."
          />
          {searchTerm && (
            <div className="absolute right-0 left-0 top-full bg-white shadow rounded-md">
              {isSearching ? (
                <div className="p-3 text-sm text-gray-500">Loading...</div>
              ) : searchResults.length > 0 ? (
                searchResults.map((post, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      handlePostClick(post);
                    }}
                    className="p-2 border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
                  >
                    <h2 className="line-clamp-1 capitalize text-sm font-bold">
                      {post.title}
                    </h2>
                    <div
                      className="text-xs text-gray-500 line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: post.desc }}
                    />
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 p-3">No Post Found</p>
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default Search;




// with bug

import { useState, useEffect, useMemo } from "react";
import Modal from "../../../utils/Modal";
import { CiSearch } from "react-icons/ci";
import { useBlogContext } from "../../../context/Context";
import { useNavigate } from "react-router-dom";
import createTrie from "../../../utils/trie";

function Search({ modal, setModal }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { postData } = useBlogContext();
  const navigate = useNavigate();

  // Create the trie index for fast autocomplete suggestions
  const trie = useMemo(
    () => createTrie(postData.map((post) => post.title)),
    [postData]
  );

  // Debounce the search input to limit API calls
  useEffect(() => {
    const debounceTimeout = setTimeout(async () => {
      setIsLoading(true);
      const results = await searchPosts(searchTerm, currentPage);
      setSearchResults(results);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm, currentPage]);

  // Fetch search results from the server (or a simulated API)
  async function searchPosts(query, page) {
    // Implement server-side search logic with pagination and ranking
    const response = await fetch(`/api/search?q=${query}&page=${page}`);
    const data = await response.json();
    return data.results;
  }

  // Get autocomplete suggestions from the trie
  function getAutocompleteSuggestions(prefix) {
    return trie.getWords(prefix);
  }

  // Handle navigation to the post page
  function handlePostClick(post) {
    navigate(`/post/${post.id}`);
    setSearchTerm("");
  }

  return (
    <Modal modal={modal} setModal={setModal}>
      <div
        className={`absolute sm:relative right-4 left-4 top-[4rem] sm:left-0 sm:top-0 ${
          modal
            ? "visible opacity-100"
            : "invisible sm:visible sm:opacity-100 opacity-0"
        } transition-all duration-200`}
      >
        <div className="flex items-center gap-1 bg-gray-100 px-2 rounded-full relative z-10">
          <span className="text-2xl text-gray-400">
            <CiSearch />
          </span>
          <input
            className="bg-transparent outline-none py-[0.7rem] w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search..."
          />
          {searchTerm && (
            <div className="absolute right-0 left-0 top-full bg-white shadow rounded-md">
              {getAutocompleteSuggestions(searchTerm).map((suggestion) => (
                <div
                  key={suggestion}
                  onClick={() => setSearchTerm(suggestion)}
                  className="p-2 border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="search-results">
            {searchResults.length > 0 ? (
              searchResults.map((post) => (
                <div
                  key={post.id}
                  onClick={() => handlePostClick(post)}
                  className="p-2 border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
                >
                  <h2 className="line-clamp-1 capitalize text-sm font-bold">
                    {post.title}
                  </h2>
                  <div
                    className="text-xs text-gray-500 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: post.desc }}
                  />
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 p-3">No Post Found</p>
            )}
          </div>
        )}

        {searchResults.length > 0 && (
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
            <span>Page {currentPage}</span>
            <button onClick={() => setCurrentPage(currentPage + 1)}>
              Next
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default Search;




// ! all bug freee

import React, { useState, useEffect, useMemo } from 'react';
import Modal from '../../../utils/Modal';
import { CiSearch } from 'react-icons/ci';
import { useBlogContext } from '../../../context/Context';
import { useNavigate } from 'react-router-dom';
import createTrie from '../../../utils/trie';

function Search({ modal, setModal }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const { postData } = useBlogContext();
  const navigate = useNavigate();

  // Create the trie index for fast autocomplete suggestions
  const trie = useMemo(() => createTrie(postData.map((post) => post.title)), [postData]);

  // Debounce the search input to limit API calls
  useEffect(() => {
    const debounceTimeout = setTimeout(async () => {
      if (searchTerm.trim() !== '') {
        setIsSearching(true);
        const suggestions = getAutocompleteSuggestions(searchTerm);
        if (suggestions.length > 0) {
          setAutocompleteSuggestions(suggestions);
          setIsLoading(false);
        } else {
          setIsLoading(true);
          const results = await searchPosts(searchTerm, currentPage);
          setSearchResults(results);
          setAutocompleteSuggestions([]);
          setIsLoading(false);
        }
      } else {
        setIsSearching(false);
        setSearchResults([]);
        setAutocompleteSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm, currentPage]);

  // Fetch search results from the server (or a simulated API)
  async function searchPosts(query, page) {
    // Implement server-side search logic with pagination and ranking
    const response = await fetch(`/api/search?q=${query}&page=${page}`);
    const data = await response.json();
    return data.results;
  }

  // Get autocomplete suggestions from the trie
  function getAutocompleteSuggestions(prefix) {
    return trie.getWords(prefix);
  }

  // Handle navigation to the post page
  function handlePostClick(post) {
    navigate(`/post/${post.id}`);
    setSearchTerm('');
  }

  return (
    <Modal modal={modal} setModal={setModal}>
      <div
        className={`absolute sm:relative right-4 left-4 top-[4rem] sm:left-0 sm:top-0 ${
          modal
            ? 'visible opacity-100'
            : 'invisible sm:visible sm:opacity-100 opacity-0'
        } transition-all duration-200`}
      >
        <div className="flex items-center gap-1 bg-gray-100 px-2 rounded-full relative z-10">
          <span className="text-2xl text-gray-400">
            <CiSearch />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent py-2 px-4 w-full focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {isSearching && (
            <div className="absolute top-full left-0 w-full bg-white shadow-md rounded-md z-20 max-h-[200px] overflow-y-auto">
              {autocompleteSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handlePostClick(postData.find((post) => post.title === suggestion))}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
        {isLoading && (
          <div className="mt-4 text-center">
            <span className="text-gray-400">Loading...</span>
          </div>
        )}
        {!isLoading && searchResults.length === 0 && isSearching && (
          <div className="mt-4 text-center">
            <span className="text-gray-400">No results found</span>
          </div>
        )}
        {!isLoading && searchResults.length > 0 && (
          <div className="mt-4">
            {searchResults.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-md shadow-md p-4 mb-4 cursor-pointer"
                onClick={() => handlePostClick(post)}
              >
                <h3 className="text-lg font-bold">{post.title}</h3>
                <p className="text-gray-600">{post.excerpt}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}

export default Search;





// * one bug exits
import React, { useState, useEffect, useMemo } from 'react';
import Modal from '../../../utils/Modal';
import { CiSearch } from 'react-icons/ci';
import { useBlogContext } from '../../../context/Context';
import { useNavigate } from 'react-router-dom';
import { createTrie } from './utils/trie';

function Search({ modal, setModal }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const { postData } = useBlogContext();
  const navigate = useNavigate();

  // Create the trie index for fast autocomplete suggestions
  const trie = useMemo(() => createTrie(postData.map((post) => post.title)), [postData]);

  // Debounce the search input to limit API calls
  useEffect(() => {
    const debounceTimeout = setTimeout(async () => {
      if (searchTerm.trim() !== '') {
        const suggestions = getAutocompleteSuggestions(searchTerm);
        if (suggestions.length > 0) {
          setAutocompleteSuggestions(suggestions);
          setIsSearching(true);
          setIsLoading(false);
        } else {
          setIsLoading(true);
          setIsSearching(true);
          const results = await searchPosts(searchTerm, currentPage);
          setSearchResults(results);
          setAutocompleteSuggestions(suggestions);
          setIsLoading(false);
        }
      } else {
        setIsSearching(false);
        setSearchResults([]);
        setAutocompleteSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm, currentPage]);

  // Fetch search results from the server (or a simulated API)
  async function searchPosts(query, page) {
    // Implement server-side search logic with pagination and ranking
    const response = await fetch(`/api/search?q=${query}&page=${page}`);
    const data = await response.json();
    return data.results;
  }

  // Get autocomplete suggestions from the trie
  function getAutocompleteSuggestions(prefix) {
    return trie.getWords(prefix);
  }

  // Handle navigation to the post page
  function handlePostClick(post) {
    navigate(`/post/${post.id}`);
    setSearchTerm('');
  }

  return (
    <Modal modal={modal} setModal={setModal}>
      <div
        className={`absolute sm:relative right-4 left-4 top-[4rem] sm:left-0 sm:top-0 ${
          modal
            ? 'visible opacity-100'
            : 'invisible sm:visible sm:opacity-100 opacity-0'
        } transition-all duration-200`}
      >
        <div className="flex items-center gap-1 bg-gray-100 px-2 rounded-full relative z-10">
          <span className="text-2xl text-gray-400">
            <CiSearch />
          </span>
          <input
            className="bg-transparent outline-none py-[0.7rem] w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search..."
          />
          {searchTerm && (
            <div className="absolute right-0 left-0 top-full bg-white shadow rounded-md">
              {isSearching ? (
                <p className="text-sm text-gray-500 p-3">Loading...</p>
              ) : autocompleteSuggestions.length > 0 ? (
                autocompleteSuggestions.map((suggestion, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      handlePostClick(postData.find((post) => post.title === suggestion));
                    }}
                    className="p-2 border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
                  >
                    <h2 className="line-clamp-1 capitalize text-sm font-bold">
                      {suggestion}
                    </h2>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 p-3">No results found</p>
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default Search;
