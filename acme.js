const users = [
  { id: 1, name: "Nava", slot: "first" },
  { id: 2, name: "Rosie", slot: "second" },
  { id: 3, name: "Yakira", slot: "third" },
  { id: 4, name: "Layla", slot: "third" },
  { id: 5, name: "Lumpy", slot: "second" },
];

const first = document.createElement("div");
const second = document.createElement("div");
const third = document.createElement("div");

document.querySelector("#first").appendChild(first);
document.querySelector("#second").appendChild(second);
document.querySelector("#third").appendChild(third);

const slots = [first, second, third];

//initial placement of users
users.forEach((user) => {
  const nameButton = document.createElement("div");
  nameButton.innerHTML = user.name;
  nameButton.order = user.id;
  nameButton.className = "user-button";
  for (slot of slots) {
    if (user.slot === slot.parentElement.id) {
      slot.appendChild(nameButton);
    }
  }
});

//create class "selected" for selected user
const userButton = document.querySelectorAll(".user-button");
[...userButton].forEach((button) => {
  button.addEventListener("click", () => {
    /*love this! super clean and easy to read
    could also use className.toggle(),
    which adds a className if the element **doesnt** have
    and removes the className if the element **does** have it
    */
    button.className === "selected"
      ? (button.className = "user-button")
      : (button.className = "selected");
  });
});

// Add and sort users according to users.id in their new home
const sortChildren = (selected, newHome) => {
  //love this!
  for (let user of selected) {
    newHome.appendChild(user);
  }
  const newOrder = [...newHome.children].sort(function (a, b) {
    return a.order - b.order;
  });
  newHome.innerHTML = "";
  for (user of newOrder) {
    newHome.appendChild(user);
  }
};

//back and forward buttons
const buttons = document.querySelectorAll("button");
/*

*/
buttons.forEach((button) => {
  /*
    It could be useful to take advantage of event propagation and bubbling.
    see here: https://www.freecodecamp.org/news/a-simplified-explanation-of-event-propagation-in-javascript-f9de7961a06e/
    TLDR, if you interact with an element, this event "bubbles" up to all its parent elements.
    So, instead of adding the event listeners to each individual button, you could add the
    listener to the #lists div and target the buttons you want by doing
        if (event.target.tagName === 'BUTTON') {
            //your code here
        }
    and using the same className logic below.
    If you had functionality that would enable you to add new columns, this would be really helpful
    because you wouldn't have to add the event listener onto each button.
    */
  button.addEventListener("click", () => {
    if (!button.className.includes("off")) {
      let newHome;
      const parent = button.parentElement.lastChild;
      let selected = parent.querySelectorAll(".selected");
      if (button.className === "back") {
        newHome = button.parentElement.previousElementSibling.lastChild;
      }
      if (button.className === "forward") {
        newHome = button.parentElement.nextElementSibling.lastChild;
      }
      for (each of selected) {
        parent.removeChild(each);
        sortChildren(selected, newHome);
      }
    }
  });
});
