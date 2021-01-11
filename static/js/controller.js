

$.ajax({
    url:'/homeApi',
    timeout:10000,
    success:function(data){
        console.log(data)
        $("#test01").html(JSON.stringify(data))
    },
    error:function(xhr,type,errorThrown) {

    }
})