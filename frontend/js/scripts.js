var ToDoList = $('#to-do-list')
var deleteDoneIcon = "url(../images/trash2.png)"

function getTask () {
    $.ajax({
        url: "http://localhost:3000/tasks",
        method: "GET",
        success: cardList
    })

    function cardList (data) {
        data.forEach(function (item) {
            $('<li class="task">')
                .append($('<input type="checkbox" class="btn-done">'))
                .append($('<p class="task-description">').text(item.task))
                .append($('<button class="btn-delete">'))
                .appendTo(ToDoList);
        })
    }
}

function addTask (data, success) {
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/tasks',
        data: { task: data, isdone: 0 },
        error: function (err) {
            console.log(err)
        },
        success: success
    })
}

function addHandlerToNewTaskButton () {
    $('#add-new-task').click(function () {
        var description = prompt('Enter the name of the card')

        if (description) {
            addTask(description, function () {
                $('<li class="task">')
                    .append($('<input type="checkbox" class="btn-done">'))
                    .append($('<p class="task-description">').text(description))
                    .append($('<button class="btn-delete">'))
                    .appendTo(ToDoList)
            })
        }
        else {
            alert('You have to put the name of the card. Try again.')
        }
    })
}

function deleteButtonHandler () {
    var $taskElement = $(this).parent()

    $.ajax({
        url: "http://localhost:3000/delete",
        method: 'POST',
        data: { delete: $taskElement.text() },
        success: function () {
            $taskElement.remove()
        }
    })
}

function doneButtonHandler () {
    var $taskElement = $(this).parent()

    if (this.checked) {
        $.ajax({
            url: "http://localhost:3000/update1",
            method: 'POST',
            data: { update: $taskElement.text(), isdone: 1 },
            success: function () {
                $taskElement.addClass('done')
            }

        })
    }
    else {
        $.ajax({
            url: "http://localhost:3000/update2",
            method: 'POST',
            data: { update: $taskElement.text(), isdone: 0 },
            success: function () {
                $taskElement.removeClass('done')
            }
        })
    }
}

function initSortable () {
    $('#to-do-list').sortable({
        connectWith: '#to-do-list',
        placeholder: 'task-placeholder'
    }).disableSelection()
}

$(".task").click(function () {
    $(".task-placeholder")
})

$(document).ready(function () {
    getTask()
    addHandlerToNewTaskButton()
    initSortable()

    $("ul").on("click", ".btn-delete", deleteButtonHandler)
    $("ul").on("click", ".btn-done", doneButtonHandler)
})