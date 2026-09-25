const pages = [
  {
    title: "Framing the challenge",
    description: "Shared problem, business need, audiences, and desired outcomes",
    path: "framing-the-challenge/",
  },
  {
    title: "Creating a prototype",
    description: "Build and test a Skilling Needs Advisor with Cowork or Scout",
    path: "creating-a-prototype/",
  },
  {
    title: "Prototype-to-scale challenge",
    description: "Diagnose what must be resolved before the team can depend on it",
    path: "prototype-to-scale-challenge/",
  },
  {
    title: "Scaling options",
    description: "Choose the appropriate scaling path",
    path: "scaling-options/",
  },
  {
    title: "Taking your prototype to the next level",
    description: "Improve one component and record what changed and what remains unresolved",
    path: "taking-your-prototype-to-the-next-level/",
  },
];

const basePath = document.querySelector(".site-brand")?.getAttribute("href") || "/";
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

document.querySelector("[data-search-open]")?.addEventListener("click", openSearch);
searchInput?.addEventListener("input", (event) => renderSearchResults(event.target.value));

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openSearch();
  }
});

const participantForm = document.querySelector("[data-participant-form]");
const savedProfile = JSON.parse(localStorage.getItem("workshopProfile") || "null");

if (participantForm && savedProfile) {
  participantForm.elements.table.value = savedProfile.table || "";
  const savedTool = participantForm.querySelector(`[name="tool"][value="${savedProfile.tool}"]`);
  if (savedTool) savedTool.checked = true;
}

participantForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(participantForm);
  const table = formData.get("table");
  const tool = formData.get("tool");
  const status = participantForm.querySelector("[data-form-status]");

  if (!table || !tool) {
    status.textContent = "Select your table and a tool to continue.";
    return;
  }

  localStorage.setItem("workshopProfile", JSON.stringify({ table, tool }));
  window.location.href = participantForm.action;
});

const toolButtons = document.querySelectorAll("[data-tool-select]");
const toolPanels = document.querySelectorAll("[data-tool-panel]");
const participantSummary = document.querySelector("[data-participant-summary]");

function updateParticipantSummary(profile) {
  if (!participantSummary || !profile?.tool) return;
  const tableLabel = profile.table ? `Table ${profile.table}` : "Table not selected";
  participantSummary.querySelector("strong").textContent = `${tableLabel} · ${profile.tool === "cowork" ? "Cowork" : "Scout"}`;
}

function selectTool(tool) {
  toolButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.toolSelect === tool));
  });
  toolPanels.forEach((panel) => {
    panel.hidden = panel.dataset.toolPanel !== tool;
  });

  const profile = JSON.parse(localStorage.getItem("workshopProfile") || "{} ");
  const updatedProfile = { ...profile, tool };
  localStorage.setItem("workshopProfile", JSON.stringify(updatedProfile));
  updateParticipantSummary(updatedProfile);
}

updateParticipantSummary(savedProfile);

if (toolButtons.length) {
  selectTool(savedProfile?.tool === "scout" ? "scout" : "cowork");
  toolButtons.forEach((button) => button.addEventListener("click", () => selectTool(button.dataset.toolSelect)));
}

const workflowStepper = document.querySelector("[data-workflow-stepper]");

if (workflowStepper) {
  const workflowTabs = [...workflowStepper.querySelectorAll("[data-workflow-step]")];
  const workflowPanels = [...workflowStepper.querySelectorAll("[data-workflow-panel]")];
  const previousButton = workflowStepper.querySelector("[data-workflow-previous]");
  const nextButton = workflowStepper.querySelector("[data-workflow-next]");
  const workflowStatus = workflowStepper.querySelector("[data-workflow-status]");
  let activeWorkflowStep = 0;

  function showWorkflowStep(index, moveFocus = false) {
    activeWorkflowStep = Math.max(0, Math.min(index, workflowTabs.length - 1));

    workflowTabs.forEach((tab, tabIndex) => {
      const isActive = tabIndex === activeWorkflowStep;
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });
    workflowPanels.forEach((panel, panelIndex) => {
      panel.hidden = panelIndex !== activeWorkflowStep;
    });

    previousButton.disabled = activeWorkflowStep === 0;
    nextButton.disabled = activeWorkflowStep === workflowTabs.length - 1;
    workflowStatus.textContent = `Step ${activeWorkflowStep + 1} of ${workflowTabs.length}`;

    if (moveFocus) workflowTabs[activeWorkflowStep].focus();
  }

  workflowTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => showWorkflowStep(index));
    tab.addEventListener("keydown", (event) => {
      const keyTargets = {
        ArrowLeft: activeWorkflowStep - 1,
        ArrowRight: activeWorkflowStep + 1,
        Home: 0,
        End: workflowTabs.length - 1,
      };

      if (keyTargets[event.key] === undefined) return;
      event.preventDefault();
      showWorkflowStep(keyTargets[event.key], true);
    });
  });

  previousButton.addEventListener("click", () => showWorkflowStep(activeWorkflowStep - 1));
  nextButton.addEventListener("click", () => showWorkflowStep(activeWorkflowStep + 1));
  showWorkflowStep(0);
}

