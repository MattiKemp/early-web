
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
    return content;
}

test('Check following endpoints.', async () => {
    expect((await makePostRequest({user: "matt"}, 'follow-total/')).total).toBe(4);
    expect((await makePostRequest({user: "jack"}, 'follow-total/')).total).toBe(3);
});

test('Check get following endpoints.', async () => {
    //console.log((await makePostRequest({user: "matt", amount: 4}, 'follow-n/')).following);
    expect((await makePostRequest({user: "matt", amount: 4}, 'follow-n/')).following).toEqual(['penny', 'hinoob22', 'jack', 'reggie22']);
    expect((await makePostRequest({user: "penny", amount: 4}, 'follow-n/')).following).toEqual(['mateo123', 'reece', 'matt', 'letsgomets2']);
    expect((await makePostRequest({user: "matt"}, 'follow-all/')).following).toEqual(['penny', 'hinoob22', 'jack', 'reggie22']);
    expect((await makePostRequest({user: "mateo123"}, 'follow-all/')).following).toEqual(['jack', 'weast', 'reggie22', 'letsgomets2']);
});


