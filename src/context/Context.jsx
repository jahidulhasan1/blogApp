import { onAuthStateChanged } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase/firebase'
import Loading from '../components/loading/Loading';




const BlogContext = createContext()

function Context({children}) {
const [currentUser,setCurrentUser]= useState(false);
const [loading ,setLoading]=useState(true)
useEffect(() => {
  
  const unSubscribe = onAuthStateChanged(auth, (user)=>{
    if (user) {
      setCurrentUser(user)
    }else{
      setCurrentUser(null)
    }
    setLoading(false)
    });

  return () => {
    unSubscribe()
  };
}, [currentUser]);


  return (
    <BlogContext.Provider value={{currentUser,setCurrentUser,loading,setLoading}}>
      {loading ? <Loading/>:children }
    </BlogContext.Provider>
  )
}

export default Context
 

// custom fn
export const useBlogContext=()=> useContext(BlogContext);