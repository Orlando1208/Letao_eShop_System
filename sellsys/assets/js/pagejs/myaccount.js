$(()=>{
    let userid=$.cookie('userid')
    // console.log(cartData)
    if(userid==null){
        $(location).attr('href', 'http://127.0.0.1:5500/login-register.html');
    }else{
        let username=$.cookie('userName')
        let address=$.cookie('address')
        let phoneNumber=$.cookie('phoneNumber')
        let notes=$.cookie('notes')
        $('.username-for-js').html(username)
        $("#username-big-for-js").html(`用户名:${username}`)
        $("#notes-big-for-js").html(`详情:${notes}`)
        $('#address-for-js').html(address)
        $('#addressEdit-for-js').val(address)
        $("#phoneNumberEdit-for-js").val(phoneNumber)
        $('#notes-for-js').html(notes)
        $('#phoneNumber-for-js').html("电话: (086)"+phoneNumber)
        // $(".logout").click(function(){
        //     $.removeCookie('userName',{ path: '/'})
        //     $.removeCookie('userPwd',{ path: '/'})
        //     $.removeCookie('userid',{ path: '/'})
        // })
        axios({
            method:"GET",
            url:'http://192.168.43.201:8081/getorders',
            params:{
                "bid":userid
            }
        }).then(value=>{
            let list=value.data.data
            // console.log(list)
            for(let v in list){
                axios({
                    method:"GET",
                    url:'http://192.168.43.201:8081/goods',
                    params:{
                        "gid":list[v].orderGoods
                    }
                }).then(value=>{
                    let item=$(`
                    <tr>
                        <td>${v}</td>
                        <td>${value.data.data.goodsName}</td>
                        <td>${list[v].orderDate}</td>
                        <td>${list[v].orderStatus}</td>
                        <td>￥${list[v].orderPrice}</td>
                        <td><a href="order.html?id=${v}" class="btn">详情</a></td>
                    </tr>                    
                    `)
                    $("#orderList-for-js").append(item)
                })
            }

        }).catch(err=>{
            console.log("orderList error",err)
        })
    }
})
$("#edit-for-js").click(function(){
    if($(this).attr('methods')=='edit'){
        $('#addressEdit-for-js').css('display','block')
        $('#phoneNumberEdit-for-js').css('display','block')
        $("#cancel-for-js").css('display','block')
        $(this).attr('methods','save')
        $(this).html("保存")
    }
    else{
        let id=$.cookie('userid')
        let address=$('#addressEdit-for-js').val()
        let phoneNumber=$('#phoneNumberEdit-for-js').val()
        let postData=new FormData()
        postData.append('id',id)
        postData.append('address',address)
        postData.append('mobile',phoneNumber)
        axios({
            method:"POST",
            url:'http://192.168.43.201:8081/setAddress',
            data:postData
        }).then(value=>{
            console.log('update success')
            $.cookie('address',address, { expires: 7, path: '/' })
            $.cookie('phoneNumber',phoneNumber, { expires: 7, path: '/' })
            $('#addressEdit-for-js').val(address)
            $("#phoneNumberEdit-for-js").val(phoneNumber)
        }).catch(err=>{
            console.log('update error',err)
        })
        $('#addressEdit-for-js').css('display','none')
        $('#phoneNumberEdit-for-js').css('display','none')
        $("#cancel-for-js").css('display','none')
        $(this).attr('methods','edit')
        $(this).html("编辑")
    }
})
$("#cancel-for-js").click(function(){
    $('#addressEdit-for-js').val("")
    $('#addressEdit-for-js').val("")
    $('#addressEdit-for-js').css('display','none')
    $('#phoneNumberEdit-for-js').css('display','none')
    $("#cancel-for-js").css('display','none')
    $(this).attr('methods','edit')
    $(this).html("编辑")
})

$("#save-change-btn").click(function(){
    let currentpwd=$("#current-pwd").val()
    let newpwd=$("#new-pwd").val()
    let confirmpwd=$("#confirm-pwd").val()
    let correctpwd=$.cookie('userPwd')

    if(currentpwd!=correctpwd){
        alert('密码错误')
        $("#current-pwd").val("")
        $("#new-pwd").val("")
        $("#confirm-pwd").val("")
    }else if(newpwd!=confirmpwd){
        alert("两层输入的密码必须相同")
        $("#current-pwd").val("")
        $("#new-pwd").val("")
        $("#confirm-pwd").val("")
    }else{
        let id=$.cookie('userid')
        let postData=new FormData()
        postData.append('id',id)
        postData.append('newPwd',newpwd)
        axios({
            url:'http://192.168.43.201:8081/setPassword',
            method:"POST",
            data:postData
        }).then(value=>{
            $.cookie('userPwd',newpwd, { expires: 7, path: '/' })
            alert("修改成功")
        }).catch(err=>{
            alert("修改失败")
        })
    }
})

$(".logout-for-js").click(function(){
    $.removeCookie("userid", { path: '/' })
    $.removeCookie("searchType", { path: '/' })
    $.removeCookie("phoneNumber", { path: '/' })
    $.removeCookie("address", { path: '/' })
    $.removeCookie("notes", { path: '/' })
})
