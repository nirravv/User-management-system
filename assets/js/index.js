$("#add_user").submit(function(event){
    alert("User Added Successfully!");
})

$("#update_user").submit(function(event){
    event.preventDefault();
    var unindexed_array = $(this).serializeArray();
    var data = {}
    $.map(unindexed_array, function(n,i){
        data[n['name']] = n['value'];
    })
    var request = {
        "url":`https://ums-express.vercel.app/api/users/${data.id}`,
        "method":"PUT",
        "data":data
    }
    $.ajax(request).done(function(response){
        alert("User updated successfully!");
    })
})

if(window.location.pathname == "/"){
    $ondelete= $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id");

        var request = {
            "url":`https://ums-express.vercel.app/api/users/${id}`,
            "method":"DELETE",
        }

        if(confirm("Do you want to delete this user? ")){
            $.ajax(request).done(function(response){
                alert("User deleted successfully!");
                window.location.href = window.location.href;
            })
        }
    })
}