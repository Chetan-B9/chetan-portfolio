// script for fetching project data from json file 
document.addEventListener('DOMContentLoaded', ()=>{
    fetch("projects-data.json")
       .then(response => response.json())
       .then(data => {
        displayProjectData(data);
       })
       .catch(error => {
        console.error("Error to fetch data", error);
       })
  
    const displayProjectData = (projectData) =>{
      
      let p1Image = document.querySelector('#card_image1');
      let p1ProjectName = document.querySelector('#card_title1');
      let p1Description = document.querySelector('#card_text1');
      let p1ViewButton = document.querySelector('#view-button1');
  
      let p2Image = document.querySelector('#card_image2');
      let p2ProjectName = document.querySelector('#card_title2');
      let p2Description = document.querySelector('#card_text2');
      let p2ViewButton = document.querySelector('#view-button2');

  
      let p3Image = document.querySelector('#card_image3');
      let p3ProjectName = document.querySelector('#card_title3');
      let p3Description = document.querySelector('#card_text3');
      let p3ViewButton = document.querySelector('#view-button3');

  
      p1Image.src = `${projectData[0].thumbnail}`;
      p1ProjectName.innerHTML = projectData[0].projectName;
      p1Description.innerHTML = projectData[0].description;
      p1ViewButton.setAttribute("onclick", `localStorage.setItem("projectId", "${projectData[0].projectId}")`);

  
      p2Image.src = `${projectData[1].thumbnail}`;
      p2ProjectName.innerHTML = projectData[1].projectName;
      p2Description.innerHTML = projectData[1].description;
      p2ViewButton.setAttribute("onclick", `localStorage.setItem("projectId", "${projectData[1].projectId}")`);

  
      p3Image.src = `${projectData[2].thumbnail}`;
      p3ProjectName.innerHTML = projectData[2].projectName;
      p3Description.innerHTML = projectData[2].description;
      p3ViewButton.setAttribute("onclick", `localStorage.setItem("projectId", "${projectData[2].projectId}")`);
        
    }

    const sillsContainer = document.getElementById('skills-container');
    const mySkills = ["HTML", "CSS", "Bootstrap", "JavaScript", "React", "PHP", "MySQL", "GitHub"];
    const mySkillsIcons = {
      "HTML" : "./Icons/skills icons/html-5-svgrepo-com.webp",
      "CSS" : "./Icons/skills icons/css3-svgrepo-com.webp",
      "Bootstrap" : "./Icons/skills icons/bootstrap.webp",
      "JavaScript" : "./Icons/skills icons/js.webp",
      "PHP" : "./Icons/skills icons/php.webp",
      "MySQL" : "./Icons/skills icons/mysql.webp",
      "React" : "./Icons/skills icons/react.webp",
      "GitHub" : "./Icons/skills icons/github.webp"
    };

    const skillScores = {
      "HTML" : 80,
      "CSS" : 80,
      "Bootstrap" : 75,
      "JavaScript" : 65,
      "PHP" : 70,
      "MySQL" : 55,
      "React" : 50,
      "GitHub" : 50
    }

    mySkills.forEach(skill => {
      if(skill in mySkillsIcons){
        let skillCount = 1;
        const column = document.createElement('div');
        column.className = "col";
        column.innerHTML = `
        <div class="skill-${skillCount} skill px-3">
        <img
          src="${mySkillsIcons[skill]}"
          alt="${skill} logo"
        />
        <p>${skill}</p>
        <div
          class="progress w-100"
          role="progressbar"
          aria-label="Example with label"
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
          style="height: 0.8rem"
        >
          <div class="progress-bar" id = "progress_bar" style="width: ${skillScores[skill]}%">${skillScores[skill]}%</div>
        </div>
      </div>
        `;

        sillsContainer.appendChild(column);
        skillCount++;
      }

      
    })
  });
