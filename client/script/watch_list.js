let article = document.getElementById("content-article");
let article_content = article.getElementsByClassName("text"); 

article_content = Array.prototype.slice.call(article_content)[0];

function getValidIdName(text) {
    return text.replaceAll(/[^a-zA-z0-9]/g, "-")
}

function renderData(data) {
    for (const [key, category] of Object.entries(data)) {
        if (category[0] != null) {
        let id_name = getValidIdName(key);

        const heading = article_content
                .appendChild(document.createElement("h2"));

        heading.innerText = key;
        heading.id = id_name + "-h";

        const list = article_content
                .appendChild(document.createElement("ul"));
        list.id = id_name + "-l";

        for (const [key, entry] of Object.entries(category)) {
            let name = entry.name;
            let director = entry.director;
            let link = entry.link;

            let link_content = `<b>${director}</b> <i>${name}</i>`;

            const a = list
                  .appendChild(document.createElement("li"))
                  .appendChild(document.createElement("a"));
            a.innerHTML = link_content;
            a.setAttribute("href", link)
            a.setAttribute("target", "_blank")

        };
        } else {
            continue;
        };
    };
}

fetch("http://localhost:3000/watch_list")
    .then(text => text.json())
    .then(json => {
        renderData(json);
    })
    .catch(error => console.error(error));
