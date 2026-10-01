const pages = [
  {
    title: "Build your first version",
    description:
      "Meet the spreadsheet challenge and build a Skilling Needs Advisor",
    path: "build-your-first-version/",
  },
  {
    title: "What would it take to scale?",
    description:
      "Discover the scale challenge, share a response, and compare responsible paths",
    path: "what-would-it-take-to-scale/",
  },
  {
    title: "Scale the data source",
    description:
      "Connect a current source, rerun the request, and publish the improved version",
    path: "improve-and-reassess/",
  },
];

const basePath =
  document.querySelector(".site-brand")?.getAttribute("href") || "/";
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".site-nav");
const searchDialog = document.querySelector(".search-dialog");
const searchInput = document.querySelector("#site-search");
const searchResults = document.querySelector(".search-results");

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navigation?.classList.toggle("is-open", !isOpen);
});

function renderSearchResults(query = "") {
  const normalizedQuery = query.trim().toLowerCase();
  const matches = pages.filter((page) =>
    `${page.title} ${page.description}`.toLowerCase().includes(normalizedQuery),
  );

  searchResults.innerHTML = matches.length
    ? matches
        .map(
          (page) => `
            <li>
              <a href="${page.path.startsWith("#") ? basePath + page.path : basePath + page.path}">
                <strong>${page.title}</strong>
                <small>${page.description}</small>
              </a>
            </li>`,
        )
        .join("")
    : "<li>No matching workshop content found.</li>";
}

function openSearch() {
  renderSearchResults();
  searchDialog?.showModal();
  searchInput?.focus();
}

document
  .querySelector("[data-search-open]")
  ?.addEventListener("click", openSearch);
searchInput?.addEventListener("input", (event) =>
  renderSearchResults(event.target.value),
);

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openSearch();
  }
});

const toolButtons = document.querySelectorAll("[data-tool-select]");
const toolPanels = document.querySelectorAll("[data-tool-panel]");

function selectTool(tool) {
  toolButtons.forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.toolSelect === tool),
    );
  });
  toolPanels.forEach((panel) => {
    panel.hidden = panel.dataset.toolPanel !== tool;
  });
}

if (toolButtons.length) {
  selectTool("cowork");
  toolButtons.forEach((button) =>
    button.addEventListener("click", () =>
      selectTool(button.dataset.toolSelect),
    ),
  );
}

const scalingPaths = document.querySelector("[data-scaling-paths]");

if (scalingPaths) {
  const pathTabs = [...scalingPaths.querySelectorAll("[data-scaling-path]")];
  const pathPanels = [
    ...scalingPaths.querySelectorAll("[data-scaling-path-panel]"),
  ];
  let activePathIndex = 0;

  function showScalingPath(index, moveFocus = false) {
    activePathIndex = Math.max(0, Math.min(index, pathTabs.length - 1));
    pathTabs.forEach((tab, tabIndex) => {
      const isActive = tabIndex === activePathIndex;
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });
    pathPanels.forEach((panel, panelIndex) => {
      panel.hidden = panelIndex !== activePathIndex;
    });
    if (moveFocus) pathTabs[activePathIndex].focus();
  }

  pathTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => showScalingPath(index));
    tab.addEventListener("keydown", (event) => {
      const keyTargets = {
        ArrowLeft: activePathIndex - 1,
        ArrowRight: activePathIndex + 1,
        Home: 0,
        End: pathTabs.length - 1,
      };
      if (keyTargets[event.key] === undefined) return;
      event.preventDefault();
      showScalingPath(keyTargets[event.key], true);
    });
  });

  showScalingPath(0);
}

const discussionReveal = document.querySelector("[data-discussion-reveal]");

discussionReveal?.addEventListener("click", () => {
  const discussionWorkspace = document.querySelector("[data-scaling-framework]");
  const status = discussionReveal.parentElement.querySelector(
    "[data-response-status]",
  );

  if (!discussionWorkspace) return;

  discussionWorkspace.hidden = false;
  discussionReveal.disabled = true;
  discussionReveal.textContent = "Response submitted";
  if (status) status.textContent = "The room discussion is next.";
  discussionWorkspace.querySelector("h2")?.focus();
});

document.querySelectorAll("[data-copy-target]").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copyTarget);
    const status = button.closest(".copy-block")?.querySelector(".copy-status");

    try {
      await navigator.clipboard.writeText(target.textContent.trim());
      button.textContent = "Copied";
      if (status) status.textContent = "Prompt copied to your clipboard.";
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(target);
      selection.removeAllRanges();
      selection.addRange(range);
      if (status) status.textContent = "Prompt selected. Press Ctrl+C to copy.";
    }
  });
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  });
});
