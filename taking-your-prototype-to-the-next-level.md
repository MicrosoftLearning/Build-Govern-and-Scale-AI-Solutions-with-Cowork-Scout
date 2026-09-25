---
title: Taking your prototype to the next level
permalink: /taking-your-prototype-to-the-next-level/
layout: workshop
body_class: activity-page next-level-page
description: Improve one component of the prototype and capture what changed and what remains unresolved.
---

<div class="activity-shell" markdown="0">
  <nav class="stage-nav" aria-label="Workshop progress">
    <a class="stage-nav__item is-complete" href="{{ '/framing-the-challenge/' | relative_url }}"><span>01</span> Framing the challenge</a>
    <a class="stage-nav__item is-complete" href="{{ '/creating-a-prototype/' | relative_url }}"><span>02</span> Creating a prototype</a>
    <a class="stage-nav__item is-complete" href="{{ '/prototype-to-scale-challenge/' | relative_url }}"><span>03</span> Prototype-to-scale challenge</a>
    <a class="stage-nav__item is-complete" href="{{ '/scaling-options/' | relative_url }}"><span>04</span> Scaling options</a>
    <a class="stage-nav__item is-current" href="{{ '/taking-your-prototype-to-the-next-level/' | relative_url }}" aria-current="step"><span>05</span> Next level</a>
  </nav>

  <article class="activity-content">
    <ol class="page-flow" aria-label="Steps on this page">
      <li><span>1</span><strong>Connect a current source</strong></li>
      <li><span>2</span><strong>Improve one component</strong></li>
      <li><span>3</span><strong>Reflect and finish</strong></li>
    </ol>

    <header class="activity-hero activity-hero--split">
      <div>
        <h1>Improve the prototype, then finish strong</h1>
        <p>Make one evidence-based improvement and leave with a clear account of what changed, what remains unresolved, and who owns the next action.</p>
      </div>
      <div class="participant-badge" data-participant-summary>
        <span>Workshop path</span>
        <strong>Choose a tool to begin</strong>
        <a href="{{ '/framing-the-challenge/' | relative_url }}">Change table or tool</a>
      </div>
    </header>

    <form class="next-level-form" data-next-level-form>
      <section class="scale-phase" aria-labelledby="source-title">
        <div class="section-heading section-heading--compact">
          <p class="eyebrow activity-step-label">Step 1: Connect a current source</p>
          <h2 id="source-title">Make the evidence maintainable</h2>
          <p>A prototype cannot stay useful if its source becomes stale. Record how the advisor will receive current, approved catalog information.</p>
        </div>

        <fieldset class="source-readiness">
          <legend>Current source status</legend>
          <div class="source-readiness__options">
            <label><input type="radio" name="source-status" value="connected" required><span><strong>Connected</strong><small>The prototype uses a shared, current source.</small></span></label>
            <label><input type="radio" name="source-status" value="identified"><span><strong>Plan identified</strong><small>The source and connection approach are known.</small></span></label>
            <label><input type="radio" name="source-status" value="unresolved"><span><strong>Still unresolved</strong><small>The approved source or connection needs an owner.</small></span></label>
          </div>
        </fieldset>

        <div class="source-details">
          <div>
            <label for="source-name">Shared source or system</label>
            <input id="source-name" name="source-name" type="text" placeholder="For example, the approved catalog export" required>
          </div>
          <div>
            <label for="source-owner">Source owner</label>
            <input id="source-owner" name="source-owner" type="text" placeholder="Team or role accountable for updates" required>
          </div>
        </div>
      </section>

      <section class="scale-phase" aria-labelledby="improvement-title">
        <div class="section-heading section-heading--compact">
          <p class="eyebrow activity-step-label">Step 2: Improve one component</p>
          <h2 id="improvement-title">Make one targeted change</h2>
          <p>Choose the improvement with the greatest effect on your readiness diagnosis or scaling recommendation. Change one thing, then test it.</p>
        </div>

        <fieldset class="improvement-picker">
          <legend>Choose one component</legend>
          <div class="improvement-options">
            <label><input type="radio" name="component" value="source-evidence" required><span><strong>Source and evidence</strong><small>Improve freshness, coverage, citations, or traceability.</small></span></label>
            <label><input type="radio" name="component" value="prompt-workflow"><span><strong>Prompt and workflow</strong><small>Improve instructions, questions, decisions, or output structure.</small></span></label>
            <label><input type="radio" name="component" value="human-review"><span><strong>Human review</strong><small>Clarify safeguards, approvals, escalation, or judgment points.</small></span></label>
            <label><input type="radio" name="component" value="ownership-adoption"><span><strong>Ownership and adoption</strong><small>Improve access, support, feedback, measurement, or accountability.</small></span></label>
          </div>
        </fieldset>

        <div class="improvement-record">
          <div>
            <label for="before-change">Before the change</label>
            <textarea id="before-change" name="before" rows="4" placeholder="Describe the limitation or readiness gap." required></textarea>
          </div>
          <div>
            <label for="change-made">Change made</label>
            <textarea id="change-made" name="change" rows="4" placeholder="Describe the source, prompt, safeguard, or operating change." required></textarea>
          </div>
          <div>
            <label for="test-result">Test result</label>
            <textarea id="test-result" name="test-result" rows="4" placeholder="Describe what happened when you tested the changed prototype." required></textarea>
          </div>
        </div>
      </section>

      <section class="scale-phase" aria-labelledby="finish-title">
        <div class="section-heading section-heading--compact">
          <p class="eyebrow activity-step-label">Step 3: Reflect and finish</p>
          <h2 id="finish-title">Capture what changed and what comes next</h2>
          <p>Finish with a concise record another team could use to understand the progress, remaining uncertainty, and ownership.</p>
        </div>

        <div class="finish-layout">
          <div class="finish-summary" data-finish-summary aria-live="polite">
            <p class="eyebrow">Workshop status</p>
            <strong>One final reflection</strong>
            <p>Complete the three prompts and save your workshop result.</p>
          </div>

          <div class="finish-fields">
            <label for="what-improved">What improved?</label>
            <textarea id="what-improved" name="improved" rows="3" required></textarea>

            <label for="what-remains">What remains unresolved?</label>
            <textarea id="what-remains" name="unresolved" rows="3" required></textarea>

            <label for="next-action">Who owns the next action, and what will they do?</label>
            <textarea id="next-action" name="next-action" rows="3" required></textarea>

            <p class="form-status" data-next-level-status aria-live="polite"></p>
            <button class="button button--primary" type="submit">Complete workshop</button>
          </div>
        </div>
      </section>
    </form>
  </article>
</div>