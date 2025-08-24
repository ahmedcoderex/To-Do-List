const add = document.querySelector(".add"),
  popup = document.querySelector(".popup-app"),
  titlePopup = popup.querySelector(".header_popup h4"),
  close = popup.querySelector(".close"),
  textarea = document.querySelector("textarea"),
  button = document.querySelector("button"),
  input = document.querySelector("input");

let editIndex = null;

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Open Popup
add.addEventListener("click", () => {
  popup.classList.add("open");
  setPopupValues("", "", "اضف", "اضافه ملاحظه جديده");
});

// Close Popup
close.addEventListener("click", () => {
  popup.classList.remove("open");
});

// Add New Note
button.addEventListener("click", () => {
  const title = input.value.trim(),
    discription = textarea.value.trim();
  const date = new Date();
  const day = date.getDay();
  const month = monthNames[date.getDate()];
  const year = date.getFullYear();

  if (title && discription) {
    const note = {
      title: title,
      discription: discription,
      date: `${day}, ${month}, ${year}`,
    };

    if (editIndex != null) {
      notes[editIndex].title = note.title;
      notes[editIndex].discription = note.discription;
      notes[editIndex].date = note.date;
      editIndex = null;
    } else {
      notes.push(note);
    }

    localStorage.setItem("notes", JSON.stringify(notes));

    notesOnScreen();
    close.click();
  }
});

// Show Notes on Screen
function notesOnScreen() {
  document.querySelectorAll(".card").forEach((card) => card.remove());
  if (notes.length === 0) return;
  let allContent = "";
  notes.map((note, index) => {
    let content = `
      <div class="card card-style">

            <div class="card_content">
                <h4>${note.title}</h4>
                <p>${note.discription}</p>
            </div>

            <div class="card_details">

                <span>${note.date}</span>
                <div class="menu-app">
                    <i class="bx bx-dots-horizontal-rounded"></i>
                    <ul class="menu">
                        <li onclick="editNote(this,${index})"><i class="bx bx-edit-alt"></i>تعديل</li>
                        <li onclick="deleteNote(${index})"><i class="bx bx-trash-alt"></i>حذف</li>
                    </ul>
                </div>
            </div>
              
        </div>

    `;

    allContent += content;
  });

  console.log(allContent);
  add.insertAdjacentHTML("afterend", allContent);
}

notesOnScreen();

// Delete Note
function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  notesOnScreen();
}

// Edit Note
function editNote(item, index) {
  editIndex = index;
  let note = item.closest(".card");
  add.click();
  setPopupValues(
    note.querySelector("h4").innerHTML,
    note.querySelector("p").innerHTML,
    "تحديث",
    "تحديث الملاحظه "
  );
}

// setUp Popup Values
function setPopupValues(inputValue, textareaValue, buttonValue, TitleValue) {
  input.value = inputValue;
  textarea.value = textareaValue;
  button.innerHTML = buttonValue;
  titlePopup.innerHTML = TitleValue;
}
