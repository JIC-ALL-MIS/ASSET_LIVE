$(document).ready(function () {
    document.title = 'Location Area';
    
    $("#tblLocationArea").DataTable({
       
        paging: true,
        select: true,
        "order": [[0, "desc"]],
        dom: 'Bfrtip',
        

        buttons: [
            'pageLength',

        ],


        "processing": true,
        "serverSide": true,
        "filter": true, //Search Box
        "orderMulti": false,
        "stateSave": true,

        "ajax": {
            "url": "/Location/GetDataTabelData",
            "type": "POST",
            "datatype": "json"
            
        },
        "columns": [
            {


                data: "ID", "name": "ID", render: function (data, type, row) {
      
                    return "<a href='#' class='fa fa-eye' onclick=Details('" + row.ID + "');>" + row.ID + "</a>";
                }
            },
            { "data": "Name", "name": "Name" },
            { "data": "Code", "name": "Code" },
            {
                data: null, render: function (data, type, row) {
                    
                        return "<a href='#' class='btn btn-info btn-xs' onclick=AddEdit('" + row.ID + "');>Edit</a>";
                   
                }
            },
            {
                data: null, render: function (data, type, row) {
                    
                        return "<a href='#' class='btn btn-danger btn-xs' onclick=Delete('" + row.ID + "'); >Delete</a>";
                   
                }
            }
        ],
        'columnDefs': [{
            'targets': [3,4],
            'orderable': false,
        }],

        "lengthMenu": [[50, 50, 50], [50, 50, 50]]
    });

});

