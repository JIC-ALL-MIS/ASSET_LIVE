var Details = function (id) {
    var url = "/Location/Details?id=" + id;
    $('#titleBigModal').html("Asset Request Details");
    loadBigModal(url);
};


var AddEdit = function (id) {
    var url = "/Location/AddEdit?id=" + id;
    if (id > 0) {
        $('#titleExtraBigModal').html("Edit Asset Request");
    }
    else {
        $('#titleExtraBigModal').html("Add Asset Request");
    }
    loadExtraBigModal(url);
};

var SaveAssetRequest = function () {
    if (!$("#frmLocation").valid()) {
        return;
    }

    var _frmLocation = $("#frmLocation").serialize();
    $("#btnSave").val("Please Wait");
    $('#btnSave').attr('disabled', 'disabled');
    $.ajax({
        type: "POST",
        url: "/Location/AddEdit",
        data: _frmLocation,
        success: function (result) {
            Swal.fire({
                title: result,
                icon: "success"
            }).then(function () {
                document.getElementById("btnClose").click();
                $("#btnSave").val("Save");
                $('#btnSave').removeAttr('disabled');
                $('#tblLocationArea').DataTable().ajax.reload();
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
                url: "/Location/Delete?id=" + id,
                success: function (result) {
                    var message = "Location Request has been deleted successfully. Location Request ID: " + result.ID;
                    Swal.fire({
                        title: message,
                        icon: 'info',
                        onAfterClose: () => {
                            $('#tblLocationArea').DataTable().ajax.reload();
                        }
                    });
                }
            });
        }
    });
};
