$(()=>{

    let searchType=$.cookie('searchType')
    axios({
        method:"GET",
        url:'http://192.168.43.201:8081/searchType',
        params:{
            type:searchType
        }
    }).then(response=>{
        let list=response.data.data
        for(let v in list){
            let time=0
            axios({
            method:"GET",
            url:'http://192.168.43.201:8081/goods',
            params:{
                gid:list[v].goodsID
            }
            }).then(response=>{
                let itemData=response.data.data
                let item=$(`
            <div class="col-lg-3 col-md-6 col-sm-6 col-12" >
                <div class="fl-product shop-grid-view-product">
                    <div class="image">
                        <a href="single-product.html?id=${itemData.goodsID}">
                        <img src="${itemData.goodsPic}" class="img-fluid" alt="">
                        <img src="${itemData.goodsPic}" class="img-fluid" alt="">
                        </a>
                        

                    </div>
                    <div class="content">
                        <h2 class="product-title"> <a href="single-product.html?id=${itemData.goodsID}">${itemData.goodsName}</a></h2>
                        
                        <p class="product-price">
                            
                            <span class="discounted-price">￥${itemData.goodsPrice}</span>
                        </p>


                    </div>
                </div>
                <div class="fl-product shop-list-view-product">
                    <div class="image">
                        <a href="single-product.html?id=${itemData.goodsID}">
                            <img src="${itemData.goodsPic}" class="img-fluid" alt="">
                            <img src="${itemData.goodsPic}" class="img-fluid" alt="">
                        </a>
                    </div>
                    <div class="content">
                        <h2 class="product-title"> <a href="${itemData.goodsID}">${itemData.goodsName}</a></h2>
                        
                        <p class="product-price">
                            
                            <span class="discounted-price">￥${itemData.goodsPrice}</span>
                        </p>

                        <p class="product-description">${itemData.goodsDiscription}</p>

                        <div class="hover-icons">
                            <ul>
                                <li><a href="single-product.html?id=${itemData.goodsID}"  data-tooltip="立即购买">立即购买</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
                `)
                $("#display-area-for-js").append(item)
                // items.push(item)
                // console.log(item)
            },reject=>{
                console.log("搜索失败",reject)
            })
        }
    }).catch(reject=>{
        console.log("初始化失败",reject)
    })
})