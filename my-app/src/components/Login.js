import { useState } from 'react'
import Button from './Button'

const Login = ({ onSignIn, onSignUp }) => {
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [first, setFirst] = useState('')
    const [last, setLast] = useState('')
    const [phone, setPhone] = useState('')
    const [remember, setRemember] = useState(false)
    const [signUp, setSignUp] = useState(false)
    
    const onSubmit = (e) => {
        e.preventDefault()

        if(!user){
            alert('Please add a username')
        }

        if(!pass){
            alert('Please enter a password')
        }
        if(!signUp){
            var result = onSignIn([user, pass, remember])
            //setUser('')
            setPass('')
            //setRemember(false)
        }
        else {
            if(!first){
                alert('Please enter a first name')
            }
            if(!last){
                alert('Please enter a last name')
            }
            var result = onSignUp([user, pass, first, last, phone])
            setPass('')
            setFirst('')
            setLast('')
            setPhone('')
        }
    }
    //this is gross, change this later
    const changeSignUp = () => {
        setSignUp(!signUp);
    }

    return (
        <div>
            <form className='add-form' onSubmit={onSubmit}>
                <div className='form-control'>
                    <label>Username</label>
                    <input type='text' placeholder='Username' value={user} onChange={(e) => setUser(e.target.value)}/>
                </div>
                <div className='form-control'>
                    <label>Password</label>
                    <input type='text' placeholder='Password' value={pass} onChange={(e) => setPass(e.target.value)}/>
                </div>
                {signUp && <div className='form-control'>
                    <label>First Name</label>
                    <input type='text' placeholder='FirstName' value={first} onChange={(e) => setFirst(e.target.value)}/>
                </div>}
                {signUp && <div className='form-control'>
                    <label>Last Name</label>
                    <input type='text' placeholder='LastName' value={last} onChange={(e) => setLast(e.target.value)}/>
                </div>}
                {signUp && <div className='form-control'>
                    <label>Phone Number (Optional)</label>
                    <input type='text' placeholder='PhoneNumber' value={phone} onChange={(e) => setPhone(e.target.value)}/>
                </div>}
                {!signUp && <div className='form-control-check'>
                    <label>Remember Me</label>
                    <input type='checkbox' checked={remember} value={remember} onChange={(e) => setRemember(e.currentTarget.checked)}/>

                </div>}
                <input className='btn btn-block' type='submit' value='Login' />
            </form>
            <input className='btn btn-block' type='button' value="Sign Up" onClick={() => changeSignUp()}/>
        </div>
    )
}

export default Login
