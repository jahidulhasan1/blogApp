import React, { useState, useEffect, useMemo } from "react";
import Modal from "../../../utils/Modal";
import { CiSearch } from "react-icons/ci";
import { useBlogContext } from "../../../context/Context";
import { useNavigate } from "react-router-dom";
import createTrie from "../../../utils/trie";

function Search({ modal, setModal }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const { postData } = useBlogContext();
  const navigate = useNavigate();

  // Create the trie index for fast autocomplete suggestions
  const trie = useMemo(
    () => createTrie(postData.map((post) => post.title)),

    [postData]
  );
  console.log(trie);
  // Debounce the search input to limit API calls
  useEffect(() => {
    const debounceTimeout = setTimeout(async () => {
      if (searchTerm.trim() !== "") {
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
    console.log(prefix);
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
                  onClick={() =>
                    handlePostClick(
                      postData.find((post) => post.title === suggestion)
                    )
                  }
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
