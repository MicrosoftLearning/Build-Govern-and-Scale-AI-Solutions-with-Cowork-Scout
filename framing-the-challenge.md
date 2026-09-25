---
title: Framing the challenge
permalink: /framing-the-challenge/
layout: workshop
body_class: activity-page framing-page
description: Frame the Global Skilling challenge and choose Cowork or Scout.
---

<div class="activity-shell" markdown="0">
  <nav class="stage-nav" aria-label="Workshop progress">
    <a class="stage-nav__item is-current" href="{{ '/framing-the-challenge/' | relative_url }}" aria-current="step"><span>01</span> Framing the challenge</a>
    <a class="stage-nav__item" href="{{ '/creating-a-prototype/' | relative_url }}"><span>02</span> Creating a prototype</a>
    <a class="stage-nav__item" href="{{ '/prototype-to-scale-challenge/' | relative_url }}"><span>03</span> Prototype-to-scale challenge</a>
    <a class="stage-nav__item" href="{{ '/scaling-options/' | relative_url }}"><span>04</span> Scaling options</a>
    <a class="stage-nav__item" href="{{ '/taking-your-prototype-to-the-next-level/' | relative_url }}"><span>05</span> Next level</a>
  </nav>

  <article class="activity-content">
    <ol class="page-flow" aria-label="Steps on this page">
      <li><span>1</span><strong>Review the scenario</strong></li>
      <li><span>2</span><strong>Group discussion</strong></li>
      <li><span>3</span><strong>Plan a prototype</strong></li>
    </ol>

    <header class="activity-hero activity-hero--scenario">
      <p class="eyebrow activity-step-label">Step 1: Review the scenario</p>
      <h1>A launch date is set. The skilling plan isn&rsquo;t.</h1>
      <p>Microsoft will introduce a new AI-assisted customer support capability in eight weeks. Global Skilling must recommend how to prepare the people who will use, support, and govern it. Existing courses cover parts of the need, additional content is planned, and some gaps may require a new solution. Your team must determine what to reuse, curate, adapt, partner on, or build, and explain why.</p>
    </header>

    <section class="content-section" aria-labelledby="before-building">
      <div class="section-kicker activity-step-label">Step 2: Group discussion</div>
      <div>
        <h2 id="before-building">Start with the problem</h2>
        <p class="section-intro">Discuss these questions before you move on. You do not need every answer yet; align on what the team needs to understand before creating content or recommending a solution.</p>
        <ul class="question-list">
          <li>What should people be able to do differently when the capability launches?</li>
          <li>What customer or business outcome should improve?</li>
          <li>Which existing or planned resources could prepare people for the change?</li>
          <li>Which gaps are important enough to address before launch?</li>
        </ul>
      </div>
    </section>

    <section class="setup-panel" aria-labelledby="setup-title">
      <div class="setup-panel__intro">
        <p class="eyebrow activity-step-label">Step 3: Plan a prototype</p>
        <h2 id="setup-title">The solution: The Skilling Needs Advisor</h2>
        <p>To solve for this scenario, you&rsquo;ll build an AI-supported experience that analyzes the business need, reviews available content, identifies meaningful gaps, and recommends the appropriate skilling response.</p>
        <strong class="setup-panel__ready">Ready to get started?</strong>
      </div>

      <form class="participant-form" action="{{ '/creating-a-prototype/' | relative_url }}" data-participant-form>
        <h3>Choose your path</h3>
        <p class="participant-form__intro">Select the tool you will use. People at the same table can work in different tools at the same time; this selection records only your work.</p>
        <label for="table-number">Table number</label>
        <select id="table-number" name="table" required>
          <option value="">Select your table</option>
          {% for table in (1..30) %}<option value="{{ table }}">Table {{ table }}</option>{% endfor %}
        </select>

        <fieldset>
          <legend>Choose Cowork or Scout</legend>
          <div class="tool-choices">
            <label class="tool-choice">
              <input type="radio" name="tool" value="cowork" required>
              <span class="tool-choice__marker">C</span>
              <span><strong>Cowork</strong><small>Delegate complex, multi-step work across Microsoft 365</small></span>
            </label>
            <label class="tool-choice">
              <input type="radio" name="tool" value="scout" required>
              <span class="tool-choice__marker tool-choice__marker--scout">S</span>
              <span><strong>Scout</strong><small>Act across files, browser, and Microsoft 365</small></span>
            </label>
          </div>
        </fieldset>

        <p class="form-status" data-form-status aria-live="polite"></p>
        <button class="button button--primary" type="submit">Start creating the prototype <span aria-hidden="true">&rarr;</span></button>
      </form>
    </section>
  </article>
</div>