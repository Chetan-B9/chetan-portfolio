"use strict";
let storedProjectId = localStorage.getItem("projectId");
console.log(storedProjectId);

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

    const techImages = {
        "HTML" : "./Icons/skills icons/html-5-svgrepo-com.webp",
        "CSS" : "./Icons/skills icons/css3-svgrepo-com.webp",
        "Bootstrap" : "./Icons/skills icons/bootstrap.webp",
        "JavaScript" : "./Icons/skills icons/js.webp",
        "PHP" : "./Icons/skills icons/php.webp",
        "MySQL" : "./Icons/skills icons/mysql.webp",
        "React" : "./Icons/skills icons/react.webp"
    }

    reponsedData.forEach(project => {
        if(project.projectId === storedProjectId){
            projectName.innerHTML = project.projectName;
            description.innerHTML = project.description;
            goal.innerHTML = project.goal;
            role.innerHTML = project.myRole;
            projectVideo.src = project.video;
            githubLink.href = project.github;

            project.usedTechnologies.forEach(tech => {
                if(tech in techImages){
                    const techContainer = document.createElement('div');
                    techContainer.className = "tech";
                    techContainer.setAttribute("data-bs-toggle", "tooltip");
                    techContainer.setAttribute("data-bs-placement", "top");
                    techContainer.setAttribute("data-bs-title", `${tech}`);
                    techContainer.innerHTML = `<img src="${techImages[tech]}" alt="${tech} Icon">`;
                    technologies.appendChild(techContainer);
                    
                }
            })

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

            if("video" in project){
                icon.className = "fa-solid fa-circle-play";
                iconTitle.innerHTML = "Watch Output";
            }
            else if("liveLink" in project){
                link1.removeAttribute('data-bs-toggle');
                link1.removeAttribute('data-bs-target');
                icon.className = "fa-solid fa-globe";
                iconTitle.innerHTML = "View Live";
            }
        }
        
    })
}

document.addEventListener('DOMContentLoaded', fetchData);