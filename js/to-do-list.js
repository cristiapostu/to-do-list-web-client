window.ToDoList = {

    apiURL: "http://localhost:8070/to-do-items",

    addItem: function () {
        var description = $("input[title= 'Description']").val();
        var deadline = $("input[title= 'Deadline']").val();

        var data = {

            'description': description,
            'deadline': deadline
        };

        $.ajax({
            url: ToDoList.apiURL,
            method: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data)
        }).done(function (response) {
            console.log(response);
            //  reload items table

        });
    },

    getItemRow: function (item) {
        var deadline = new Date(item.deadline).toLocaleDateString('ro-RO');
        var checkedAttribute = item.done ? 'checked' : '';
        return `<tr>
<td class="description">${item.description}</td>
<td class="deadline">${deadline}</td>
<td><input type="checkbox" ${checkedAttribute} class="mark-done" title="done"></td>
<td><a href="#" class="fa fa-trash delete" data-id="${item.id}"></a></td>
</tr>`
    },
    displayItems: function (items) {
        console.log('Displaying items');
        var rows = '';

        items.forEach(item => rows += ToDoList.getItemRow(item));

        console.log(rows);

        $('#to-do-items tbody').html(rows);
    },

    getItems: function () {
        $.ajax({
            url: ToDoList.apiURL,
            method: "GET"
        }).done(function (response) {
            console.log(response);
            //  reload items table

            ToDoList.displayItems(response)

        });
    },

    deleteItem: function (id) {
        $.ajax({
            url: ToDoList.apiURL + '?id=' + id,
            method: "DELETE"
        }).done(function (response) {
            console.log(response);
            //  reload items table

            ToDoList.getItems();
        });
    },

    bindEvents: function () {

        $("#create-item-form").submit(function (event) {
            event.preventDefault();

            console.log("submitting form");

            ToDoList.addItem();

            return false;

        });
         $('#to-do-items tbody').delegate('.delete', 'click', function () {
            var id = $(this) .data('id');

            ToDoList.deleteItem(id);

         });
    }

};
ToDoList.getItems();
ToDoList.bindEvents();