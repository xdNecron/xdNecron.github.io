import readingList from "../data/reading_list.js";

let article = document.getElementById("content-article");
let article_content = article.getElementsByClassName("text");

article_content = Array.prototype.slice.call(article_content)[0];

function getValidIdName(text) {
    return text.replaceAll(/[^a-zA-Z0-9]/g, "-")
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
            let author = entry.author;
            let title = entry.title;

            let li_content = `<b>${author}</b> <i>${name}</i>`;

            const li = list
                  .appendChild(document.createElement("li"))
            li.innerHTML = li_content;

            if (title) {
                li.setAttribute("title", title)
            }

        };
        } else {
            continue;
        };
    };
}

renderData(readingList);
