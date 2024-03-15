//Function to get data from projects-data.json file into projecrs.js file.
async function projectData(){
    try{
        const response = await fetch("projects-data.json"); // fetching json data in to response variable.
        const data = await response.json(); // making json data (project data) in to javascript objecct. 
        return data; // returning project data which is in javascript object formate.
    }
    catch(error){  // if fetching process faild then this catch block will exicute.
        console.error("Error in Fetching data : ", error);
    }
}

// The function who truncate the string 
const strTruncator = (str, maxLength) => {
    return (str.length > maxLength) ? str.substring(0, maxLength).trim()+"<span>....</span>" : str;
}

// creating a function which creates dynamic project cards for each project.
async function createCard(){
    const cardContainer = document.getElementById('cards-container');
    const data = await projectData(); // json to object converted data which is returned by projectData() function.

    data.forEach(project => {
        // creating dynamic cards for each projects and displaying those data which is received by projects-data.json file.
        const column = document.createElement('div');
        column.className = "col";
        cardContainer.appendChild(column);

        const card = document.createElement('div');
        card.className = "project_card card text-light";
        card.setAttribute('data-aos', "fade-up");
        column.appendChild(card);

        const container = document.createElement('div');
        container.className = "container";
        container.innerHTML = `<img src = "${project.thumbnail}" alt="" />`;
        card.appendChild(container);

        const cardBody = document.createElement('div');
        cardBody.className = "card-body";
        cardBody.innerHTML = `
           <div class="card_title_container">
             <h5 class="card-title">${strTruncator(project.projectName, 34)}</h5>
           </div>
           <div class="card_text_container">
             <p class = "card-text">${strTruncator(project.description, 145)}</p>
           </div>
           <hr>`;
        card.appendChild(cardBody);

        const cardButton = document.createElement('button');
        cardButton.className = "btn button w-100";
        cardButton.setAttribute("onclick", `redirect("${project.projectId}")`);
        cardButton.innerHTML = "View Project";
        cardBody.appendChild(cardButton);
    })
}

document.addEventListener('DOMContentLoaded', createCard);

// redirect function for, when a user click on a view project button, they redirect to project-info.html file and also store the project id in the local storage to identify which project is user want to see. 
const redirect = (id) => {
    localStorage.setItem("projectId", id);
    location.href = "project-info.html";
}

