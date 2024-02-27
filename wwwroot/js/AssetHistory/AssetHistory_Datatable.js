$(document).ready(function () {
    document.title = 'Asset History';

    var table = $("#tblAssetHistory").DataTable({
        paging: true,
        select: true,
        "order": [[0, "desc"]],
        dom: 'Bfrtip',


        buttons: [
            'pageLength',
        ],

        "processing": false,
        "serverSide": true,
        "filter": true, //Search Box
        "orderMulti": false,
        "stateSave": true,

        "ajax": {
            "url": "/AssetHistory/GetDataTabelData",
            "type": "POST",
            "datatype": "json"
        },


        "columns": [
            {
                data: "Id", "name": "Id", render: function (data, type, row) {
                    return "<a href='#' onclick=Details('" + row.Id + "');>" + row.Id + "</a>";
                }
            },
            { "data": "AssetDataID", "name": "AssetDataID" },
            {
                data: "AssetDisplay", "name": "AssetDisplay", render: function (data, type, row) {
                    return "<a href='#' onclick=AssetDetails('" + row.AssetId + "');>" + row.AssetDisplay + "</a>";
                }
            },
            { "data": "AssignEmployeeDisplay", "name": "AssignEmployeeDisplay" },
            { "data": "Action", "name": "Action" },
            { "data": "Note", "name": "Note" },
            { "data": "CreatedDateDisplay", "name": "CreatedDateDisplay" },
        ],

        "lengthMenu": [[20, 10, 15, 25, 50, 100, 200], [20, 10, 15, 25, 50, 100, 200]]
    });



    
    setInterval(function () {
        //console.log("Before reload");
        $('#tblAssetHistory').DataTable().ajax.reload();
        //console.log("After reload");
    }, 1000); // 1000 milliseconds = 1 second

});




