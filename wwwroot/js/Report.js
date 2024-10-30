
var AssetStatusReportByDate = function (StartDate, EndDate) {
    location.href = "/Report/AssetStatusReportByDate?StartDate= " + StartDate + "&EndDate= " + EndDate;
};


var AssetStatusReport = function () {
    location.href = "/Report/AssetStatusReport";
};


var AssetAllocationReportByDate = function (StartDate, EndDate, Company, Department) {
    location.href = "/Report/AssetAllocationReportByDate?StartDate= " + StartDate + "&EndDate= " + EndDate + "&Company= " + Company + "&Department= " + Department;
};


var AssetAllocationReport = function () {
    location.href = "/Report/AssetAllocationReport";
};


