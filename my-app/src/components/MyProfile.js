import { useState, useEffect } from 'react'

// Component for the user profile page
// Properties:
// onAdd: ??
// url: ??
// info: ??
// select: whether the page is currently selected (boolean)
// creds: user credentials (array of strings)
const MyProfile = ({ onAdd, url, info, select, creds}) => {
    const [edit, setEdit] = useState(false)
    const [picture, setPicture] = useState('https://www.thesprucepets.com/thmb/e0qbZ-sQwW9Sftl7M8BEVW71cYQ=/1080x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/31878200_171911650157470_2552192489247211520_n-5ba0559b4cedfd0025a1b9ac.jpg')
    const [first, setFirst] = useState('')
    const [last, setLast] = useState('')
    const [description, setDescription] = useState('')
    const [prevValues, setPrevValues] = useState(['','',''])
    const [fetchProfileContent, setfetchProfileContent] = useState(true)

    const onSubmit = (e) => {
        e.preventDefault()
        setEdit(!edit)
    }

    const onEdit = () => {
        setPrevValues([first, last, description])
        setEdit(!edit);
    }

    const onCancel = () => {
        setFirst(prevValues[0])
        setLast(prevValues[1])
        setDescription(prevValues[2])
        setEdit(!edit)
    }

    async function fetchContentProfile(){
        if(true){
        //   console.log('fetching my profile content');
          const Data={
            user: creds[0]
          }
          const otherParam={
            mode: 'cors',
            credentials: 'same-origin',
            //headers:{
            //  "content-type":"application/json; charset=UTF-8"
            //},
            body: JSON.stringify(Data),
            method: "POST"
          };
          const response = await fetch("https://10.0.0.5:8000/content-profile/",otherParam)
          const content = await response.json();
          if(content !== null){
            // console.log(content);
            setPicture("https://10.0.0.5:8001/media/images/" + content.picture)
            setFirst(content.first)
            setLast(content.last)
          }
          // setfetchFollowContent(false);
        }
      }

    useEffect(() => {
        if(select === true && fetchProfileContent === true){
            fetchContentProfile()
            setfetchProfileContent(false)
        }
    });

    return (
        <div className="profile-content">
            {select && <div>
                {edit && <form className='add-form' onSubmit={onSubmit}>
                    <div className='form-control'>
                        <label>First Name</label>
                        <input type='text' placeholder='First' value={first} onChange={(e) => setFirst(e.target.value)}/>
                    </div>
                    <div className='form-control'>
                        <label>Last Name</label>
                        <input type='text' placeholder='Last' value={last} onChange={(e) => setLast(e.target.value)}/>
                    </div>
                    <div className='form-control'>
                        <label>About Me</label>
                        <input type='text' placeholder='About' value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <input className='btn btn-block' type='submit' value='Update' />
                    <input className='btn btn-block' type='button' value='Cancel' onClick={() => onCancel()}/>
                </form>}
                {!edit && <div>
                    <img src={picture} width="150px"></img>
                    <h1>{first}</h1>
                    <h1>{last}</h1>
                    <h2>{description}</h2>
                    <input className='btn btn-block' type='button' value='Edit Profile' onClick={() => onEdit()}/>
                </div>}
            </div>}
        </div>
    )
}

export default MyProfile
