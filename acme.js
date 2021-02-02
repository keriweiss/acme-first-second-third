const users = [
  { id: 1, name: "Nava", slot: "first" },
  { id: 2, name: "Rosie", slot: "second" },
  { id: 3, name: "Yakira", slot: "third" },
  { id: 4, name: "Layla", slot: "third" },
  { id: 5, name: "Lumpy", slot: "second" },
];

const first = document.querySelector("#first");
const second = document.querySelector("#second");
const third = document.querySelector("#third");

const firstUsers = document.createElement("div");
const secondUsers = document.createElement("div");
const thirdUsers = document.createElement("div");

first.appendChild(firstUsers);
second.appendChild(secondUsers);
third.appendChild(thirdUsers);

const slots = [firstUsers, secondUsers, thirdUsers];

//initial placement of users
users.forEach((user) => {
  const nameButton = document.createElement("div");
  nameButton.innerHTML = user.name;
  nameButton.order = user.id;
  nameButton.className = "user-button";
  slots.forEach((slot) => {
    if (user.slot === slot.parentElement.id) {
      slot.appendChild(nameButton);
    }
  });
});

//create class "selected" for selected user
const userButton = document.querySelectorAll(".user-button");
[...userButton].forEach((button) => {
  button.addEventListener("click", () => {
    if (button.className === "selected") {
      button.className = "user-button";
    } else {
      button.className = "selected";
    }
  });
});

// Add and sort users according to users.id in their new home
// Is there a way to sort in place without removing?
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

const buttons = document.querySelectorAll("button");

//back and forward buttons
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
