const repositoryList = document.querySelector("#repository-list");

function createRepositoryCard(repository) {
  const item = document.createElement("li");
  item.className = "repository-card";

  const link = document.createElement("a");
  link.className = "repository-name";
  link.href = repository.url;
  link.textContent = repository.name;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  const description = document.createElement("p");
  description.className = "repository-description";
  description.textContent = repository.description;

  const meta = document.createElement("div");
  meta.className = "repository-meta";

  const language = document.createElement("span");
  language.textContent = repository.language;

  const stars = document.createElement("span");
  stars.textContent = `${repository.stars.toLocaleString()} stars`;

  meta.append(language, stars);
  item.append(link, description, meta);

  return item;
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Could not load repositories (${response.status}).`);
    }

    const repositories = await response.json();
    if (!Array.isArray(repositories)) {
      throw new Error("Repository data must be a list.");
    }

    repositoryList.replaceChildren(...repositories.map(createRepositoryCard));
    if (repositories.length === 0) {
      const message = document.createElement("li");
      message.className = "message";
      message.textContent = "No repositories to show yet.";
      repositoryList.replaceChildren(message);
    }
  } catch (error) {
    console.error("Unable to load starred repositories:", error);
    const message = document.createElement("li");
    message.className = "message message-error";
    message.textContent = "Repositories could not be loaded. Please try again later.";
    repositoryList.replaceChildren(message);
  }
}

loadRepositories();
