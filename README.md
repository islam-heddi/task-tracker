# Task Tracker

Sample solution for the [task-tracker](https://roadmap.sh/projects/task-tracker) challenge from [roadmap.sh](https://roadmap.sh/).

This is a simple command-line interface (CLI) application for managing tasks.

## Features

- Add new tasks with a unique ID and store it in `JSON` format.
- List tasks by their status: `to-do`, `in-progress`, or `done`.
- Update the description of an existing task.
- Delete tasks by their ID.
- Mark tasks as `in-progress` or `done`.

## Prerequisites

- Node.js installed on your system.

## Installation

**Clone the Repository**

   ```bash
   git clone https://github.com/islam-heddi/task-tracker.git

   # Navigate to the project Directory
   cd task-tracker
   ```

## Usage

you have to install fs package by only run this command

    ```bash
        npm install
    ```


to run the command you have only to type

    ```bash
        node app.js < your arguments > 
    ```

*** note ***

if you are using windows operating system you can use instead

    ```bash
        ./task-tracker < your arguments >
    ``` 
    
*** add a task ***    

    ```bash
        ./task-tracker add "your task"
    ```

*** delete a task ***

    ```bash
        ./task-tracker delete < numeric id >
    ```

*** update a task ***

    ```bash
        ./task-tracker update < numeric id > "your task"
    ```

*** list all the tasks ***

    ```bash
        ./task-tracker list
    ```

*** list the undone tasks ***

    ```bash
        ./task-tracker list todo
    ``` 

*** list in progress tasks ***

    ```bash
        ./task-tracker list in-progress
    ```

*** list done tasks ***

    ```bash
        ./task-tracker list done
    ```

*** mark in progress a task ***

    ```bash
        ./task-tracker mark-in-progress < numeric id >
    ```

*** mark done a task ***

    ```bash
        ./task-tracker mark-done < numeric id >
    ```

note when you want to mark done your task you have to mark it in progress firstly then you will be able to mark it done