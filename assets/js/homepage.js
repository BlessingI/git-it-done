let response = "https://api.github.com/users/octocat/repos"


let getUserRepos = () =>{
    fetch(response)
}

getUserRepos()