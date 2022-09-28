const fillMediaIntoSubpage = () => {
  if (project.mediaTypes[0] === "img") {
      var $content = $(`
        <a href="${project.id}.html" class="gallery-container__element grid-item is-filtered ${project.categories.map(category => category.toUpperCase().replace(/[\W_]+/g, "")).join(" ")}">
          <img src=${imagePrefix + project.id + "-1.jpg"} />
          <div class="gallery-container__overlay" style="background-color: ${project.accentColor}">
            ${project.projectDescription}
          </div>
        </a>
        `);
      $(".grid").append($content)
  }
}