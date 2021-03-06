//@Global variabls

//store all sections
const sections = document.querySelectorAll("section");
//store the list of links
const navList = document.getElementById("navbar__list");
//creating newFregment
const newFregment = document.createDocumentFragment();
let activeSection;
//the height of the viewed part of the  page
const viewPortHeight = document.body.clientHeight;
//extract sections dimentions
const dimentions = [];
sections.forEach((section) => {
  dimentions.push(section.getBoundingClientRect());
});
//btn to scroll to the top
const btn = document.querySelector("button");
//extract the title section
const titleSection = document.getElementsByClassName("main__hero");

//@helping fuctions

//setActive function
const setActive = () => {
  //remove active class from every section
  sections.forEach((section) => {
    section.classList.remove("your-active-class");
  });
  //add active class
  activeSection.classList.add("your-active-class");
  //remove active class from every link
  //extract all links
  const links = document.querySelectorAll("li");
  const activeLinkText = activeSection.getAttribute("data-nav");
  links.forEach((link) => {
    if (link.innerText !== activeLinkText) {
      link.classList.remove("your-active-class");
    } else link.classList.add("your-active-class");
  });
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
    sections[i].scrollIntoView({ behavior: "smooth", block: "start" });
    //set active section
    activeSection = sections[i];
    setActive();
  });
  newline.appendChild(newContent);
  newFregment.appendChild(newline);
}
// adding the newFregment to  the navlist
navList.appendChild(newFregment);

//check which section is on viewport on scroll
document.addEventListener("scroll", () => {
  for (let i = 0; i < sections.length; i++) {
    if (
      sections[i].getBoundingClientRect().top < viewPortHeight * 0.5 &&
      sections[i].getBoundingClientRect().bottom > -10
    ) {
      activeSection = sections[i];
      setActive();
    } else console.log("condetion never meet");
  }
});
//check which section is on viewport on load
document.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < sections.length; i++) {
    if (dimentions[i].top < viewPortHeight * 0.5 && dimentions[i].bottom > 0) {
      activeSection = sections[i];
      setActive();
      break;
    }
  }
});

//adding event listner to the up buttom
btn.addEventListener("click", (e) => {
  e.preventDefault();
  activeSection = titleSection[0];
  setActive();
  titleSection[0].scrollIntoView({ behavior: "smooth", block: "center" });
});
