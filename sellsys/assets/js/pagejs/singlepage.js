function getData1(){
var id=$.Request("id");
console.log(id);
return id
}

$(function(){
    let id=getData1();
    axios({
        method:"GET",
        url: 'http://192.168.43.201:8081/goods',
        params:{
            gid:id
        }
    }).then((result) => {
        let value=result.data.data
        console.log(value)
        $('#img-big-for-js').attr('src',value.goodsPic)
        $("#a-big-for-js").attr('href',value.goodsPic)
        $("#goods-name-for-js").html(value.goodsName)
        $("#goods-price-for-js").html("￥"+value.goodsPrice)
        $("#goods-description-for-js").html(value.description)
        $("#goods-description-big-for-js").html(value.description)
    }).catch((err) => {
        console.log('初始化失败',err)
    });
});
$('#buyBtn').click(function(){
    let id=Number(getData1());
    $.cookie('goodsId',id,{ expires: 7, path: '/' })
    let number=Number($("#goods-number").val())
    $.cookie('goodsNumber',number,{ expires: 7, path: '/' })
    let url=`checkout.html?#id=${id}&number=${number}`
    location.href=url;
})