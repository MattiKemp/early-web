import React, {Suspense} from 'react'
import {useImage} from 'react-image'
 
const Image = ({source, profileStyle}) => {
  const {src} = useImage({
    srcList: source,
  })
  return <img src={src} className={`${profileStyle == 1 ? 'profile-pic-small' : 'thumbnail-pic'}`}/>
}
 

export default function MyComponent({source, profileStyle}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Image source={source} profileStyle={profileStyle}/>
    </Suspense>
  )
}