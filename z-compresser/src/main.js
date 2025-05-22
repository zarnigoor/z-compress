const fileInput = document.getElementById("fileInput");
const uploadsList = document.getElementById("uploadsList");

function createVideoItem(file) {
  const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
  const videoURL = URL.createObjectURL(file);

  const newItem = document.createElement("div");
  newItem.className = "video-item";

  newItem.innerHTML = `
    <div class="video-info">
      <div class="video-thumbnail">
        <video muted autoplay loop src="${videoURL}"></video>
        <div class="thumbnail-overlay">
          <svg class="play-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 3L19 12L5 21V3Z" fill="white"/>
          </svg>
        </div>
      </div>
      <div class="video-details">
        <p class="video-name">${file.name}</p>
        <p class="video-size">${sizeInMB}MB</p>
      </div>
    </div>
    <button class="delete-button" title="Remove">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  `;

  newItem.querySelector(".delete-button").addEventListener("click", () => {
    URL.revokeObjectURL(videoURL);
    newItem.remove();
    if (!uploadsList.children.length) {
      uploadsList.textContent = "No uploads yet";
      uploadsList.classList.add("uploads-placeholder");
    }
  });

  return newItem;
}

fileInput.addEventListener("change", () => {
  if (uploadsList.classList.contains("uploads-placeholder")) {
    uploadsList.textContent = "";
    uploadsList.classList.remove("uploads-placeholder");
  }

  Array.from(fileInput.files).forEach(file => {
    if (file) {
      uploadsList.appendChild(createVideoItem(file));
    }
  });

  fileInput.value = "";
});
