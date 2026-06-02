function createProjectLink(url, text) {
    const $link = document.createElement("a");
    $link.classList.add("project-card__link");
    $link.target = "_blank";
    $link.href = url;
    $link.textContent = text;
    return $link;
}

function createProjectCard({ name, description, image, links }) {
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

fetch("projects.json")
    .then(response => response.json())
    .then(data => {
        const $projectList = document.getElementById("project-list");
        data.forEach(project => {
            const $card = createProjectCard(project);
            $projectList.appendChild($card);
        });
    })
    .catch(error => console.error("Error fetching projects:", error));

