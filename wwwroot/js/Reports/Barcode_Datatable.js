

$(document).ready(function () {
    document.title = 'Print Barcode IT Asset';

    $("#tblBarcode").DataTable({
        paging: true,
        select: true,
        "order": [[0, "desc"]],
        dom: 'Bfrtip',


        buttons: [
            'pageLength'
          

        ],


        "processing": true,
        "serverSide": true,
        "filter": true, //Search Box
        "orderMulti": false,
        "stateSave": true,

        "ajax": {
            "url": "/Report/ITGetDataTabelData",
            "type": "POST",
            "datatype": "json"
        },


        "columns": [
            { "data": "Id", "name": "Id" },
            { "data": "AssetId", "name": "AssetId" },
            { "data": "AssetDescription", "name": "AssetDescription" },
            {
                "data": "Barcode", "name": "Barcode", render: function (data, type, row) {
                    return "<img class='imgCustom300px' src='" + row.Barcode +"' alt='' />";
                }
            },
            { "data": "CompanyName", "name": "CompanyName" },
            { "data": "DepartName", "name": "DepartName" },
            {
                data: null, render: function (data, type, row) {
                    return "<button class='btn btn-success' onclick='GeneratePDFSingle(" + row.Id + ")'><span class='fa fa-print'></span></button>";
                }
            }
        ],

        'columnDefs': [{
            //'targets': [3,4],
            'orderable': false,
        }],

        "lengthMenu": [[20, 10, 15, 25, 50, 100, 200], [20, 10, 15, 25, 50, 100, 200]]
    });

});

