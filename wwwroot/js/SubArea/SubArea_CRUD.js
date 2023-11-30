var Details = function (id) {
    var url = "/SubArea/Details?id=" + id;
    $('#titleBigModal').html("Area Details");
    loadBigModal(url);
};


var AddEdit = function (id) {
    var url = "/SubArea/AddEdit?id=" + id;
    if (id > 0) {
        $('#titleExtraBigModal').html("Edit SubArea");
    }
    else {
        $('#titleExtraBigModal').html("Add SubArea");
    }
    loadExtraBigModal(url);
};

var SaveAssetRequest = function () {
    if (!$("#frmSubArea").valid()) {
        return;
    }

    var _frmSubArea = $("#frmSubArea").serialize();
    $("#btnSave").val("Please Wait");
    $('#btnSave').attr('disabled', 'disabled');
    $.ajax({
        type: "POST",
        url: "/SubArea/AddEdit",
        data: _frmSubArea,
        success: function (result) {
            Swal.fire({
                title: result,
                icon: "success"
            }).then(function () {
                document.getElementById("btnClose").click();
                $("#btnSave").val("Save");
                $('#btnSave').removeAttr('disabled');
                $('#tblSubArea').DataTable().ajax.reload();
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
                url: "/SubArea/Delete?id=" + id,
                success: function (result) {
                    var message = "SubArea Request has been deleted successfully. Area Request ID: " + result.ID;
                    Swal.fire({
                        title: message,
                        icon: 'info',
                        onAfterClose: () => {
                            $('#tblSubArea').DataTable().ajax.reload();
                        }
                    });
                }
            });
        }
    });
};
