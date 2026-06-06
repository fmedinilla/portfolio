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

function load(lang) {
    fetch(`data.${lang}.json`)
        .then(response => response.json())
        .then(data => {
            // NAVBAR
            const $navbar = document.querySelector(".navbar__list");
            $navbar.children[0].children[0].textContent = data.home;
            $navbar.children[1].children[0].textContent = data["experience_title"];
            $navbar.children[2].children[0].textContent = data["projects_title"];
            $navbar.children[3].children[0].textContent = data["about_title"];

            const $available = document.querySelector(".hero__availability");
            $available.textContent = data.available;

            const $greeting = document.querySelector(".hero__title");
            $greeting.innerHTML = data.greeting;

            const $description = document.querySelector(".hero__description");
            $description.innerHTML = data.description;


            // EXPERIENCE
            const $experienceList = document.getElementById("experiencia");
            $experienceList.innerHTML = "";

            const $experienceTitle = document.createElement("h2");
            $experienceTitle.classList.add("section__title");
            $experienceTitle.textContent = data["experience_title"];
            $experienceList.appendChild($experienceTitle);
            data.experience.forEach(exp => {
                const $experienceItem = createExperienceCard(exp);
                $experienceList.appendChild($experienceItem);
            });


            // PROJECTS
            const $projects = document.getElementById("proyectos");
            $projects.innerHTML = "";

            const $projectTitle = document.createElement("h2");
            $projectTitle.classList.add("section__title");
            $projectTitle.textContent = data["projects_title"];
            $projects.appendChild($projectTitle);

            const $projectList = document.createElement("div");
            $projectList.classList.add("project-list");
            $projects.appendChild($projectList);

            data.projects.forEach(project => {
                const $card = createProjectCard(project);
                $projectList.appendChild($card);
            });


            // ABOUT ME
            const $aboutMe = document.getElementById("sobre-mi");
            $aboutMe.innerHTML = "";

            const $aboutTitle = document.createElement("h2");
            $aboutTitle.classList.add("section__title");
            $aboutTitle.textContent = data["about_title"];
            $aboutMe.appendChild($aboutTitle);

            const $about = document.createElement("article");
            $about.classList.add("about");
            $aboutMe.appendChild($about);

            const $aboutContent = document.createElement("div");
            $aboutContent.classList.add("about__text-content");
            $about.appendChild($aboutContent);

            data.aboutme.forEach(paragraph => {
                const $paragraph = document.createElement("p");
                $paragraph.classList.add("about__paragraph");
                $paragraph.textContent = paragraph;
                $aboutContent.appendChild($paragraph);
            });

            const $aboutImg = document.createElement("img");
            $aboutImg.classList.add("about__image");
            $aboutImg.src = "images/yo.jpg";
            $aboutImg.alt = "About Me Image";
            $about.appendChild($aboutImg);
        })
        .catch(error => console.error("Error fetching data:", error));
}

const userLang = navigator.language || navigator.userLanguage || "en";
const lang = userLang.split('-')[0];

document.addEventListener("DOMContentLoaded", () => load(lang));

const $langSelect = document.getElementById("lang-select");
$langSelect.value = lang;

$langSelect.addEventListener("change", (event) => {
    const selectedLang = event.target.value;
    load(selectedLang);
});

