import React, { useState } from 'react'

export const SearchContext = React.createContext({
  search: "",
  sessionId: "",
  setSearch: () => {}
})



export const SearchContextProvider = (props) => {

  const setSearch = (search) => {
    setState({...state, search: search})
  }

  const initState = {
    search: "",
    sessionId: props.sessionId,
    setSearch: setSearch
  } 

  const [state, setState] = useState(initState)

  return (
    <SearchContext.Provider value={state}>
      {props.children}
    </SearchContext.Provider>
  )
}