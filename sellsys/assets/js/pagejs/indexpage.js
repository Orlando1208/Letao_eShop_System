$(()=>{
    // if(!$.cookie('userid')){
    //     $(location).attr('href','/login-register.html')
    // }
    axios({
        //请求类型
        method: "GET",
        //URL
        url: 'http://192.168.43.201:8081/banner'
    }).then(value => {
        for(let key in value.data.data){
            axios({
                method:"GET",
                url: 'http://192.168.43.201:8081/goods',
                params:{
                    gid:value.data.data[key].goodsID
                }
            }).then(value=>{
                let item=$(`.slider-bg-${Number(key)+1}`)
                item.find("#goodsName").html(value.data.data.goodsName)
                item.find("#goodsPrice").html("   "+value.data.data.goodsPrice)
                item.find(".slider-btn").attr('href',`single-product.html?id=${value.data.data.goodsID}`)
            })
        }
    },error=>{
        console.log("getBannerError",error)
    })

    axios({
        //请求类型
        method: "GET",
        //URL
        url: 'http://192.168.43.201:8081/banner2'
    }).then(value => {
        for(let key in value.data.data){
            axios({
                method:"GET",
                url: 'http://192.168.43.201:8081/goods',
                params:{
                    gid:value.data.data[key].goodsID
                }
            }).then(value=>{
                let item=$(`#single-banner-${Number(key)+1}`)
                item.find(".img-fluid").attr('src',value.data.data.goodsPic)
                item.find("#goodsType").html(value.data.data.goodsType)
                item.find("#goodsName").html(value.data.data.goodsName)
                item.find("#goodsPrice").html(value.data.data.goodsPrice)
                item.find(".href").attr('href',`single-product.html?id=${value.data.data.goodsID}`)
            })
        }
    },error=>{
        console.log("Banner2 Error",error)
    })    

    axios({
        //请求类型
        method: "GET",
        //URL
        url: 'http://192.168.43.201:8081/phone'
    }).then(value=>{
        for(let key in value.data.data){
            // console.log(key)
            axios({
                method:"GET",
                url: 'http://192.168.43.201:8081/goods',
                params:{
                    gid:value.data.data[key].goodsID
                }
            }).then(value=>{
                // let item=$(`#phone-for-js  #fl-product-${Number(key)+1}`)
                let item=$(`#phone-for-js  .fl-product`).eq(Number(key))
                item.find("img").attr('src',value.data.data.goodsPic)
                // console.log(value.data.data)
                // item.find("img").attr('src',"")
                item.find(".a2").html(value.data.data.goodsName)
                item.find(".discounted-price").html(value.data.data.goodsPrice)
                item.find("a").attr('href',`single-product.html?id=${value.data.data.goodsID}`)
                item.find(".a2").attr('href',`single-product.html?id=${value.data.data.goodsID}`)
            })
        }
    },error=>{
        console.log("phone error",error)
    })

    axios({
        //请求类型
        method: "GET",
        //URL
        url: 'http://192.168.43.201:8081/electric'
    }).then(value=>{
        for(let key in value.data.data){
            axios({
                method:"GET",
                url: 'http://192.168.43.201:8081/goods',
                params:{
                    gid:value.data.data[key].goodsID
                }
            }).then(value=>{
                let item=$(`#electric-for-js  .fl-product`).eq(Number(key))
                item.find("img").attr('src',value.data.data.goodsPic)
                // item.find("img").attr('src',"")
                item.find(".a2").html(value.data.data.goodsName)
                item.find(".discounted-price").html(value.data.data.goodsPrice)
                item.find("a").attr('href',`single-product.html?id=${value.data.data.goodsID}`)
                item.find(".a2").attr('href',`single-product.html?id=${value.data.data.goodsID}`)
            })
        }
    },error=>{
        console.log("electric error",error)
    })

    axios({
        //请求类型
        method: "GET",
        //URL
        url: 'http://192.168.43.201:8081/computer'
    }).then(value=>{
        for(let key in value.data.data){
            axios({
                method:"GET",
                url: 'http://192.168.43.201:8081/goods',
                params:{
                    gid:value.data.data[key].goodsID
                }
            }).then(value=>{
                let item=$(`#computer-for-js  .fl-product`).eq(Number(key))
                item.find("img").attr('src',value.data.data.goodsPic)
                // item.find("img").attr('src',"")
                item.find(".a2").html(value.data.data.goodsName)
                item.find(".discounted-price").html(value.data.data.goodsPrice)
                item.find("a").attr('href',`single-product.html?id=${value.data.data.goodsID}`)
                item.find(".a2").attr('href',`single-product.html?id=${value.data.data.goodsID}`)
            })
        }
    },error=>{
        console.log("computer error",error)
    })


    axios({
        //请求类型
        method: "GET",
        //URL
        url: 'http://192.168.43.201:8081/clothes'
    }).then(value=>{
        for(let key in value.data.data){
            axios({
                method:"GET",
                url: 'http://192.168.43.201:8081/goods',
                params:{
                    gid:value.data.data[key].goodsID
                }
            }).then(value=>{
                let item=$(`#clothes-for-js  .tab-product`).eq(Number(key))
                item.find("img").attr('src',value.data.data.goodsPic)
                // item.find("img").attr('src',"")
                item.find(".a2").html(value.data.data.goodsName)
                item.find(".discounted-price").html(value.data.data.goodsPrice)
                item.find("a").attr('href',`single-product.html?id=${value.data.data.goodsID}`)
                item.find(".a2").attr('href',`single-product.html?id=${value.data.data.goodsID}`)
            })
        }
    },error=>{
        console.log("clothes error",error)
    })


    axios({
        //请求类型
        method: "GET",
        //URL
        url: 'http://192.168.43.201:8081/makeups'
    }).then(value=>{
        for(let key in value.data.data){
            axios({
                method:"GET",
                url: 'http://192.168.43.201:8081/goods',
                params:{
                    gid:value.data.data[key].goodsID
                }
            }).then(value=>{
                let item=$(`#makeup-for-js  .tab-product`).eq(Number(key))
                item.find("img").attr('src',value.data.data.goodsPic)
                // item.find("img").attr('src',"")
                item.find(".a2").html(value.data.data.goodsName)
                item.find(".discounted-price").html(value.data.data.goodsPrice)
                item.find("a").attr('href',`single-product.html?id=${value.data.data.goodsID}`)
                item.find(".a2").attr('href',`single-product.html?id=${value.data.data.goodsID}`)
            })
        }
    },error=>{
        console.log("makeup error",error)
    })
})