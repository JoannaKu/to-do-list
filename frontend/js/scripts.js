var ToDoList = $('#to-do-list');
var deleteActiveIcon = "url(zadanie/../images/trash.png)";
var deleteDoneIcon = "url(zadanie/../images/trash2.png)";

function getTask(){    
    $.ajax({
        url: "http://localhost:3000/tasks",
        method: "GET",
        success: cardList
    });

    function cardList(data) {

        data.forEach(function(item) {

            $('<li class="task">')
            .append($('<input type="checkbox">').addClass('btn-done'))
            .append($('<p class="task-description">').text(item.task))
            .append($('<button class="btn-delete">').css('background-image', deleteActiveIcon))
            .appendTo(ToDoList);

        });
    }
}

function addTask(data, success) {    
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/tasks',
        data: {task: data, isdone: 0},
        error: function (err) {
          console.log(err);
        },
        success: success
    });
}

function addHandlerToNewTaskButton() {

    $('#add-new-task').click(function() {
        var description = prompt('Enter the name of the card');

        if (description) {
            addTask(description, function(){
                $('<li class="task">')
                    .append($('<input type="checkbox">').addClass('btn-done'))
                    .append($('<p class="task-description">').text(description))
                    .append($('<button class="btn-delete">').css('background-image', deleteActiveIcon))
                    .appendTo(ToDoList);
            });
        }
        else {
            alert('You have to put the name of the card. Try again.')
        }
    });
}

function addHandlerToDeleteButton() {
    $('.btn-delete').click(function(){

        var $taskElement = $(this).parent();

        $.ajax({
            url: "http://localhost:3000/delete",
            method: 'POST',
            data: {delete: $taskElement.text()},
            success: function(){
                $taskElement.remove();

            }
        });
    });
}

function doneTask(data) {
    $('.btn-done').click(function(){

        var $taskElement = $(this).parent();

        if  (this.checked) {
            $.ajax({
                url: "http://localhost:3000/update1",
                method: 'POST',
                data: {update:$taskElement.text(), isdone:1},
                success: function(){
                    ($('.task-description')).css('color', '#9eb2c0');
                    ($('.task-description')).css('text-decoration', 'line-through');
                    ($('.btn-delete')).css('background-image', deleteDoneIcon);
                } 

            });
        }
        else {
            $.ajax({
                url: "http://localhost:3000/update2",
                method: 'POST',
                data: {update:$taskElement.text(), isdone:0},
                success: function(){
                    ($('.task-description')).css('color', '#000');
                    ($('.task-description')).css('text-decoration', 'none');
                    ($('.btn-delete')).css('background-image', deleteActiveIcon);
                }
            });
        }

    });
}

function initSortable() {
    $('#to-do-list').sortable({
        connectWith: '#to-do-list',
        placeholder: 'task-placeholder'
    }).disableSelection();
}

$(".task").click(function(){
    $(".task-placeholder");
});

$(document).ready(function() {
    getTask();
    addHandlerToNewTaskButton();
    initSortable();

    $("ul").on("click", ".btn-delete", addHandlerToDeleteButton);
    $("ul").on("click", ".btn-done", doneTask);
});