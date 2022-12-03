import Home from "./pages/Home.js";
import NotFound from "./pages/NotFound.js";
import Hotel from "./pages/Hotel.js";
import Company from "./pages/Company.js";
import Dining from "./pages/Dining.js";
import Reservation from "./pages/Reservation.js";
import Exchange from "./pages/Exchange.js";
import Airline from "./pages/Airline.js";


const router = async () => {
  const routes = [
      { path: "/", view: Home },
      { path: "/hotel", view: Hotel },
      { path: "/company", view: Company },
      { path: "/dining", view: Dining },
      { path: "/resevation", view: Reservation },
      { path: "/exchange", view: Exchange },
      { path: "/airline", view: Airline },

  ];

  const pageMatches = routes.map((route) => {
      return {
          route, // route: route
          isMatch: route.path === location.pathname,
      };
  });

  console.log(pageMatches)
  let match = pageMatches.find((pageMatch) => pageMatch.isMatch);

  if (!match) {
      match = {
          route: location.pathname,
          isMatch: true,
      };
      const page = new NotFound();
      document.querySelector("#root").innerHTML = await page.getHtml();
  } else {
      const page = new match.route.view();
      document.querySelector("#root").innerHTML = await page.getHtml();
  }
};


window.addEventListener("popstate", () => {
  router();
});

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
      if (e.target.matches("[data-link]")) {
          e.preventDefault();
          history.pushState(null, null, e.target.href);
          router();
      }
  });
  router();
});




/*
window.onload = () => {
  const historyLinker = document.querySelectorAll(".history");
  const contentDiv =document.querySelector("#app-content")
  historyLinker.forEach((element) => {
    element.addEventListener("click", (event)=>{
        const pathName = event.target.getAttribute("route")
        historyRouterPush(pathName,contentDiv)
    })
  })
}

const routes = {"/company" : "<h1>company</h1>", "/hotel" : "<h1>hotel" }


const historyRouterPush = (pathName, element) => {
  window.history.pushState({}, pathName, window.location.origin + pathName);
  renderHTML(element, routes[pathName]);
}

const renderHTML = (element, route) => {
  element.innerHTML = route
}

window.onpopstate = () => {
    renderHTML(element, routes[window.location.pathname]);
}

*/