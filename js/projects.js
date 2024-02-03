async function projectData(){
    try{
        const response = await fetch("projects-data.json");
        const data = await response.json();
        return data;
    }
    catch(error){
        console.error("Error in Fetching data : ", error);
    }
}

async function createCard(){
    const cardContainer = document.getElementById('cards-container');
    const data = await projectData();

    data.forEach(project => {
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
             <h5 class="card-title">${project.projectName}</h5>
           </div>
           <div class="card_text_container">
             <p class = "card-text">${project.description}</p>
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


const redirect = (id) => {
    localStorage.setItem("projectId", id);
    location.href = "project-info.html";
}

