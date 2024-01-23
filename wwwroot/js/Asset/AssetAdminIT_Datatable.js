

$(document).ready(function () {
    document.title = 'Asset';

    $("#tblAsset").DataTable({
        paging: true,
        select: true,
        "order": [[0, "desc"]],
        dom: 'Bfrtip',


        buttons: [
            'pageLength',
            {
                extend: 'collection',
                text: 'Export',
                buttons: [
                    {
                        extend: 'pdfHtml5',
                        customize: function (doc) {
                            //doc.content[1].margin = [100, 0, 100, 0];
                            //Remove the title created by datatTables
                            doc.content.splice(0, 1);
                            //Create a date string that we use in the footer. Format is dd-mm-yyyy
                            var now = new Date();
                            var jsDate = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear();

                            doc.pageMargins = [20, 60, 20, 30];
                            // Set the font size fot the entire document
                            doc.defaultStyle.fontSize = 7;
                            // Set the fontsize for the table header
                            doc.styles.tableHeader.fontSize = 10;


                            doc['header'] = (function () {
                                return {
                                    columns: [
                                        {
                                            alignment: 'left',  //center
                                            italics: true,
                                            text: 'Asset List',
                                            fontSize: 18,
                                            margin: [0, 0]
                                        }
                                    ],
                                    margin: 20
                                }
                            });

                            // Create a footer object with 2 columns
                            doc['footer'] = (function (page, pages) {
                                return {
                                    columns: [
                                        {
                                            alignment: 'left',
                                            text: ['Created on: ', { text: jsDate.toString() }]
                                        },
                                        {
                                            alignment: 'right',
                                            text: ['page ', { text: page.toString() }, ' of ', { text: pages.toString() }]
                                        }
                                    ],
                                    margin: 5
                                }
                            });
                            // Change dataTable layout (Table styling)
                            // To use predefined layouts uncomment the line below and comment the custom lines below
                            // doc.content[0].layout = 'lightHorizontalLines'; // noBorders , headerLineOnly
                            var objLayout = {};
                            objLayout['hLineWidth'] = function (i) { return .5; };
                            objLayout['vLineWidth'] = function (i) { return .5; };
                            objLayout['hLineColor'] = function (i) { return '#aaa'; };
                            objLayout['vLineColor'] = function (i) { return '#aaa'; };
                            objLayout['paddingLeft'] = function (i) { return 4; };
                            objLayout['paddingRight'] = function (i) { return 4; };
                            doc.content[0].layout = objLayout;
                        },


                        orientation: 'portrait', // landscape
                        pageSize: 'A4',
                        pageMargins: [0, 0, 0, 0], // try #1 setting margins
                        margin: [0, 0, 0, 0], // try #2 setting margins
                        text: '<u>PDF</u>',
                        key: { // press E for export PDF
                            key: 'e',
                            altKey: false
                        },
                        exportOptions: {
                            columns: [2, 3, 4, 5, 6, 7], //column id visible in PDF
                            modifier: {
                                // DataTables core
                                order: 'index',  // 'current', 'applied', 'index',  'original'
                                page: 'all',      // 'all',     'current'
                                search: 'none'     // 'none',    'applied', 'removed'
                            }
                        }
                    },
                    'copyHtml5',
                    'excelHtml5',
                    {
                        extend: 'csvHtml5',
                        exportOptions: {
                            columns: [2, 3, 4, 5, 6, 7],
                            page: 'all'
                        }
                    },
                    {
                        extend: 'print',
                        exportOptions: {
                            columns: [2, 3, 4, 5, 6, 7],
                            page: 'all'
                        }
                    }
                ]

            },
            {
                extend: 'collection',
                text: 'Import',
                buttons: [
                    {
                        text: 'Upload Excel',
                        action: function () {
                            const inputElement = document.createElement('input');
                            inputElement.type = 'file';
                            inputElement.accept = '.xlsx';

                            // Add an event listener to handle file selection
                            inputElement.addEventListener('change', function (event) {
                                const file = event.target.files[0];


                                if (file) {
                                    // Create a FileReader to read the file content
                                    const reader = new FileReader();
                                    Swal.fire({
                                        title: "Loading...",
                                        html: "Please wait a moment",
                                        allowOutsideClick: false,
                                        onBeforeOpen: () => {
                                            const modal = Swal.getPopup();
                                            modal.classList.add('swal2-modal-front');
                                        }
                                    })
                                    Swal.showLoading()
                                    reader.onload = function (e) {
                                        const data = e.target.result;

                                        // Pass the data to the XLSX library for parsing
                                        const workbook = XLSX.read(data, { type: 'array' });

                                        // Assuming the first sheet is the one you want to work with
                                        const sheetName = workbook.SheetNames[0];
                                        const worksheet = workbook.Sheets[sheetName];

                                        // Parse the data in the worksheet
                                        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });


                                        // You now have the Excel data in a JavaScript array (jsonData)
                                        //console.log(jsonData);
                                        const jsonDataJSON = JSON.stringify(jsonData);
                                        const url = '/Asset/ITDataMigration';
                                        //console.log(jsonDataJSON)
                                        fetch(url, {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json', // Set the content type to JSON
                                            },
                                            body: jsonDataJSON, // Pass the JSON data as the request body
                                        })

                                            .then(response => {
                                                if (response.ok) {
                                                    // Request was successful, you can handle the success here

                                                    return response.text(); // You may not need this line if you don't need the response body
                                                } else {
                                                    // Handle the error here
                                                    throw new Error('Data migration failed');
                                                }
                                            })
                                            .then(data => {
                                                // Handle the success response, if needed
                                                $('#tblAsset').DataTable().ajax.reload();
                                                console.log(data + " - kasdkjahsdahsd"); // This will log "Data migration successful" from your C# controller
                                                Swal.fire(
                                                    'Success',
                                                    data,
                                                    'success'
                                                )

                                            })
                                            .catch(error => {
                                                // Handle errors here
                                                console.error(error);
                                                $('#tblAsset').DataTable().ajax.reload();
                                                Swal.fire(
                                                    'Error',
                                                    'Please check your data and dont change the format of excel. ' + error,
                                                    'error'
                                                )
                                            });

                                    };

                                    reader.readAsArrayBuffer(file);

                                }
                            });

                            // Trigger a click on the input element to open the file dialog
                            inputElement.click();

                        }
                    },
                    {
                        text: 'Download Migration File',
                        action: function () {
                            var workbook = XLSX.utils.book_new();

                            // Add a worksheet with sample data
                            var data = [
                                ['Name', 'Description', 'Category', 'Model', 'Asset_Tag', 'MIS_Asset_Tag_Code', 'Serial', 'OS_Details', 'ProcessorModel', 'Disk_Details', 'Ram_Details', 'Status', 'Order_Number', 'Purchase_date', 'Purchase_cost', 'Warranty_months', 'Company', 'Location', 'Department', 'Assigned_firstname', 'Assigned_middlename', 'Assigned_lastname', 'Assigned_extname', 'Assigned_email', 'Supplier', 'Supplier_Contact_Person', 'Supplier_Email', 'Supplier_Phone', 'Supplier_Address'],

                            ];
                            var ws = XLSX.utils.aoa_to_sheet(data);
                            XLSX.utils.book_append_sheet(workbook, ws, 'Sheet1');

                            // Convert the workbook to a base64 encoded string
                            var base64data = XLSX.write(workbook, { bookType: 'xlsx', type: 'base64' });

                            // Create a data URL and trigger the download
                            var blob = base64toBlob(base64data);

                            const currentDateTime = getCurrentDateTime();
                            downloadFile(blob, 'MigrationFile_' + currentDateTime + '.xlsx');

                            function base64toBlob(base64data) {
                                var byteCharacters = atob(base64data);
                                var byteNumbers = new Array(byteCharacters.length);
                                for (var i = 0; i < byteCharacters.length; i++) {
                                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                                }
                                var byteArray = new Uint8Array(byteNumbers);
                                return new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                            }

                            function downloadFile(blob, filename) {
                                var url = window.URL.createObjectURL(blob);
                                var a = document.createElement('a');
                                a.href = url;
                                a.download = filename;
                                a.style.display = 'none';
                                document.body.appendChild(a);
                                a.click();
                                window.URL.revokeObjectURL(url);
                            }


                            function getCurrentDateTime() {
                                const now = new Date();

                                // Get the date components
                                const year = now.getFullYear();
                                const month = String(now.getMonth() + 1).padStart(2, '0');
                                const day = String(now.getDate()).padStart(2, '0');

                                // Get the time components
                                const hours = String(now.getHours()).padStart(2, '0');
                                const minutes = String(now.getMinutes()).padStart(2, '0');
                                const seconds = String(now.getSeconds()).padStart(2, '0');

                                // Combine the components to form the date and time string
                                const dateTimeString = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;

                                return dateTimeString;
                            }



                        }
                    }

                ]
            },
            {
                //extend: 'collection',
                text: 'Mass Status Change.',
                action: function () {
                    var dataCheckBox = document.getElementsByName("IDData");

                    var jsonArray = [];
                    for (var i = 0; i < dataCheckBox.length; i++) {
                        var dataStatusinData = dataCheckBox[i];
                        if (dataStatusinData.checked == true) {
                            //dataID.push(dataStatusinData.value);
                            var dataID = dataStatusinData.value; // Obtain dataStatusinData.value inside the loop

                            // Create a JSON object and add dataID to it for each iteration
                            var jsonObject = { value: dataID };
                            jsonArray.push(jsonObject);
                        }


                    }


                    var modal = document.getElementById("myModal");
                    modal.style.display = "block";

                    var span = document.getElementsByClassName("close")[0];

                    span.onclick = function () {
                        modal.style.display = "none";
                    }

                    var jsonString = JSON.stringify(jsonArray);
                    document.getElementById("dataID").value = jsonString;
                }



            },
            {
                text: 'Asset Scanning',
                action: function () {
                    //window.location.href = '/Asset/Scanning';
                    window.open('/Asset/Scanning', '_blank');
                }
            }



        ],


        "processing": true,
        "serverSide": true,
        "filter": true, //Search Box
        "orderMulti": false,
        "stateSave": true,

        "ajax": {
            "url": "/Asset/ITGetDataTabelData",
            "type": "POST",
            "datatype": "json"
        },


        "columns": [
            {
                data: "Id", "name": "Id", render: function (data, type, row) {
                    // return "<a href='#' class='fa fa-eye' onclick=Details('" + row.Id + "');>" + row.Id + "</a>";

                    return "<input type='checkbox' id='IDData' name='IDData' value='" + row.Id + "'>";
                }
            },
            {
                data: "Id", "name": "Id", render: function (data, type, row) {
                    return "<a href='#' class='fa fa-eye' onclick=Details('" + row.Id + "');>" + row.Id + "</a>";
                }
            },
            {
                data: null, render: function (data, type, row) {
                    return "<a href='#' class='d-block' onclick=ViewImageByURLOnly('" + row.ImageURL + "');><div class='image'><img src='" + row.ImageURL + "' class='img-circle elevation-2 imgCustom75px' alt='Asset Image'></div></a>";
                }
            },
            { "data": "AssetId", "name": "AssetId" },
            { "data": "AssetModelNo", "name": "AssetModelNo" },
            { "data": "Name", "name": "Name" },
            { "data": "Description", "name": "Description" },
            { "data": "UnitPrice", "name": "UnitPrice" },
            { "data": "AssetStatusDisplay", "name": "AssetStatusDisplay" },
            {
                "data": "DateOfPurchase",
                "name": "DateOfPurchase",
                "autoWidth": true,
                "render": function (data) {
                    var date = new Date(data);
                    var month = date.getMonth() + 1;
                    return (month.length > 1 ? month : month) + "/" + date.getDate() + "/" + date.getFullYear();
                }
            },
            {
                data: "UserProfileId", "name": "UserProfileId", render: function (data, type, row) {
                    return "<a href='#' class='fa fa-plus' onclick=AllocateAsset('" + row.Id + "');>Allocate</a>";
                },
                Width: "50px",
            },
            {
                data: null, render: function (data, type, row) {
                    return "<a href='#' class='btn btn-link btn-xs' onclick=PrintAsset('" + row.Id + "');><span class='fa fa-print'>Print</span></a>";
                }
            },
            {
                data: null, render: function (data, type, row) {
                    if (row.IsAdmin) {
                        return "<a href='#' class='btn btn-info btn-xs' onclick=AddEdit('" + row.Id + "');>Edit</a>";
                    }
                    else {
                        return "-";
                    }
                }
            },
            {
                data: null, render: function (data, type, row) {
                    if (row.IsAdmin) {
                        return "<a href='#' class='btn btn-danger btn-xs' onclick=Delete('" + row.Id + "'); >Delete</a>";
                    }
                    else {
                        return "-";
                    }
                }
            }
        ],

        'columnDefs': [{
            'targets': [1, 7, 8, 9, 10],
            'orderable': false,
        }],

        "lengthMenu": [[20, 10, 15, 25, 50, 100, 200], [20, 10, 15, 25, 50, 100, 200]]
    });

});

