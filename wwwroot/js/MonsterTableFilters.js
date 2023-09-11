 var sizeFilters = [];

$(document).ready(function () {

    $('#size-filter').on('change', function () {
        //console.log(sizeFilters);
        UpdateTags(this.value);
        loadMonsterPage(currentPage, extractTagsToArray());
        console.log(sizeFilters)
        this.value = "default";

       
    });
});


function extractTagsToArray() {
    const tagsArray = [];
    $('.filter-tags .filter-tag').each(function () {
        tagsArray.push($(this).text());
    });
    return tagsArray;
}


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