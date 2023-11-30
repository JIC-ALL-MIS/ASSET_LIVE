var Details = function (id) {
    var url = "/Area/Details?id=" + id;
    $('#titleBigModal').html("Area Details");
    loadBigModal(url);
};


var AddEdit = function (id) {
    var url = "/Area/AddEdit?id=" + id;
    if (id > 0) {
        $('#titleExtraBigModal').html("Edit Area");
    }
    else {
        $('#titleExtraBigModal').html("Add Area");
    }
    loadExtraBigModal(url);
};

var SaveAssetRequest = function () {
    if (!$("#frmArea").valid()) {
        return;
    }

    var _frmArea = $("#frmArea").serialize();
    $("#btnSave").val("Please Wait");
    $('#btnSave').attr('disabled', 'disabled');
    $.ajax({
        type: "POST",
        url: "/Area/AddEdit",
        data: _frmArea,
        success: function (result) {
            Swal.fire({
                title: result,
                icon: "success"
            }).then(function () {
                document.getElementById("btnClose").click();
                $("#btnSave").val("Save");
                $('#btnSave').removeAttr('disabled');
                $('#tblArea').DataTable().ajax.reload();
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
                url: "/Area/Delete?id=" + id,
                success: function (result) {
                    var message = "Area Request has been deleted successfully. Area Request ID: " + result.ID;
                    Swal.fire({
                        title: message,
                        icon: 'info',
                        onAfterClose: () => {
                            $('#tblArea').DataTable().ajax.reload();
                        }
                    });
                }
            });
        }
    });
};
