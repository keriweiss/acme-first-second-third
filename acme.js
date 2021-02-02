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
    button.className === "selected"
      ? (button.className = "user-button")
      : (button.className = "selected");
  });
});

// Add and sort users according to users.id in their new home
const sortChildren = (selected, newHome) => {
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
buttons.forEach((button) => {
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
