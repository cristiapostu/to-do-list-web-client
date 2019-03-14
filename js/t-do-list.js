
window.ToDoList = {

    apiURL: "http://localhost:8070/to-do-list",

    addItem: function () {
        var description = $("input[title= 'Description']").val ();
        var deadline = $("input[title= 'Deadline']").val ();

        var data = {

            'description': description,
            'deadline': deadline
        };

        $.ajax({
            url: ToDoList.apiURL,
            method: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data)
        }.done(function (response) {
            console.log(response);
        //  reload items table

    }));
    },

    bindEvents: function () {

        $("#to-do-items") . submit(function () {
            event.preventDefault();

            ToDoList.addItem();

            return.false;

        });

    }

};

ToDoList.bindEvents();