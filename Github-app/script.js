const apiBaseURL = `https://api.github.com/users`; //this is the end point we can add the path


function errorMessage(status) { //catch the sts from err(reponse.sts)
    const messageDiv = document.querySelector("#message");//select the div ele
    let errmsg = ``; //initilyy its empty
    if (status === 404) {
        errmsg = `<div class="alert alert-danger text-center">Profile doesn't exist.</div>`;
    }

    messageDiv.innerHTML = errmsg;//put that above html ele in msgdiv
    setTimeout(() => (messageDiv.innerHTML = ``), 5000);//set timout  after that its in empty
}
//get github profile
const getGitHubProfile = async (login) => { //fetchinfg the data from website,username is pass in as login thats why we uses login
    try {
        const response = await fetch(`${apiBaseURL}/${login}`); //add the url
        if (response.status !== 200) {  
            if (response.status === 404) {
                errorMessage(response.status);// if its !=200 & ==404 its display errormsg
            }
            new Error(`Something went wrong! Status Code: ${response.status}`);//it give with sts code
        }

        const data = await response.json();//if it equalto 200 it convert the data into json format
        return data;

    } catch (error) { //catch the error we throw
        console.log(error);
    }
}

const getGitRepos = async (login) => {
    try {
        const response = await fetch(`${apiBaseURL}/${login}/repos`);// same but fetch the user along with repo what he have
        if (response.status !== 200) {
            new Error(`Something went wrong! Status Code: ${response.status}`);

        }
        const data = await response.json();
        return data; //simply return data whatevere data was fetch
    } catch (error) {
        console.log(error);
    }
};
///its for display
const renderProfile = (data) => { //after fetching the data it comes to render
    let profileSnnipet = ``;
      //its same as profilesnippet = profilesnipet +'html part',avater is profilepicture of user
    profileSnnipet += `
               <div class="profile-userpic">
                 <img src="${data.avatar_url}" class="d-block">
               </div>
               <div class="profile-usertitle">
  `;

    if (data.name !== null) { //if notequalto null pass the same
        profileSnnipet += `<div class="profile-usertitle-name">${data.name}</div>`//fill with name
    }
    //its for followers & following
    profileSnnipet += `
            <div class="profile-usertitle-job"> 
            ${data.login}
            </div>
            </div>
            <div class="portlet light bordered">
            <!-- STAT -->
            <div class="row list-separated profile-stat">
            <div class="col-md-6 col-sm-6 col-xs-6" >
                 <div class="uppercase profile-stat-title">${data.followers}</div>
                 <div class="uppercase profile-stat-text">Followers</div>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-6">
            <div class="uppercase profile-stat-title">${data.following}</div>
            <div class="uppercase profile-stat-text">Following</div>
            </div>
            </div>
    `;
    if (data.bio !== null) {
        profileSnnipet += `<div><h4 class="profile-desc-title">About ${data.name}</h4>
        <span class="profile-desc-text">${data.bio}</span></div>`;

    }
    //if its not null disply the content bcz its null in API
    if (data.twitter_username !== null) {
        profileSnnipet += `<div class="margin-top-20 profile-desc-link">
        <i class="fab fa-twitter"></i>
        <a target="_blank" href="https://www.twitter.com/${data.twitter_username}">@${data.twitter_username}</a>
        </div>`;
    }

    profileSnnipet += `</div>`;//thats close div for line 54
    document.querySelector("#profile").innerHTML = profileSnnipet;//add the profilesnnipet to profile
};


// list git repos
const listRepos = (repos) => { //get the repo data from getrepofn
    let reposList = ``;//initially set as empty
    if (repos.length > 0) {
        repos.forEach((repo) => { //simply iterate over all the repo
            reposList += `<li class="mb-3 d-flex flex-content-stretch col-12 col-md-6 col-lg-6">
            <div class="card" style="width: 22.5rem;">
              <div class="card-body">
              <h5 class="card-title"><a target="_blank" href="${repo.html_url}">${repo.name}</a></h5>
              
              <p class="card-text">${repo.description !== null ? repo.description : ""}</p>
              <p>`;
            if (repo.language !== null) {//if language exist it display langiage
                reposList += `
                     <i class="fas fa-circle ${repo.language ? repo.language.toLowerCase() : ""}"></i> ${repo.language}
                `;
            }

            reposList += `<i class="far fa-star"></i> ${repo.stargazers_count}</p>
            </div>
            </div>
            </li>`;
        })
    }

    document.querySelector("#repos").innerHTML = reposList;
};

document.addEventListener("DOMContentLoaded", () => { //if the page is loaded it will call the fn
    const searchForm = document.querySelector("#searchForm");
    searchForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const searchInput = document.querySelector("#searchInput");//fetch the value enter by users
        const gitHubLogin = searchInput.value.trim();//its remove all the whitespaces

        if (gitHubLogin.length > 0) {
            const userProfile = await getGitHubProfile(gitHubLogin);//returnd profile data of users
            if (userProfile.login) { //if data exist it call the fn
                const gitRepos = await getGitRepos(gitHubLogin);
                renderProfile(userProfile); //render the profile
                listRepos(gitRepos);
                document.querySelector(".searchblock").style.display = "none"; //after click searchits gone hiddden
                document.querySelector(".profile").style.display = "block"; //profile part is displayed
            }
        }
    })
})