import React from 'react'
import ContentLoader from 'react-content-loader'
import useWindowDimensions, {percentMediaScreenSize} from './useWindowDimensions'


const SnippetLoader = props => {
  const { height, width } = useWindowDimensions();



  return (
    <ContentLoader
      speed={1}
      width={840}
      height={84}
      viewBox="0 0 900 84"
      backgroundColor="#f6f6ef"
      foregroundColor="#e8e8e3"
      {...props}
    >
      <rect x="11" y="4" rx="0" ry="0" width={percentMediaScreenSize(width,30)} height="22" />
      
      <rect x="11" y="33" rx="0" ry="0" width={percentMediaScreenSize(width,82)} height="13" />
      <rect x={percentMediaScreenSize(width,60)} y="33" rx="0" ry="0" width={percentMediaScreenSize(width,70)} height="13" />
      <rect x={percentMediaScreenSize(width,80)} y="33" rx="0" ry="0" width={percentMediaScreenSize(width,81)} height="13" />
      <rect x="11" y="33" rx="0" ry="0" width={percentMediaScreenSize(width,82)} height="13" />

      <rect x="11" y="4" rx="0" ry="0" width={percentMediaScreenSize(width,30)} height="22" />
      
      <rect x="11" y="33" rx="0" ry="0" width={percentMediaScreenSize(width,82)} height="13" />
      <rect x={percentMediaScreenSize(width,60)} y="33" rx="0" ry="0" width={percentMediaScreenSize(width,70)} height="13" />
      <rect x={percentMediaScreenSize(width,80)} y="33" rx="0" ry="0" width={percentMediaScreenSize(width,81)} height="13" />
      <rect x="11" y="33" rx="0" ry="0" width={percentMediaScreenSize(width,82)} height="13" />

      


    </ContentLoader>
  )
}



export default SnippetLoader