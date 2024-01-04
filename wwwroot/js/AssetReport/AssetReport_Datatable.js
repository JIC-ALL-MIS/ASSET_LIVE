$(document).ready(function () {
    document.title = 'Asset Report';

    $("#tblAsset_report").DataTable({

        paging: true,
        select: true,
        "order": [[0, "desc"]],
        dom: 'Bfrtip',


        buttons: [
            'pageLength',
            'print'
        ],


        "processing": true,
        "serverSide": true,
        "filter": false, //Search Box
        "orderMulti": true,
        "stateSave": true,

        "ajax": {
            "url": "/AssetReport/GetDataTabelData",
            "type": "POST",
            "datatype": "json"

        },
        "columns": [
            {


                data: "Id", "name": "Id", render: function (data, type, row) {

                    return "<a href='#' class='fa fa-eye' onclick=Details('" + row.Id + "');>" + row.Id + "</a>";
                }
            },
            
            {
                    data: "Image", "name": "Image", render: function (data, type, row) {

                    return "<img src="+row.Image+" class='img - circle elevation - 2 imgCustom75px' alt='Asset Image'>";
                }
            },
            { "data": "AssetId", "name": "AssetId" },
            { "data": "AssetModelNo", "name": "AssetModelNo" },
            { "data": "Name", "name": "Name" },
            { "data": "Description", "name": "Description" },
            { "data": "Quantity", "name": "Quantity" },
            { "data": "UnitName", "name": "UnitName" },
            { "data": "AssetStatusName", "name": "AssetStatusName" },
            {
               
                "data": "DateOfPurchase",
                "name": "DateOfPurchase",
                "autoWidth": true,
                "render": function (data) {

                    
                    var date = new Date(data);
                    
                    var month = date.getMonth() + 1;

                    var FormattedDate = (month.length > 1 ? month : month) + "/" + date.getDate() + "/" + date.getFullYear();
                    
                    if (FormattedDate == "1/1/1970") {
                        return "N/A"
                    } else {
                        return FormattedDate
                    }
                    
                }
            },
            { "data": "LocationName", "name": "LocationName" },
            { "data": "AreaName", "name": "AreaName" },
            { "data": "SubAreaName", "name": "SubAreaName" },
            { "data": "CategoryName", "name": "CategoryName" },
            { "data": "SubCategoryName", "name": "SubCategoryName" },
            { "data": "SupplierName", "name": "SupplierName" },

            { "data": "CompanyName", "name": "CompanyName" },
            { "data": "DepartmentName", "name": "DepartmentName" },
            { "data": "SubDepartmentName", "name": "SubDepartmentName" },
            
            
            
            
        ],
        //'columnDefs': [{
        //    'targets': [44, 55],
        //    'orderable': false,
       // }],

        "lengthMenu": [[10, 20, 30, 40, 50, 100, 1000], [10, 20, 30, 40, 50, 100, 1000]]
    });

});

