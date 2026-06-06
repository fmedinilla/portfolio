function createProjectLink(url, text) {
    const $link = document.createElement("a");
    $link.classList.add("project-card__link");
    $link.target = "_blank";
    $link.href = url;
    $link.textContent = text;
    return $link;
}

function createProjectTag(text) {
    const $tag = document.createElement("span");
    $tag.classList.add("project-card__tag");
    $tag.textContent = text;
    return $tag;
}

function createProjectCard({ name, description, image, links, tags }) {
    const $card = document.createElement("article");
    $card.classList.add("project-card");

    const $image = document.createElement("img");
    $image.classList.add("project-card__image");
    $image.src = image || "https://via.placeholder.com/300x200";
    $image.alt = "Project Image";
    $card.appendChild($image);

    const $cardContent = document.createElement("div");
    $cardContent.classList.add("project-card__content");

    const $title = document.createElement("h3");
    $title.classList.add("project-card__title");
    $title.textContent = name;
    $cardContent.appendChild($title);

    const $description = document.createElement("p");
    $description.classList.add("project-card__description");
    $description.textContent = description;
    $cardContent.appendChild($description);

    const $tags = document.createElement("div");
    $tags.classList.add("project-card__tags");
    tags.forEach(tag => {
        const $tag = createProjectTag(tag);
        $tags.appendChild($tag);
    });
    $cardContent.appendChild($tags);

    const $links = document.createElement("div");
    $links.classList.add("project-card__links");
    links.forEach(element => {
        const $link = createProjectLink(element.url, element.name);
        $links.appendChild($link);
    }); 
    $cardContent.appendChild($links);

    $card.appendChild($cardContent);
    return $card;
}

function createExperienceCard({ title, date, role, tasks }) {
    const $card = document.createElement("div");
    $card.classList.add("experience-card");

    const $title = document.createElement("h3");
    $title.classList.add("experience-card__title");
    $title.textContent = title;

    const $date = document.createElement("span");
    $date.classList.add("experience-card__date");
    $date.textContent = date;

    $title.appendChild($date);
    $card.appendChild($title);

    const $role = document.createElement("p");
    $role.classList.add("experience-card__role");
    $role.textContent = role;
    $card.appendChild($role);

    const $taskList = document.createElement("ul");
    $taskList.classList.add("experience-card__tasks");

    tasks.forEach(task => {
        const $taskItem = document.createElement("li");
        $taskItem.classList.add("experience-card__task-item");
        $taskItem.textContent = task;
        $taskList.appendChild($taskItem);
    });

    $card.appendChild($taskList);

    return $card;
}

const userLang = navigator.language || navigator.userLanguage || "en"; 
const lang = userLang.split('-')[0]; 

fetch(`data.${lang}.json`)
    .then(response => response.json())
    .then(data => {
        const $available = document.querySelector(".hero__availability");
        $available.textContent = data.available;

        const $greeting = document.querySelector(".hero__title");
        $greeting.innerHTML = data.greeting;

        const $description = document.querySelector(".hero__description");
        $description.innerHTML = data.description;

        const $experienceList = document.getElementById("experiencia");
        data.experience.forEach(exp => {
            const $experienceItem = createExperienceCard(exp);
            $experienceList.appendChild($experienceItem);
        });

        const $projectList = document.getElementById("project-list");
        data.projects.forEach(project => {
            const $card = createProjectCard(project);
            $projectList.appendChild($card);
        });

        const $aboutMe = document.querySelector(".about__text-content");
        data.aboutme.forEach(paragraph => {
            const $paragraph = document.createElement("p");
            $paragraph.classList.add("about__paragraph");
            $paragraph.textContent = paragraph;
            $aboutMe.appendChild($paragraph);
        });
    })
    .catch(error => console.error("Error fetching data:", error));