function changeColor() {
  const colorInput = document.getElementById("colorPicker");
  document.documentElement.style.setProperty("--color-text", colorInput.value);
  document.documentElement.style.setProperty(
    "--color-text-dark",
    colorInput.value
  );
}
function resetStyles() {
  location.reload();
}

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

//////////////////////Burger menu disable scroll
