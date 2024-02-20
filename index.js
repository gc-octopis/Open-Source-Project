searchButton.onclick = () => showSearchResult(searchInput.value.trim())

document.querySelectorAll(".category-item").forEach((item) => {
    item.onclick = () => showSearchResult(item.innerHTML, "category");
})




async function showSearchResult(input, type="search") {
    searchResult.style.display = "block";
    const apps = await getJSON();
    if (type=="search") performSearch(input, apps);
    else if (type=="category") filterByCategory(input, apps);

}

async function getJSON() {
    let apps;
    await fetch("appList.json")
        .then(response => response.json())
        .then(data => {
            apps = data.apps;
        })
        .catch(error => console.error("Error fetching data:", error));
    return apps;
}

function performSearch(query, apps) {
    const filteredApps = apps.filter(app => {
        // Implement your search logic here
        const searchFields = [app.name, app.description, app.keywords.join(", "), app.category];
        return searchFields.some(field => field.toLowerCase().includes(query.toLowerCase()));
    });

    // Display search results
    displayResults(filteredApps);
}

// Function to filter apps based on category
function filterByCategory(category, apps) {
    const filteredApps = apps.filter(app => app.category.toLowerCase() === category.toLowerCase());
    displayResults(filteredApps);
}

// Function to display search results
function displayResults(results) {
    searchResult.innerHTML = ""; // Clear previous results

    if (results.length === 0) {
        searchResult.innerHTML = "No results found.";
        return;
    }

    results.forEach(app => {
        const appElement = document.createElement("div");
        appElement.innerHTML = `
            <h3>${app.name}</h3>
            <p><strong>Description:</strong> ${app.description}</p>
            <p><strong>Keywords:</strong> ${app.keywords.join(", ")}</p>
            <p><strong>Category:</strong> ${app.category}</p>
        `;
        searchResult.appendChild(appElement);
    });
}