import React, { createContext, useContext, useState } from 'react'




const BlogContext = createContext()

function Context({children}) {
const [currentUser,setCurrentUser]= useState(false)



  return (
    <BlogContext.Provider value={{currentUser,setCurrentUser}}>
      {children}
    </BlogContext.Provider>
  )
}

export default Context
 

// custom fn
export const useBlogContext=()=> useContext(BlogContext);