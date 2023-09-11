var sizeFilters = [];



$(document).ready(function () {

    $('#size-filter').on('change', function () {
        //console.log(sizeFilters);
        UpdateTags(this.value);
        console.log(sizeFilters)

       
    });
});


function UpdateTags(tag) {
    if (sizeFilters.includes(tag)) {
        console.log("tag already selected");
        RemoveTag(tag);
    }
    else {
        var spanTag = $(`<span class='filter-tag' id='${tag}'></span>`).text(tag);
       
        $(".filter-tags").append(spanTag);
        sizeFilters.push(tag);
        
    }
}

function RemoveTag(tag) {
    var index = sizeFilters.indexOf(tag);
    if (index !== -1) {
        sizeFilters.splice(index, 1);
        var tagToRemove = document.getElementById(tag)
        tagToRemove.remove();

    }
    
}