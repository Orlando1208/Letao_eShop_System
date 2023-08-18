// let goodsId=Number(getData1());
let goodsId=Number($.cookie('goodsId'))
console.log(goodsId)

let goodsNumber=Number($.cookie('goodsNumber'));
console.log(goodsNumber)
$(function(){
    let userid=$.cookie('userid')
    // console.log(cartData)
    if(userid==null){
        $(location).attr('href', 'http://127.0.0.1:5500/login-register.html');
    }
    else{

        // console.log(goodsNumber)
        let address=$.cookie('address')
        let phoneNumber=$.cookie('phoneNumber')
        $("#address1-for-js").val(address)
        $("#phoneNumber-for-js").val(phoneNumber)
        axios({
            method:"GET",
            url: 'http://192.168.43.201:8081/goods',
            params:{
                gid:goodsId
            }
        }).then((result)=>{
            // $("#goods-name-for-js").html(result.name)
            let goods=$(`                                                
                <li >${result.data.data.goodsName} X ${goodsNumber} <span>￥${Number(result.data.data.goodsPrice)}</span></li>
            `)
            $("#goods-name-for-js").html(goods)
            $("#total-goods-price-for-js").html("￥"+Number(result.data.data.goodsPrice)*Number(goodsNumber))
            $("#total-price-for-js").html("￥"+Number(result.data.data.goodsPrice)*Number(goodsNumber))
        }).catch((err)=>{
            console.log('初始化失败',err)
        })
    }
    
})

let Name=""
let PhoneNumber=$.cookie('phoneNumber')
let Address=$.cookie('address')
// let Province=""
// let DetailedAddress=""

$("#name-for-js").blur(function(){
    Name=$(this).val()
})

$("#phoneNumber-for-js").blur(function(){
    PhoneNumber=$(this).val()
})

// $("#DetailedAddress-for-js").blur(function(){
//     DetailedAddress=$(this).val()
// })

$("#address1-for-js").blur(function(){
    if ($("#shiping_address").attr('checked') !=true){
        Address=$("#address1-for-js").val()
    }
    else{
        Address=$("#address2-for-js").val()
    }
})

$("#address2-for-js").blur(function(){
    if ($("#shiping_address").attr('checked') !=true){
        Address=$("#address1-for-js").val()
    }
    else{
        Address=$("#address2-for-js").val()
    }
})

$("#shiping_address").click(function(){
    if ($("#shiping_address").attr('checked') !=true){
        Address=$("#address1-for-js").val()
    }
    else{
        Address=$("#address2-for-js").val()
    }
})

// $("#province-for-js").click(function(){
    
//     Province=$('select#province-for-js option:selected').val();

// })

$("#submit-for-js").click(function(){
    console.log('click')
    var myDate = new Date;
    var year = myDate.getFullYear(); //获取当前年
    var mon = myDate.getMonth() + 1; //获取当前月
    var date = myDate.getDate(); //获取当前日
    // var h = myDate.getHours();//获取当前小时数(0-23)
    // var m = myDate.getMinutes();//获取当前分钟数(0-59)
    // var s = myDate.getSeconds();//获取当前秒
    let nowtime=year+'-'+mon+'-'+date
    console.log(Date)
    postdata=new FormData()
    let userid=$.cookie('userid')
    // let goodsid=getData1()
    // let number=getData2()
    let total=Number($("#total-price-for-js").html().slice(1))
    // console.log(total)
    postdata.append('userid',userid)
    postdata.append('goodsid',goodsId)
    postdata.append('number',goodsNumber)
    postdata.append('total',total)
    postdata.append('Name',Name)
    postdata.append('PhoneNumber',PhoneNumber)
    postdata.append('Address',Address)
    postdata.append('date',nowtime)
    axios({
        method:"POST",
        url:'http://192.168.43.201:8081/neworder',
        data:postdata
    }).then(value=>{
        console.log("submit success")
        $(location).attr("href",'my-account.html')
    }).catch(err=>{
        console.log("submit error",err)
    })
})


