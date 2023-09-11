var sizeFilters = [];



$(document).ready(function () {

    $('#size-filter').on('change', function () {
        sizeFilters.push(this.value);
        console.log('hit');
        console.log(sizeFilters);
    });
});