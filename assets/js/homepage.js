var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

const getUserRepos = (user) =>{
    //format the github api url
    let apiUrl = "https://api.github.com/users/" + user + "/repos";

    //make a request to the url
    fetch(apiUrl).then((response)=>{
        if(response.ok) {
            response.json().then((data)=>{
            displayRepos(data, user)
            })
        } else {
            alert('Error: Github User Not Found')
        }

    })
    .catch((error)=>{
        alert("Unable to connect to GitHub");
    })

}


const formSubmitHandler = function(event) {
    event.preventDefault();

    let username = nameInputEl.value.trim()
    console.log(username)

    if(username) {
        getUserRepos(username)
        nameInputEl.value=""
    } else {
        alert('please enter a Github username')
    }
}

const displayRepos = (repos, searchTerm) => {
    // check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }

    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;


    // loop over repos
    for (var i = 0; i < repos.length; i++) {
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;
    
        // create a container for each repo
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);
    
        // create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;
    
        // append to container
        repoEl.appendChild(titleEl);


        // create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
        statusEl.innerHTML =
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
        statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append to container
        repoEl.appendChild(statusEl);


    
        // append container to the dom
        repoContainerEl.appendChild(repoEl);
  }
}


// https://api.github.com/users/blessingi/repos
userFormEl.addEventListener("submit", formSubmitHandler);