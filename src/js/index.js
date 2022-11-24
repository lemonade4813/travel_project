import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Hotel from "./pages/Hotel";
import Company from "./pages/Company";


const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const payload = new FormData(form);

  fetch('http://localhost:4000/add', {
    method: 'POST',
    body: payload,
  })
  .then(res => res.json())
  .then(data => console.log(data));
});

const router = async () => {
  const routes = [
      { path: "/", view: Home },
      { path: "/hotel", view: Hotel },
      { path: "/company", view: Company },
  ];

  const pageMatches = routes.map((route) => {
      return {
          route, // route: route
          isMatch: route.path === location.pathname,
      };
  });
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