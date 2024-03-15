// script for fetching project data from json file
document.addEventListener("DOMContentLoaded", () => {
  // Getting project data from projcts-data.json file.
  fetch("projects-data.json")
    .then((response) => response.json())
    .then((data) => {
      displayProjectData(data);
    })
    .catch((error) => {
      console.error("Error to fetch data", error);
    });

  // The function who truncate the string
  const strTruncator = (str, maxLength) => {
    return str.length > maxLength
      ? str.substring(0, maxLength).trim() + "<span>....</span>"
      : str;
  };

  // function to fetch the received project data on 'projects section' of index.html page.
  const displayProjectData = (projectData) => {
    let p1Image = document.querySelector("#card_image1");
    let p1ProjectName = document.querySelector("#card_title1");
    let p1Description = document.querySelector("#card_text1");
    let p1ViewButton = document.querySelector("#view-button1");

    let p2Image = document.querySelector("#card_image2");
    let p2ProjectName = document.querySelector("#card_title2");
    let p2Description = document.querySelector("#card_text2");
    let p2ViewButton = document.querySelector("#view-button2");

    let p3Image = document.querySelector("#card_image3");
    let p3ProjectName = document.querySelector("#card_title3");
    let p3Description = document.querySelector("#card_text3");
    let p3ViewButton = document.querySelector("#view-button3");

    // function who pass project data to the project cards
    const passProjectData = (index, image, projectName, description, viewButton) => {
      image.src = `${projectData[index].thumbnail}`;
      projectName.innerHTML = strTruncator(projectData[index].projectName, 28);
      description.innerHTML = strTruncator(projectData[index].description, 142);
      viewButton.setAttribute(
        "onclick",
        `localStorage.setItem("projectId", "${projectData[index].projectId}")`
      );
    };

    // Displaying project data on project card 1.
    passProjectData(0, p1Image, p1ProjectName, p1Description, p1ViewButton);

    // Displaying project data on project card 2.
    passProjectData(1, p2Image, p2ProjectName, p2Description, p2ViewButton);

    // Displaying project data on project card 3.
    passProjectData(2, p3Image, p3ProjectName, p3Description, p3ViewButton);
  };

  // script for skills section.
  const sillsContainer = document.getElementById("skills-container");
  const mySkills = [
    "HTML",
    "CSS",
    "Bootstrap",
    "JavaScript",
    "React",
    "PHP",
    "MySQL",
    "GitHub",
  ];
  
  const mySkillsIcons = {
    HTML: "Icons/skills icons/html-5-svgrepo-com.webp",
    CSS: "Icons/skills icons/css3-svgrepo-com.webp",
    Bootstrap: "Icons/skills icons/bootstrap.webp",
    JavaScript: "Icons/skills icons/js.webp",
    PHP: "Icons/skills icons/php.webp",
    MySQL: "Icons/skills icons/mysql.webp",
    React: "Icons/skills icons/react.webp",
    GitHub: "Icons/skills icons/github.webp",
  };

  const skillScores = {
    HTML: 80,
    CSS: 80,
    Bootstrap: 75,
    JavaScript: 65,
    PHP: 70,
    MySQL: 55,
    React: 50,
    GitHub: 50,
  };

  // creating dynamic divisions for each skills and displaying skills image, name, and score of that skill.
  mySkills.forEach((skill) => {
    if (skill in mySkillsIcons) {
      let skillCount = 1;
      const column = document.createElement("div");
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
  });
});