const challengePicker = document.querySelector("[data-scale-challenge]");
const challengeInstructions = document.querySelector("[data-challenge-instructions]");
const readinessAssessment = document.querySelector("[data-readiness-assessment]");
const assessmentStatus = document.querySelector("[data-assessment-status]");
const diagnosisSummary = document.querySelector("[data-diagnosis-summary]");
const diagnosisForm = document.querySelector("[data-diagnosis-form]");
const readinessLenses = ["value", "trust-risk", "ownership", "reach-adoption"];
let scaleDiagnosis = JSON.parse(localStorage.getItem("scaleDiagnosis") || "{}");

function saveScaleDiagnosis(updates) {
  scaleDiagnosis = { ...scaleDiagnosis, ...updates };
  localStorage.setItem("scaleDiagnosis", JSON.stringify(scaleDiagnosis));
}

function getReadinessResults() {
  if (!readinessAssessment) return {};
  const formData = new FormData(readinessAssessment);
  return Object.fromEntries(readinessLenses.map((lens) => [lens, formData.get(lens)]));
}

function updateReadinessSummary() {
  if (!readinessAssessment) return;
  const results = getReadinessResults();
  const values = Object.values(results).filter(Boolean);
  const readyCount = values.filter((value) => value === "ready").length;
  const needsWorkCount = values.filter((value) => value === "needs-work").length;
  const unknownCount = values.filter((value) => value === "unknown").length;
  const remainingCount = readinessLenses.length - values.length;

  assessmentStatus.textContent = remainingCount
    ? `${values.length} of ${readinessLenses.length} lenses assessed. ${remainingCount} remaining.`
    : `${readyCount} ready · ${needsWorkCount} need work · ${unknownCount} unknown`;

  if (diagnosisSummary) {
    const summaryHeading = diagnosisSummary.querySelector("strong");
    const summaryText = diagnosisSummary.querySelector("p:last-child");

    if (remainingCount) {
      summaryHeading.textContent = "Complete the assessment";
      summaryText.textContent = `${remainingCount} readiness ${remainingCount === 1 ? "lens remains" : "lenses remain"}.`;
    } else {
      const unresolvedCount = needsWorkCount + unknownCount;
      summaryHeading.textContent = unresolvedCount
        ? `${unresolvedCount} ${unresolvedCount === 1 ? "gap" : "gaps"} to resolve`
        : "Ready to evaluate scaling options";
      summaryText.textContent = `${readyCount} ready · ${needsWorkCount} need work · ${unknownCount} unknown`;
    }
  }

  saveScaleDiagnosis({ readiness: results });
}

if (challengePicker) {
  const savedChallenge = scaleDiagnosis.challenge;
  const savedChallengeInput = savedChallenge
    ? challengePicker.querySelector(`[value="${savedChallenge}"]`)
    : null;
  if (savedChallengeInput) savedChallengeInput.checked = true;
  challengeInstructions.hidden = !savedChallengeInput;

  challengePicker.addEventListener("change", (event) => {
    if (!event.target.matches('[name="scale-challenge"]')) return;
    challengeInstructions.hidden = false;
    saveScaleDiagnosis({ challenge: event.target.value });
  });
}

if (readinessAssessment) {
  Object.entries(scaleDiagnosis.readiness || {}).forEach(([lens, value]) => {
    const savedInput = readinessAssessment.querySelector(`[name="${lens}"][value="${value}"]`);
    if (savedInput) savedInput.checked = true;
  });
  readinessAssessment.addEventListener("change", updateReadinessSummary);
  updateReadinessSummary();
}

