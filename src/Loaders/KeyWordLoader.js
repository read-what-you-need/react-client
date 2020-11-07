import React from 'react'
import ContentLoader from 'react-content-loader'

const KeyWordLoader = props => {
  return (
    <ContentLoader
      height={45}
      width={90}
      style={{marginBottom: 20, marginTop: 10}}
      viewBox="0 0 400 200"
      backgroundColor="#d9d9d9"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="15" y="15" rx="80" ry="80" width="370" height="150" />
      
      
    </ContentLoader>
  )
}

export default KeyWordLoader