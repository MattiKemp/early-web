import React, {Suspense} from 'react'
import {useImage} from 'react-image'
 
const Image = ({source}) => {
  const {src} = useImage({
    srcList: source,
  })
 
  return <img src={src} style={{width:'100%'}}/>
}
 
export default function MyComponent({source}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Image source={source}/>
    </Suspense>
  )
}