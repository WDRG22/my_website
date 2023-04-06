// Front-end (client-side) entry point
import HomeView from "./views/HomeView.js"

// History api
// Use history to avoid refresh on repeat navigations 
const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}

const router = async () => {
    const routes = [
        {path: "/", view: HomeView},
    ];

    // Test routes for potential match with acceptable routes
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        }
    });

    let match = potentialMatches.find(potentialMatches => potentialMatches.isMatch)

    if(!match){
        match = {
            route: routes[0], // If undefined route, send to homepage (Could change this to 404)
            match: true
        };
    }

    // Create view 
    const view = new match.route.view();

    // Set #app html to view 
    document.querySelector("#app").innerHTML = await view.getHtml();
};

// Event listener to call router when using back button to navigate route history
window.addEventListener("popstate", router);

// Event listener for when the DOM loads
document.addEventListener("DOMContentLoaded", () => {

    // If click on element (link) w/ data-link attribute, prevent default behavior,     
    // use navigateTo function to use history to avoid refresh
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
})