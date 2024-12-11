---
layout: page
title: Task Specification with LLMs
description: Talking to Robots Course
img: assets/img/task_spec.png
importance: 2
category: work
---

For the Talking to Robots course I took in Fall 2024, our project is on **Uncertainty Reduction for Task Specification with Active Querying**. The idea is to have an LLM agent that can ask questions and interact with a human to clarify a task and reduce task ambiguity when given a high-level instruction such as "clean the table", then generate a plan to complete the task. 

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/task_spec.png" title="vision" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The overall goal of the agent we envision.
</div>

In this project we utilize current state-of-the-art LLMs, VLMs, and are deploying on a Kinova robot arm. Our pipeline consists of three modules:
1. A vision module that does open-vocabulary detection of objects from images captured by an overhead camera.
2. The planning and querying module that consists of 3 LLM agents working collaborating to reduce planning uncertainty
3. The physical robot platform with a low-level action API

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/task_pipeline.png" title="pipeline" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    A diagram of our pipeline.
</div>


Example 1: Sort the objects on the table

A sample task completion is shown below for the initial instruction "Sort the objects". Through querying, the agent identifies the sorting preference is by object color, then carries out a plan with reduced ambiguity.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.liquid path="assets/video/pick_cubes.mp4" class="img-fluid rounded z-depth-1" controls=true %}
    </div>
</div>