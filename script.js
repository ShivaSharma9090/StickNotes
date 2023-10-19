// Array of random margin values for sticky note placement
var random_margin = ["-5px", "1px", "5px", "10px", "7px"];

// Array of random colors for sticky notes
var random_colors = ["#A8FFD9", "#B7B2FF", "#FFAB6A", "#6AD4FF", "#FFC2C2"];

// Array of random degrees for rotating sticky notes
var random_degree = ["rotate(3deg)", "rotate(1deg)", "rotate(-1deg)", "rotate(-3deg)", "rotate(-5deg)", "rotate(-8deg)"];

// Initialize the index for cycling through random colors
var index = 0;

// Select and focus the user input field when the window loads
window.onload = document.querySelector("#user_input").select();

// Get references to the "Confirm" button and user input field
var confirmButton = document.querySelector("#confirm");
var userInput = document.querySelector("#user_input");

// Function to update the "Confirm" button based on input
function updateConfirmButton() {
  if (userInput.value.trim() !== "") {
    confirmButton.disabled = false;
  } else {
    confirmButton.disabled = true;
  }
}

// Add an input event listener to the user input field
userInput.addEventListener("input", updateConfirmButton);

// Function to set up the event listeners for the "Confirm" button
function setupConfirmButton() {
  // Add a click event listener to create a sticky note when the "Confirm" button is clicked
  confirmButton.addEventListener("click", () => {
    const text = userInput.value;
    if (text.trim() !== "") {
      createStickyNote(text);
      userInput.value = "";
      userInput.select();
      confirmButton.disabled = true; // Disable the button after adding a note
    }
  });
}

// Add a click event listener to show the modal when the "Add Note" button is clicked
document.querySelector("#add_note").addEventListener("click", () => {
  document.querySelector("#modal").style.display = "block";
  updateConfirmButton(); // Update the Confirm button initially
  setupConfirmButton(); // Set up the Confirm button event listener
});

// Add a click event listener to hide the modal when the "Hide" button is clicked
document.querySelector("#hide").addEventListener("click", () => {
  document.querySelector("#modal").style.display = "none";
});

// Add a keydown event listener to create a sticky note when the Enter key is pressed
userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const text = userInput.value;
    if (text.trim() !== "") {
      createStickyNote(text);
      userInput.value = "";
      userInput.select();
      confirmButton.disabled = true; // Disable the button after adding a note
    }
  }
});

// Function to create a new sticky note
function createStickyNote(text) {
  let note = document.createElement("div");
  let details = document.createElement("div");
  let noteText = document.createElement("h1");
  let deleteIcon = document.createElement("i");

  // Set class names for elements
  note.className = "note";
  details.className = "details";
  noteText.textContent = text;
  deleteIcon.className = "fas fa-times";
  deleteIcon.style.color = "white";

  // Append elements to create the structure of a sticky note
  details.appendChild(noteText);
  details.appendChild(deleteIcon);
  note.appendChild(details);

  // Reset the color index to the beginning if it exceeds the array length
  if (index > random_colors.length - 1)
    index = 0;

  // Set style attributes for the sticky note with random properties
  note.setAttribute(
    "style",
    `margin:${random_margin[Math.floor(Math.random() * random_margin.length)]}; background-color:${random_colors[index++]}; transform:${random_degree[Math.floor(Math.random() * random_degree.length)]}`
  );

  // Add a click event to remove the sticky note with a single click
  note.addEventListener("click", () => {
    note.remove();
  });

  // Append the sticky note to the "all_notes" container
  document.querySelector("#all_notes").appendChild(note);
}
