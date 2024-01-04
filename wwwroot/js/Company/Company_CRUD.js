var Details = function (id) {
    var url = "/Company/Details?id=" + id;
    $('#titleBigModal').html("Area Details");
    loadBigModal(url);
};


var AddEdit = function (id) {
    var url = "/Company/AddEdit?id=" + id;
    if (id > 0) {
        $('#titleExtraBigModal').html("Edit Company");
    }
    else {
        $('#titleExtraBigModal').html("Add Company");
    }
    loadExtraBigModal(url);
};

var SaveAssetRequest = function () {
    if (!$("#frmCompany").valid()) {
        return;
    }

    //var _frmCompany = $("#frmCompany").serialize();
    var _frmCompany = PreparedFormObj2();
    $("#btnSave").val("Please Wait");
    $('#btnSave').attr('disabled', 'disabled');
    $.ajax({
        type: "POST",
        url: "/Company/AddEdit",
        data: PreparedFormObj2(),
        processData: false,
        contentType: false,
        success: function (result) {
            Swal.fire({
                title: result,
                icon: "success"
            }).then(function () {
                document.getElementById("btnClose").click();
                $("#btnSave").val("Save");
                $('#btnSave').removeAttr('disabled');
                $('#tblCompany').DataTable().ajax.reload();
            });
        },
        error: function (errormessage) {
            SwalSimpleAlert(errormessage.responseText, "warning");
        }
    });
}

var Delete = function (id) {
    Swal.fire({
        title: 'Do you want to delete this item?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "POST",
                url: "/Company/Delete?id=" + id,
                success: function (result) {
                    var message = "Company Request has been deleted successfully. Company Request ID: " + result.ID;
                    Swal.fire({
                        title: message,
                        icon: 'info',
                        onAfterClose: () => {
                            $('#tblCompany').DataTable().ajax.reload();
                        }
                    });
                }
            });
        }
    });
};


var PreparedFormObj2 = function () {
    var _FormData = new FormData()
    _FormData.append('ID', $("#ID").val())
    _FormData.append('Name', $("#Name").val())
    _FormData.append('Code', $("#Code").val())
    _FormData.append('ImageURL', $("#ImageURL").val())
    _FormData.append('ImageURLDetails', $('#ImageURLDetails')[0].files[0])
    return _FormData;
}