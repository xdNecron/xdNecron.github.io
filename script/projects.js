const textDiv = document.getElementById("text");

const repos = [
  "vscode-jumper",
  "dotfiles"
];

function renderContent(data) {
  // create a span for each repo
  const repoEntry = textDiv.appendChild(document.createElement("div"));
  repoEntry.className = "repo-entry"

  // render repo name as heading and put it inside <a>
  // heading format: <repo-name> <version>
  const repoHeadingSpan = repoEntry.appendChild(document.createElement("span"));
  repoHeadingSpan.className = "heading-span";

  const repoLink = repoHeadingSpan.appendChild(document.createElement("a"));
  repoLink.setAttribute("href", data.url);
  repoLink.setAttribute("target", "_blank")

  const repoHeading = repoLink.appendChild(document.createElement("h2"));
  repoHeading.innerText = data.name;

  console.log(data.tagName);

  if (data.tagName) {
    const repoVersionTag = repoHeadingSpan.appendChild(document.createElement("p"));
    repoVersionTag.className = "version-tag"
    repoVersionTag.innerText = data.tagName;
  }

  const repoContent = repoEntry.appendChild(document.createElement("span"));
  repoContent.className = "repo-content";

  // render repo description
  const repoTextSpan = repoContent.appendChild(document.createElement("span"));
  repoTextSpan.className = "text-span";

  const repoDesc = repoContent.appendChild(document.createElement("p"));
  repoDesc.innerText = data.description;

  // add latest version, latest commit hash, message, and date
  const commitInfoSpan = repoContent.appendChild(document.createElement("span"));
  commitInfoSpan.className = "commit-span";

  const commitHash = commitInfoSpan.appendChild(document.createElement("small"));
  commitHash.innerText = data.commitHash.slice(0, 6) + ":";

  const commitMessageContent = data.commitMessage;

  const updateDate = new Date(data.commitDate);
  const updateDateOptions = {
    era: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const updateDateContent = updateDate.toLocaleString("us-US", updateDateOptions);

  const commitMessageDate = commitInfoSpan.appendChild(document.createElement("small"));
  commitMessageDate.innerHTML = `<i>${commitMessageContent}</i> on ${updateDateContent}.`;

};

// This way of fetching makes n requests to GH API where n is the length of repos[]
// TODO rewrite the function to fetch data from api.gh.com/repos endpoint
// That would always make only one request and then render data accordingly to repos[]

for (const repo of repos.values()) {
  const repoUrl = `https://api.github.com/repos/xdNecron/${repo}`

  const getData = async () => {

    const repoInfo = await fetch(repoUrl)
      .then(res => res.json())
      .then(data => {
        return data;
      });

    const versionTag = await fetch(repoInfo.tags_url)
      .then(res => {
        return res.json();
      });

    const commitInfo = await fetch(`${repoUrl}/commits`)
      .then(res => {
        return res.json();
      });

    const repoData = {
      "url": repoInfo.html_url,
      "name": repoInfo.name,
      "description": repoInfo.description,
      "commitHash": commitInfo[0].sha,
      "commitMessage": commitInfo[0].commit.message,
      "commitDate": commitInfo[0].commit.author.date
    };

    if (versionTag.length != 0) {
      console.log("jsem definovany")
      repoData["tagName"] = versionTag[0].name;
    }

    renderContent(repoData);
  };
  getData();
};
