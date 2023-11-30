﻿$(document).ready(function () {
    document.title = 'Asset Scanned';
    
    $("#tblAsset_report").DataTable({

        paging: false,
        select: true,
        "order": [[0, "desc"]],
        dom: 'Bfrtip',

        "processing": false,
        "serverSide": true,
        "filter": false, //Search Box
        "orderMulti": false,
        "stateSave": false,

        "ajax": {
            "url": "/AssetScanned/GetDataTabelData",
            "type": "POST",
            "datatype": "json"

        },
        "columns": [
            
            { "data": "Id", "name": "Id" },
            { "data": "AssetId", "name": "AssetId" },
            { "data": "AssetModelNo", "name": "AssetModelNo" },
            { "data": "Name", "name": "Name" },
            { "data": "Description", "name": "Description" },
            { "data": "Quantity", "name": "Quantity" },
            { "data": "AssetStatusName", "name": "AssetStatusName" },
            { "data": "AssetDateScanned", "name": "AssetDateScanned" },
            { "data": "AssetTimeScanned", "name": "AssetTimeScanned" },
            {
                "data": "AssetDateScanned",
                "name": "AssetDateScanned",
                "autoWidth": true,
                "render": function (data, type, row) {
                    // Assuming data is in a format like "MM/dd/yyyy"
                    var date = new Date(data);
                    var today = new Date(); // Current date

                    // Compare the date with today's date
                    if (date.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
                        // If the date is today, set background color to green
                        return '<div style="background-color: green; color: white;"> Scanned </div>';
                    } else {
                        // Otherwise, set background color to the default
                        return '<div style="background-color: red; color: white;"> Not Scanned </div>';
                    }
                }
            },

           
            




        ],

    });


   

    
});

