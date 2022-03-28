let getUserRepos = (user) =>{
    //format the github api url
    let apiUrl = "https://api.github.com/users/" + user + "/repos";

    //make a request to the url
    fetch(apiUrl).then((response)=>{
        response.json().then((data)=>{
            console.log(data)
        })
    })
}


getUserRepos("microsoft")