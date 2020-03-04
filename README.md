# Check Yo Self!

## Overview of Project Goals

In our solo project, Check Yo Self, we were assigned to create an application that allows a user to create an overarching To-do item, with multiple different tasks within that to-do item. Once the user decides to create the to-do, they will see that specific to-do populate on the main side of the page, along with any past or future to-dos displayed chronologically. To do this, there was a large emphasis placed onto functionality using Javascript. We focused on separation of the Data Model and the DOM, ensuring that any data was updated before updating what the user sees. We also implemented the use of local storage, so that a user could see their to-dos even after reloading or closing out the page. The final product also allows you to search through all of your to-dos based on title name, and filter by specific to-do urgency. Any changes made by the user are promptly updated through the data model and sent back into Local Storage. 

## Overview of Technology and Challenges

Like said above, there was a large emphasis in this project on functionality. The basics of the project were based in HTML and CSS, however. CSS was used to create the styling of the page, and we used Javascript to dynamically insert HTML elements onto the page depending on the path of the user. Using vanilla Javascript, this functionality was primarily implemented through use of iterative loops, like for loops. We also focused on separating data from display - for example: if a user made decided to make a task "urgent", the data model was updated, implemented and sent into Local Storage, and then the Document Object Model was updated. Any method that updates the data was written inside one of two classes, a task class or a to-do class. Any function that needed to change the DOM based on that data change was written in the main Javascript file. The major challenge in this project for me was implementing the correct instantiation of tasks and to-dos alike. It was a bit difficult to decide when and where exactly to instantiate each task, and each to-do. Furthermore, implementing Local Storage was a bit of challenge because I discovered that once an item is retrieved from Local Storage, that item must be re-instantiated into the class that it was originally in order to call any methods on it. It was also a bit difficult to handle click events on dynamically created elements - event listeners do not work in this situation, so I needed to use a variety of IDs on to-dos, tasks, and various containers in which those items are held. Overall, I learned quite a bit through this project about objects and classes, local storage, and the data model. Due to time considerations, unfortunately, there are a few functions that are not as "DRY" as I would like them to be. Specficially, the functions for ```checkTask``` and ```checkUrgency``` are essentially the same, and if there were more time, I would refactor these two into one function. 

## The Application

Below are a few screenshots of the final product. 

![Screenshot 1](https://i.imgur.com/XYwRhhp.png)

![Screenshot 2](https://i.imgur.com/PUSwd8u.png)

![Screenshot 3](https://i.imgur.com/zTrR1tD.png)