if (diagnosisForm) {
  diagnosisForm.elements.decision.value = scaleDiagnosis.decision || "";
  diagnosisForm.elements.priority.value = scaleDiagnosis.priority || "";
  diagnosisForm.elements.notes.value = scaleDiagnosis.notes || "";

  const diagnosisButton = diagnosisForm.querySelector('button[type="submit"]');
  const diagnosisStatus = diagnosisForm.querySelector("[data-diagnosis-status]");
  if (scaleDiagnosis.complete) {
    diagnosisButton.textContent = "Diagnosis saved";
    diagnosisButton.classList.add("is-complete");
  }

  diagnosisForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const readinessComplete = Object.values(getReadinessResults()).every(Boolean);

    if (!scaleDiagnosis.challenge) {
      diagnosisStatus.textContent = "Choose a scale challenge in Step 1 before saving.";
      return;
    }
    if (!readinessComplete) {
      diagnosisStatus.textContent = "Assess all four readiness lenses before saving.";
      return;
    }

    const formData = new FormData(diagnosisForm);
    saveScaleDiagnosis({
      decision: formData.get("decision"),
      priority: formData.get("priority"),
      notes: formData.get("notes"),
      complete: true,
    });
    diagnosisStatus.textContent = "Diagnosis saved. Your team is ready to evaluate scaling options.";
    diagnosisButton.textContent = "Diagnosis saved";
    diagnosisButton.classList.add("is-complete");
  });
}

const scalingPaths = document.querySelector("[data-scaling-paths]");
const scalingDiagnosisContext = document.querySelector("[data-scaling-diagnosis-context]");
const selectedPathSummary = document.querySelector("[data-selected-path-summary]");
const scalingDecisionForm = document.querySelector("[data-scaling-decision-form]");
const scalingPathLabels = {
  prototype: "Continue prototyping",
  team: "Team-managed use",
  "low-code": "Low-code solution",
  "pro-code": "Pro-code solution",
};
let scalingRecommendation = JSON.parse(localStorage.getItem("scalingRecommendation") || "{}");

function saveScalingRecommendation(updates) {
  scalingRecommendation = { ...scalingRecommendation, ...updates };
  localStorage.setItem("scalingRecommendation", JSON.stringify(scalingRecommendation));
}

function updateSelectedPathSummary() {
  if (!selectedPathSummary) return;
  const summaryHeading = selectedPathSummary.querySelector("strong");
  const summaryText = selectedPathSummary.querySelector("p:last-child");

  if (!scalingRecommendation.path) {
    summaryHeading.textContent = "No path selected";
    summaryText.textContent = "Compare the four options and select the best fit.";
    return;
  }

  summaryHeading.textContent = scalingPathLabels[scalingRecommendation.path];
  summaryText.textContent = "Explain why this path fits and what must be true before moving forward.";
}

if (scalingDiagnosisContext) {
  const diagnosisHeading = scalingDiagnosisContext.querySelector("[data-scaling-diagnosis-heading]");
  const diagnosisDetail = scalingDiagnosisContext.querySelector("[data-scaling-diagnosis-detail]");
  const diagnosisLabels = {
    "not-ready": "Not ready for broader use",
    conditions: "Ready with conditions",
    "evaluate-options": "Ready to evaluate scaling options",
  };
  const lensLabels = {
    value: "Value",
    "trust-risk": "Trust and risk",
    ownership: "Ownership",
    "reach-adoption": "Reach and adoption",
  };

  if (scaleDiagnosis.complete) {
    const readinessValues = Object.values(scaleDiagnosis.readiness || {});
    const readyCount = readinessValues.filter((value) => value === "ready").length;
    const unresolvedCount = readinessValues.filter((value) => value !== "ready").length;
    diagnosisHeading.textContent = diagnosisLabels[scaleDiagnosis.decision] || "Diagnosis saved";
    diagnosisDetail.textContent = `${readyCount} ready · ${unresolvedCount} unresolved · Priority: ${lensLabels[scaleDiagnosis.priority] || "Not selected"}`;
  }
}

