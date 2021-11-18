import { useState } from 'react'

// this will likely be changed drastically in the future, just ignore it for now.
const AddTask = ({ onAdd }) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)
    const [data, setData] = useState('')
    const onSubmit = (e) => {
        e.preventDefault()

        if(!text){
            alert('Please add a task')
        }

        onAdd({ text, day, reminder, data })
        setText('')
        setDay('')
        setData('')
        setReminder(false)
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Content</label>
                <input type='text' placeholder='Add Content' value={data} onChange={(e) => setData(e.target.value)}/>
            </div>
            <input className='btn btn-block' type='submit' value='Create' />
        </form>
    )
}

export default AddTask
