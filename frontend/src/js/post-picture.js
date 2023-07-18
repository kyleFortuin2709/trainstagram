const picturePreview = document.getElementById("picture-preview");

const updatePreview = (updateEvent) => {
  const target = updateEvent.target;
  if (target.files && target.files[0]) {
    const reader = new FileReader();

    reader.onload = (loadEvent) => {
      picturePreview.setAttribute("src", loadEvent.target.result);
      picturePreview.classList.remove("hidden");
    };

    reader.readAsDataURL(target.files[0]);
  }
};

document
  .getElementById("new-picture")
  .addEventListener("change", updatePreview);