if (scalingPaths) {
  const pathTabs = [...scalingPaths.querySelectorAll("[data-scaling-path]")];
  const pathPanels = [...scalingPaths.querySelectorAll("[data-scaling-path-panel]")];
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

  scalingPaths.querySelectorAll("[data-select-scaling-path]").forEach((button) => {
    button.addEventListener("click", () => {
      saveScalingRecommendation({ path: button.dataset.selectScalingPath, complete: false });
      updateSelectedPathSummary();
      selectedPathSummary?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  const savedPathIndex = pathTabs.findIndex((tab) => tab.dataset.scalingPath === scalingRecommendation.path);
  showScalingPath(savedPathIndex >= 0 ? savedPathIndex : 0);
}

if (scalingDecisionForm) {
  scalingDecisionForm.elements.rationale.value = scalingRecommendation.rationale || "";
  scalingDecisionForm.elements.conditions.value = scalingRecommendation.conditions || "";
  scalingDecisionForm.elements.success.value = scalingRecommendation.success || "";
  const decisionStatus = scalingDecisionForm.querySelector("[data-scaling-decision-status]");
  const decisionButton = scalingDecisionForm.querySelector('button[type="submit"]');

  if (scalingRecommendation.complete) {
    decisionButton.textContent = "Recommendation saved";
    decisionButton.classList.add("is-complete");
  }

  scalingDecisionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!scalingRecommendation.path) {
      decisionStatus.textContent = "Select a scaling path in Step 2 before saving.";
      return;
    }

    const formData = new FormData(scalingDecisionForm);
    saveScalingRecommendation({
      rationale: formData.get("rationale"),
      conditions: formData.get("conditions"),
      success: formData.get("success"),
      complete: true,
    });
    decisionStatus.textContent = "Scaling recommendation saved. Continue to the final activity.";
    decisionButton.textContent = "Recommendation saved";
    decisionButton.classList.add("is-complete");
  });
}

updateSelectedPathSummary();

const nextLevelForm = document.querySelector("[data-next-level-form]");
const finishSummary = document.querySelector("[data-finish-summary]");
let nextLevelResult = JSON.parse(localStorage.getItem("nextLevelResult") || "{}");

function saveNextLevelResult(updates) {
  nextLevelResult = { ...nextLevelResult, ...updates };
  localStorage.setItem("nextLevelResult", JSON.stringify(nextLevelResult));
}

function updateFinishSummary() {
  if (!finishSummary) return;
  const summaryHeading = finishSummary.querySelector("strong");
  const summaryText = finishSummary.querySelector("p:last-child");

  if (nextLevelResult.complete) {
    summaryHeading.textContent = "Workshop complete";
    summaryText.textContent = "Your improvement, remaining gap, and next owner are recorded.";
  } else {
    summaryHeading.textContent = "One final reflection";
    summaryText.textContent = "Complete the three prompts and save your workshop result.";
  }
}

if (nextLevelForm) {
  Object.entries(nextLevelResult.values || {}).forEach(([name, value]) => {
    const field = nextLevelForm.elements[name];
    if (!field) return;

    if (field instanceof RadioNodeList) {
      field.value = value;
    } else {
      field.value = value;
    }
  });

  const nextLevelStatus = nextLevelForm.querySelector("[data-next-level-status]");
  const nextLevelButton = nextLevelForm.querySelector('button[type="submit"]');
  if (nextLevelResult.complete) {
    nextLevelButton.textContent = "Workshop complete";
    nextLevelButton.classList.add("is-complete");
  }

  nextLevelForm.addEventListener("input", () => {
    saveNextLevelResult({ values: Object.fromEntries(new FormData(nextLevelForm)), complete: false });
    nextLevelButton.textContent = "Complete workshop";
    nextLevelButton.classList.remove("is-complete");
    updateFinishSummary();
  });

  nextLevelForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveNextLevelResult({ values: Object.fromEntries(new FormData(nextLevelForm)), complete: true });
    nextLevelStatus.textContent = "Workshop complete. Your team has recorded the result and next action.";
    nextLevelButton.textContent = "Workshop complete";
    nextLevelButton.classList.add("is-complete");
    updateFinishSummary();
  });
}

updateFinishSummary();

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

const readyButton = document.querySelector("[data-prototype-ready]");
if (readyButton) {
  const isReady = localStorage.getItem("prototypeReady") === "true";
  readyButton.textContent = isReady ? "Prototype is ready" : "Prototype Ready";
  readyButton.classList.toggle("is-complete", isReady);

  readyButton.addEventListener("click", () => {
    const nextState = localStorage.getItem("prototypeReady") !== "true";
    localStorage.setItem("prototypeReady", String(nextState));
    readyButton.textContent = nextState ? "Prototype is ready" : "Prototype Ready";
    readyButton.classList.toggle("is-complete", nextState);
  });
}