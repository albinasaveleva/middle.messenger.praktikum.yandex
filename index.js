import App from "./src/app";

const app = new App();
app.render();

// function render(query, block) {
//   const root = document.querySelector(query);
//   root.appendChild(block.getContent());
//   return root;
// }

// import Error from "./src/components/error";
// const errorPage = new Error({
//   title: "title",
//   subtitle: "subtitle"
// });

// render("#app", errorPage);