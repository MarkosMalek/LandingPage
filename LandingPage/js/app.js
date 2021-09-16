//@Global variabls

//store all sections
const sections = document.querySelectorAll("section");
//store the list of links
const navList = document.getElementById("navbar__list");
let activeSection;
//the height of the viewed part of the  page
const viewPortHeight = document.body.clientHeight;
//extract sections dimentions
const dimentions = [];
sections.forEach((section) => {
  dimentions.push(section.getBoundingClientRect());
});

//@helping fuctions

//setActive function
const setActive = () => {
  //remove active class from every section
  sections.forEach((section) => {
    section.classList.remove("your-active-class");
  });
  //add active class
  activeSection.classList.add("your-active-class");
};

//@main functionality

//create new links
for (let i = 0; i < sections.length; i++) {
  const newline = document.createElement("li");
  const newContent = document.createTextNode(
    sections[i].getAttribute("data-nav")
  );
  newline.classList.add("menu__link");
  //create click event listner on links
  newline.addEventListener("click", (e) => {
    e.preventDefault();
    //scroll to the section clicked
    sections[i].scrollIntoView({ behavior: "smooth", block: "center" });
    //set active section
    activeSection = sections[i];
    setActive();
  });
  newline.appendChild(newContent);
  navList.appendChild(newline);
}

//check which section is on viewport
document.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < sections.length; i++) {
    if (dimentions[i].top < viewPortHeight * 0.5 && dimentions[i].bottom > 0) {
      activeSection = sections[i];
      setActive();
      break;
    }
  }
});
//btn scroll to the top functionality
const btn = document.querySelector("button");
const titleSection = document.getElementsByClassName("main__hero");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  activeSection = titleSection[0];
  setActive();
  titleSection[0].scrollIntoView({ behavior: "smooth", block: "center" });
});
