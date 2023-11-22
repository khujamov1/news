const elMainSearchForm = document.querySelector(".main-form");
const elSearchInput = elMainSearchForm.querySelector(".search-input")
const elMainList = document.querySelector(".main-list");
const elNewstemplate = document.querySelector(".news-template").content;
const newsFragment = new DocumentFragment();



function renderFunc(arr, node) {
    node.innerHTML = "";
    document.body.style.background = "none";
    arr.forEach(item => {
        const newsTempClone = elNewstemplate.cloneNode(true);
        newsTempClone.querySelector(".item-img").src = item.urlToImage;
        newsTempClone.querySelector(".item-img").alt = item.title;
        newsTempClone.querySelector(".item-title").textContent = item.title;
        newsTempClone.querySelector(".item-desc").textContent = item.description;
        newsTempClone.querySelector(".item-time").textContent = item.publishedAt;
        newsTempClone.querySelector(".item-link").href = item.url;

        newsFragment.appendChild(newsTempClone);
    })
    node.appendChild(newsFragment);
}



async function fetchProcces(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        renderFunc(data.articles, elMainList);
    } catch (error) {
        console.error(error);
    }
}


elMainSearchForm.addEventListener("submit", evt => {
    evt.preventDefault();

    const searchInputVal = elSearchInput.value.trim();

    fetchProcces(`https://newsapi.org/v2/everything?q=${searchInputVal}&apiKey=54186ac2010a42d8a6f9b5254e8b3317`)
})