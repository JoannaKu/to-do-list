(function ($) {

    function addNewTaskToList (item) {
        $(`<li class="task ${item.isdone && 'done'}">`)
            .append($(`<input type="checkbox" class="btn-done" ${item.isdone && 'checked'}>`))
            .append($('<p class="task-description">').text(item.task))
            .append($('<button class="btn-delete">'))
            .appendTo($('#to-do-list'))
    }

    function getTask () {
        $.ajax({
            url: "http://localhost:3000/tasks",
            method: "GET",
            success: function (data) {
                data.forEach(addNewTaskToList)
            }
        })
    }

    function saveTask (data, success) {
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
                saveTask(description, function () {
                    addNewTaskToList({ task: description })
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

        function updateStatus(isDone) {
            $.ajax({
                url: "http://localhost:3000/update" + (isDone ? '1' : '2'),
                method: 'POST',
                data: { update: $taskElement.text() },
                success: function () {
                    $taskElement.toggleClass('done');
                }
            })
        }

        updateStatus(this.checked);
    }

    function initSortable () {
        $('#to-do-list').sortable({
            connectWith: '#to-do-list',
            placeholder: 'task-placeholder'
        }).disableSelection()
    }

    $(document).ready(function () {
        getTask()
        addHandlerToNewTaskButton()
        initSortable()

        $("ul").on("click", ".btn-delete", deleteButtonHandler)
        $("ul").on("click", ".btn-done", doneButtonHandler)
    })
})(jQuery)
