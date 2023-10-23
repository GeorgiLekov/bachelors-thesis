const root = document.querySelector("main");

function beginLoading() {
    const loadingElement = document.createElement("div");
    loadingElement.innerHTML = "" +
        "<div class=\"loader\">\n" +
        "</div>" +
        "<div class=\"spinner\">\n" +
        "<div class=\"ring\"></div>\n" +
        "</div>\n";
    root.appendChild(loadingElement);
}

function stopLoading() {
    const loadingElement = document.querySelector('.loader');
    const spinnerElement = document.querySelector('.spinner');
    if (loadingElement) {
        loadingElement.remove();
        spinnerElement.remove();
    }
}

export {beginLoading, stopLoading};
