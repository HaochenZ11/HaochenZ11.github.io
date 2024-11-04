---
layout: page
title: Task Specification with LLMs
description: Talking to Robots Course
img: assets/img/task_-_spec.png
importance: 2
category: work
giscus_comments: true
---

For the Talking to Robots course I'm currently taking, our project is on Uncertainty Reduction for Task Specification with Active Querying. The idea is to have an LLM agent that can ask questions and interact with a human to specify a task when given an instruction, then generate a plan to complete the task. 

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/task_spec.png" title="vision" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The overall goal of the agent we envision.
</div>


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/task_pipeline.png" title="pipeline" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    A diagram of our pipeline.
</div>

In this project we utilize current state-of-the-art LLMs, VLMs, and are deploying on a Kinova robot arm. Final demo coming in December!