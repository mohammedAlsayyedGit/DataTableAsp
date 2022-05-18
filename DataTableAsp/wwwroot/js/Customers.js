$(document).ready(function () {
    $('#Customers').dataTable({
        "processing": true,
        "serverSide": true,
        "filter": true,
        "ajax": {
            "url": "/api/Customers/GetCustomers",
            "type": "POST",
            "datatype": "json"
        },
        "columnDefs": [{
            "targets": [0],
            "visible": false,
            "searchable": false
        }],
        "columns": [
            { "data": "id", "name": "Id", "autowidth": true},
            { "data": "firstName", "name": "FirstName", "autowidth": true },
            { "data": "lastName", "name": "LastName", "autowidth": true },
            { "data": "contact", "name": "Contact", "autowidth": true },
            { "data": "email", "name": "Email", "autowidth": true },
            //{ "data": "dateOfBirth", "name": "DateOfBirth", "autowidth": true },
            {
                "render": function (data, type, row) { return '<span>' + row.dateOfBirth.split('T')[0] + '</span>' },
                "name": "DateOfBirth"
            },
            {
                "render": function (data, type, row) { return '<a href="#" class="btn btn-danger" onclick=DeleteCustomer("' + row.id + '"); > Delete </a>' },
                "orderable": false
            },
            {
                "render": function (data, type, row, meta) { return '<a href="#" data-bs-toggle="modal" data-bs-target="#EditBackdrop" class="btn btn-sm btn-outline-primary ms-2" data-toggle="modal" onclick=EditItem(' + JSON.stringify(row) + '); > Edit </a>' },
                "orderable": false
            },
            
        ]
    });
});
$("body").on("submit", "#formEdit", function (e) {
    e.preventDefault();


    var firstName = $("#fnameEdit").val();
    var lname = $("#lnameEdit").val();
    var cont = $("#contEdit").val();
    var email = $("#emailEdit").val();
    var DB = $("#DBEdit").val();
    $.ajax({
        method: "Put",
        url: "/Operation/EditItem",
        data: { FirstName: firstName, LastName: lname, Contact: cont, Email: email, DateOfBirth: DB },
        success: function (data) {
            $("table tbody").prepend(createRow(data.id, data.fullName, data.email, data.phoneNumber));
            Swal.fire('Updated Succeeded');
        },
        error: function () {
            alert("the wae deleted");
        }
    });

})
function EditItem(customer) {
    
    $("#fnameEdit").val(customer.firstName);
    $("#lnameEdit").val(customer.lastName);
    $("#contEdit").val(customer.contact);
    $("#emailEdit").val(customer.email);
    $("#DBEdit").val(customer.dateOfBirth.split('T')[0]);
   
}
function DeleteCustomer(Id) {
    if (confirm(`Are you sure to delete the customer : ${Id}`)) {
        $.ajax({
            type: "DELETE",
            url: `https://localhost:44301/api/Customers/${Id}`,
            data: JSON.stringify({id:Id}),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function () {
                var oTable = $('#Customers').DataTable();
                oTable.draw();
                
            }
        });
    }
    
    
}
