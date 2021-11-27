import { useEffect } from 'react'


const Graph = ({}) => {
    async function makeGetRequest(endPoint){
        const otherParam={
          mode: 'cors',
          credentials: 'same-origin',
          //headers:{
          //  "content-type":"application/json; charset=UTF-8"
          //},
          method: "GET"
        };
        const response = await fetch("https://www.workoutdev.org:8002/" + endPoint,otherParam)
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
        const response = await fetch("https://www.workoutdev.org:8002/" + endPoint,otherParam)
        const content = await response.json();
        console.log(content);
        return content
    }
    async function testGraphRunning(){
        await makeGetRequest('get-user-graph/');
        await makePostRequest({user: "matt"}, 'follow-total/');
        await makePostRequest({user: "jack"}, 'follow-total/');
        await makePostRequest({user: "matt", amount: 4}, 'follow-n/');
        await makePostRequest({user: "penny", amount: 4}, 'follow-n/');
        await makePostRequest({user: "matt"}, 'follow-all/');
        await makePostRequest({user: "mateo123"}, 'follow-all/');

        // testing user addition and removal
        await makeGetRequest('get-user-graph/');
        await makePostRequest({user: "johnny"}, 'add-user/');
        await makeGetRequest('get-user-graph/');
        await makePostRequest({user: "johnny"}, 'remove-user/');
        await makeGetRequest('get-user-graph/');

        // testing user relation addition and removal
        await makeGetRequest('get-user-graph/');
        await makePostRequest({user: "matt", follow: "mateo123"}, 'add-user-relation/');
        await makeGetRequest('get-user-graph/');
        await makePostRequest({user: "matt", follow: "mateo123"}, 'remove-user-relation/');
        await makeGetRequest('get-user-graph/');
        await makePostRequest({user: "reggie22", follow: "letsgomets2"}, 'remove-user-relation/');
        await makeGetRequest('get-user-graph/');

        // testing user groups
        await makePostRequest({user: "matt"}, 'get-user-groups/');
        await makePostRequest({user: "penny"}, 'get-user-groups/');
        await makePostRequest({user: "reggie22"}, 'get-user-groups/');
    }
    useEffect(()=> {
        testGraphRunning();
    })
    return (
        <div>
        </div>
    )
}

export default Graph
