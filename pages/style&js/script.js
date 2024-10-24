function changeScrollbarSize() {
  var checkbox = document.getElementById("scrollbarSizeCheckbox");
  var style = document.createElement("style");
  style.type = "text/css";
  
  if (checkbox.checked) {
      style.innerHTML = "::-webkit-scrollbar { width: 14px; }, ::-webkit-scrollbar-track, ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { display: initial; }";
  } else {
      style.innerHTML = "::-webkit-scrollbar { width: 8px; }";
  }
  
  document.getElementsByTagName("head")[0].appendChild(style);
}

function resetStyles() {
  localStorage.removeItem("color");
  localStorage.removeItem("fontSize");
  document.documentElement.style.removeProperty("--color-text");
  document.documentElement.style.removeProperty("--color-text-dark");
  document.body.style.removeProperty("font-size");
  location.reload();
}

document.addEventListener("DOMContentLoaded", function () {
  const colorInput = document.getElementById("colorPicker");
  const fontSizeInput = document.getElementById("font-size");

  const savedColor = localStorage.getItem("color");
  const savedFontSize = localStorage.getItem("fontSize");

  if (savedColor) {
    document.documentElement.style.setProperty("--color-text", savedColor);
    document.documentElement.style.setProperty("--color-text-dark", savedColor);
    colorInput.value = savedColor;
  }

  if (savedFontSize) {
    document.body.style.fontSize = `${savedFontSize}px`;
    fontSizeInput.value = savedFontSize;
  }

  colorInput.addEventListener("input", () => {
    const color = colorInput.value;
    document.documentElement.style.setProperty("--color-text", color);
    document.documentElement.style.setProperty("--color-text-dark", color);
    localStorage.setItem("color", color);
  });

  fontSizeInput.addEventListener("input", () => {
    const fontSize = fontSizeInput.value;
    document.body.style.fontSize = `${fontSize}px`;
    localStorage.setItem("fontSize", fontSize);
  });
});

function updateBreadcrumb() {
  var breadcrumbsElement = document.getElementById("Breadcrumbs");
  if (!breadcrumbsElement) return;
  var pathArray = [];
  pathArray.push("<a href='../../index.html'>Home</a>");
  var currentDropdown = document.querySelector(
    '.menu li a[href="' + window.location.pathname + '"]'
  );
  var dropdownLabel = null;
  if (currentDropdown) {
    var parentLi = currentDropdown.closest(".dropdown");
    if (parentLi) {
      dropdownLabel = parentLi.querySelector("label").textContent;
    }
  }
  if (dropdownLabel) {
    pathArray.push(
      "<a href='#' class='dropdown-label'>" + dropdownLabel + "</a>"
    );
    document
      .querySelector(".dropdown-label")
      .addEventListener("click", function () {
        toggleDropdownLinks();
      });
  }
  var currentPage = window.location.pathname
    .split("/")
    .pop()
    .replace(".html", "");
  if (currentPage !== "index") {
    pathArray.push(
      "<a href='" + currentPage + ".html'>" + currentPage + "</a>"
    );
  }
  breadcrumbsElement.innerHTML =
    "<p>" +
    pathArray.join('<span class="breadcrumb-separator"> &gt; </span>') +
    "</p>";
}
function toggleDropdownLinks() {
  var submenu = document.querySelector(".submenu");
  submenu.classList.toggle("show");
}
document.addEventListener("DOMContentLoaded", updateBreadcrumb);

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".TitleCard .slider");
  const radioButtons = document.querySelectorAll(
    '.TitleCard input[type="radio"]'
  );
  let isDragging = false;
  let startX;
  let currentIndex = 0;
  slider.addEventListener("mousedown", handleMouseDown);
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
  radioButtons.forEach((radioButton, index) => {
    radioButton.addEventListener("change", () =>
      handleRadioButtonChange(index)
    );
  });
  function handleMouseDown(event) {
    isDragging = true;
    startX = event.clientX;
  }
  function handleMouseMove(event) {
    if (!isDragging) return;
    const deltaX = event.clientX - startX;
    const currentTransform = window
      .getComputedStyle(slider)
      .getPropertyValue("transform");
    const currentX = currentTransform
      ? parseFloat(currentTransform.split(",")[4])
      : 0;
    const newX = currentX + deltaX;
    slider.style.transition = "none";
    slider.style.transform = `translateX(${newX}px)`;
    startX = event.clientX;
  }
  function handleMouseUp() {
    isDragging = false;
    slider.style.transition = "";
    slider.style.transform = "";

    currentIndex = Math.round(
      -parseFloat(
        window
          .getComputedStyle(slider)
          .getPropertyValue("transform")
          .split(",")[4]
      ) / slider.offsetWidth
    );

    radioButtons.forEach((radioButton) =>
      radioButton.classList.remove("checked")
    );

    radioButtons[currentIndex].checked = true;
    radioButtons[currentIndex].classList.add("checked");
  }
  function handleRadioButtonChange(index) {
    currentIndex = index;

    slider.style.transition = "transform 0.3s ease";
    slider.style.transform = `translateX(${
      -currentIndex * slider.offsetWidth
    }px)`;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");
  const radioButtons = document.querySelectorAll(
    '.TitleCard input[type="radio"]'
  );
  let currentIndex = 0;
  leftArrow.addEventListener("click", function () {
    currentIndex =
      (currentIndex - 1 + radioButtons.length) % radioButtons.length;
    radioButtons[currentIndex].checked = true;
  });
  rightArrow.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % radioButtons.length;
    radioButtons[currentIndex].checked = true;
  });
});
document.addEventListener("DOMContentLoaded", function () {
  var leftArrow = document.querySelector(".TitleCard .left-arrow");
  var rightArrow = document.querySelector(".TitleCard .right-arrow");

  if (leftArrow) {
    leftArrow.style.display = "flex";
  }
  if (rightArrow) {
    rightArrow.style.display = "flex";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const titleCards = document.querySelectorAll(".TitleCard");
  titleCards.forEach((titleCard) => {
    const originalHeight = titleCard.scrollHeight;
    const maxHeight = 500;
    if (originalHeight > maxHeight) {
      titleCard.style.position = "relative";
      titleCard.style.maxHeight = `${maxHeight}px`;
      titleCard.style.paddingBottom = "40px";
      titleCard.style.overflow = "hidden";

      const readMoreBtn = createButton("Read More", "read-more-btn");
      const readLessBtn = createButton("Read Less", "read-less-btn");
      readLessBtn.style.display = "none";

      const buttonWrapper = document.createElement("div");
      buttonWrapper.className = "button-wrapper";
      buttonWrapper.style.position = "absolute";
      buttonWrapper.style.bottom = "0";
      buttonWrapper.style.width = "100%";

      readMoreBtn.onclick = function () {
        titleCard.style.maxHeight = `${originalHeight}px`;
        readMoreBtn.style.display = "none";
        readLessBtn.style.display = "inline-block";
        titleCard.style.transition = "max-height 0.5s ease";
      };
      readLessBtn.onclick = function () {
        titleCard.style.maxHeight = `${maxHeight}px`;
        readMoreBtn.style.display = "inline-block";
        readLessBtn.style.display = "none";
        titleCard.style.transition = "max-height 0.5s ease";
      };
      buttonWrapper.appendChild(readMoreBtn);
      buttonWrapper.appendChild(readLessBtn);
      titleCard.appendChild(buttonWrapper);
    }
  });
  function createButton(text, className) {
    const button = document.createElement("button");
    button.textContent = text;
    button.className = className;
    return button;
  }
});
