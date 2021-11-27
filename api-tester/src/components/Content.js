import { useEffect } from 'react'


const Content = ({}) => {
    async function makeGetRequest(endPoint){
        const otherParam={
          mode: 'cors',
          credentials: 'same-origin',
          //headers:{
          //  "content-type":"application/json; charset=UTF-8"
          //},
          method: "GET"
        };
        const response = await fetch("https://www.workoutdev.org:8000/" + endPoint,otherParam)
        const content = await response.json();
        console.log(content);
    }
    async function makePostRequest(data, endPoint){
        const otherParam={
          mode: 'cors',
          credentials: 'same-origin',
          //headers:{
          //  "content-type":"application/json; charset=UTF-8"
          //},
          body: JSON.stringify(data),
          method: "POST"
        };
        const response = await fetch("https://www.workoutdev.org:8000/" + endPoint,otherParam)
        const content = await response.json();
        console.log(content);
        return content
    }
    async function testContentRunning(){
        await makePostRequest({user: "matt", depth: 10},'content-following/');
        await makePostRequest({user: "matt"},'get-groups/');
    }
    useEffect(()=> {
        testContentRunning();
    })
    return (
        <div>
        </div>
    )
}

export default Content
