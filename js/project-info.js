"use strict";
// accessing project id stored in local storage by projects.html to show the details of the choosen project. 
let storedProjectId = localStorage.getItem("projectId");

// function to get project data from projects-data.json file.
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

// function to fetch the received project data.
async function fetchData(){
    const reponsedData = await projectData();

    const projectName = document.getElementById('project-name');
    const description = document.getElementById('description-text');
    const goal = document.getElementById('goal-text');
    const role = document.getElementById('role-text');
    const projectVideo = document.getElementById('project-video');
    const icon = document.getElementById('icon');
    const link1 = document.getElementById('link-1');
    const iconTitle = document.getElementById('icon-title');
    const githubLink = document.getElementById('github-link');
    const technologies = document.getElementById('tech-container');
    const slider = document.getElementById('carousel_inner');

    // object which holds images of skills.
    const techImages = {
        "HTML" : "./Icons/skills icons/html-5-svgrepo-com.webp",
        "CSS" : "./Icons/skills icons/css3-svgrepo-com.webp",
        "Bootstrap" : "./Icons/skills icons/bootstrap.webp",
        "JavaScript" : "./Icons/skills icons/js.webp",
        "PHP" : "./Icons/skills icons/php.webp",
        "MySQL" : "./Icons/skills icons/mysql.webp",
        "React" : "./Icons/skills icons/react.webp"
    }

    const showFeatures = (features) => {
        document.getElementById('features-container').innerHTML = `
            <h5 class="section-headings">Features</h5>
            <ul class="mt-4" id="features"></ul>
        `
        const featuresContainer = document.getElementById('features');
        features.forEach((feature) => {
            featuresContainer.innerHTML += `<li>${feature}</li>`;
        })
        
    }

    // Accessing object of choosen project id
    reponsedData.forEach(project => {
        // if project id from json file and project id which is stored in local storage is match then fetch the access project data one-by-one and display.
        if(project.projectId === storedProjectId){  
            projectName.innerHTML = project.projectName;
            description.innerHTML = project.description;
            goal.innerHTML = project.goal;
            project.features.length !== 0 && showFeatures(project.features);
            role.innerHTML = project.myRole;
            projectVideo.src = project.video;

            if(project.github !== "not accessable") {
                githubLink.href = project.github;
             } else {
                githubLink.addEventListener('click', () => alert("Sorry! This project repository is not accessable by visitors!"));
             } 

            // According to the skills name placed in json file displaying the images of those skills.
            project.usedTechnologies.forEach(tech => {
                if(tech in techImages){
                    // creating dynamic division for each skill, in that division images will be displayed. 
                    const techContainer = document.createElement('div');
                    techContainer.className = "tech";
                    techContainer.setAttribute("data-bs-toggle", "tooltip");
                    techContainer.setAttribute("data-bs-placement", "top");
                    techContainer.setAttribute("data-bs-title", `${tech}`);
                    techContainer.innerHTML = `<img src="${techImages[tech]}" alt="${tech} Icon">`;
                    technologies.appendChild(techContainer);
                    
                }
            })

            // Fetching screenshots from json file.
            project.screenshots.forEach((screenshot, index) => {
              const carouselItem = document.createElement('div');
              (index === 0) ? carouselItem.className = "carousel-item active" : carouselItem.className = "carousel-item";
              const imageContainer = document.createElement('div');
              imageContainer.className = "img_container d-block w-100";
              imageContainer.setAttribute("style", "height: 25rem;");
              imageContainer.innerHTML = `<img src = "${screenshot}" alt="" />`;
            
            carouselItem.appendChild(imageContainer);
              slider.appendChild(carouselItem);
            });

            // if project doesn't containe hosted/live link of project then display video icon other wise display link icon. 
            if("video" in project){
                icon.className = "fa-solid fa-circle-play";
                iconTitle.innerHTML = "Watch Output";
            }
            else if("liveLink" in project){
                link1.removeAttribute('data-bs-toggle');
                link1.removeAttribute('data-bs-target');
                icon.className = "fa-solid fa-globe";
                iconTitle.innerHTML = "View Live";
                link1.href = project.liveLink;
            }
        }
        
    })
}

document.addEventListener('DOMContentLoaded', fetchData); // when the HTML is compleatly loaded on that time the fetchData() will be executed.
