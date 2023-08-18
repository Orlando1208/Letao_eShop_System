<template>
    <el-container style="height:100%; border: 1px solid #eee">
        <el-aside width="220px"  style="background-color: rgb(238, 241, 246)">
            <el-button style="width:200px;height:50px" icon="el-icon-s-grid" @click="filterData(-1)">显示全部</el-button>
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose">
                <el-submenu index="1">
                    <template slot="title">
                    
                    <span>按商品</span>
                    </template>
                    <el-input placeholder="请输入内容" v-model="fGoodsID" class="input-with-select" style="margin-top:5px" @focus="filterData(0)"></el-input>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                    
                    <span>按卖家</span>
                    </template>
                    <el-input placeholder="请输入内容" v-model="fOwnerID" class="input-with-select" style="margin-top:5px" @focus="filterData(1)"></el-input>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                    
                    <span>按客户</span>
                    </template>
                    <el-input placeholder="请输入内容" v-model="fCustomerID" class="input-with-select" style="margin-top:5px" @focus="filterData(2)"></el-input>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                    <span>按状态</span>
                    </template>
                    <el-menu-item v-for="(item, index) in StatusList" :key="index" @click="filterData(3,item)">{{statusList[item]}}</el-menu-item>
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title">
                    <span>按发货地</span>
                    </template>
                    <el-input placeholder="请输入内容" v-model="fEXAddress" class="input-with-select" style="margin-top:5px" @focus="filterData(4)"></el-input>
                </el-submenu>
                <el-submenu index="6">
                    <template slot="title">
                    <span>按收货地</span>
                    </template>
                    <el-input placeholder="请输入内容" v-model="fIMAddress" class="input-with-select" style="margin-top:5px" @focus="filterData(5)"></el-input>
                </el-submenu>
                <el-submenu index="7">
                    <template slot="title">
                    <span>按收件人姓名</span>
                    </template>
                    <el-input placeholder="请输入内容" v-model="fReciverName" class="input-with-select" style="margin-top:5px" @focus="filterData(6)"></el-input>
                </el-submenu>
                <el-submenu index="8">
                    <template slot="title">
                    <span>按收件人电话</span>
                    </template>
                    <el-input placeholder="请输入内容" v-model="fReciverPhone" class="input-with-select" style="margin-top:5px" @focus="filterData(7)"></el-input>
                </el-submenu>
            </el-menu>
        </el-aside>
        
        <el-container>
            <el-main>
                <el-table
                    :data="filteredData"
                    stripe
                    style="width: 100%">
                    <el-table-column
                    prop="orderID"
                    label="订单ID"
                    width="90"
                    fixed
                    sortable
                    >
                    </el-table-column>
                    <el-table-column
                    prop="orderGoods"
                    label="商品ID"
                    width="120"
                    sortable
                    >
                    </el-table-column>
                    <el-table-column
                    prop="orderBuyer"
                    label="客户ID"
                    width="100"
                    sortable
                    >
                    </el-table-column>
                    <el-table-column
                    prop="orderSeller"
                    label="卖家ID"
                    width="180"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="orderCount"
                    label="商品数目"
                    width="100"
                    sortable
                    >
                    </el-table-column>
                    <el-table-column
                    prop="orderPrice"
                    label="商品总价(￥)"
                    width="130"
                    sortable
                    >
                    </el-table-column>
                    <el-table-column
                    prop="orderStatus"
                    label="订单状态"
                    width="100"
                    sortable
                    >
                    <template slot-scope="scope">
                        <el-tag style="cursor:pointer" @click="changeStatus(scope.$index, scope.row)" :effect="getStatus(scope.row.orderStatus)[0]" :type="getStatus(scope.row.orderStatus)[1]">{{getStatus(scope.row.orderStatus)[2]}}</el-tag>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="orderSaddress"
                    label="发货地址"
                    width="100"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="orderBaddress"
                    label="收货地址"
                    width="100"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="orderRec"
                    label="收件人姓名"
                    width="100"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="orderMobile"
                    label="收件人电话"
                    width="100"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="orderDate"
                    label="下单日期"
                    width="100"
                    sortable
                    >
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import Axios from 'axios'
export default {
        data() {
            return {
                tableData:null,
                fOwnerID:null,
                fGoodsID:null,
                fCustomerID:null,
                fEXAddress:null,
                fIMAddress:null,
                fReciverName:null,
                fReciverPhone:null,
                filterType:-1,
                filterStatus:null,

                fileList: [],
                statusList:['已下单','已出库','运输中','已送达','已收货','出错了'],
                formLabelWidth: '120px',
            }
        },
        methods: {
            getStatus(status){
                if(status==0){
                    return ['plain','info','已下单']
                }else if(status==1){
                    return ['light','info','已出库']
                }else if(status==2){
                    return ['light','warning','运输中']
                }else if(status==3){
                    return ['light','success','已送达']
                }else if(status==4){
                    return ['dark','success','已收货']
                }else if(status==5){
                    return ['light','danger','出错了']
                }
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleEdit(index, row) {
                console.log(index, row);
                this.editFormVisible=true
                let a={...row}
                this.form=a
                console.log(this.form)
                // console.log({...this.form})
            },
            handleDelete(index, row) {
                console.log(index, row);
                this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this.$axios({
                            url: 'http://192.168.43.201:8081/deleteGoods',
                            method: 'GET',
                            params:{"gid":row.goodsID},
                        }).then(value=>{
                            const result = this.tableData.filter(goods=>{return goods.goodsID!=row.goodsID});
                            this.tableData=result
                            console.log('delete success',value)
                        }).then(value=>{
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }).catch(reason=>{
                            return 'error'
                        })
                    }).catch((reason) => {
                        console.log(reason)
                        if(reason=='error'){
                            this.$message({
                            type: 'danger',
                            message: '删除失败！'
                            });   
                        }else{
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });   
                        }
       
                });
            },
            filterData(filterType,data=null){
                this.filterType=filterType
                this.filterStatus=data
            },
            handleRemove(file, fileList) {
                    console.log(file, fileList);
                },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                // return this.$confirm(`确定移除 ${ file.name }`);
            },
            beforeUpload(file){
            this.files = file;
            // console.log("files:"+this.files)
            const extension = file.name.split('.')[1] === 'jpg'
            const extension2 = file.name.split('.')[1] === 'png'
            const isLt2M = file.size / 1024 / 1024 < 5
            if (!extension && !extension2) {
            this.$message.warning('上传模板只能是jpg/png格式!')
            return
            }
            if (!isLt2M) {
            this.$message.warning('上传模板大小不能超过 5MB!')
            return
            }
            this.fileName = file.name;
            return false // 返回false不会自动上传
            },
            changeStatus(index, row){
                // console.log(index, row);
                let postData=new FormData()
                postData.append("id",row.orderID)
                postData.append("status",(row.orderStatus+1)%6)
                this.$axios({
                    url:"http://192.168.43.201:8081/updateStatus",
                    method:'POST',
                    data:postData
                }).then(value=>{
                    for(let v of this.tableData){
                        if(v.orderID==row.orderID){
                            v.orderStatus=(v.orderStatus+1)%6
                        }
                    }
                }).catch(err=>{
                    console.log('update error',err)
                })
            }
        },
        computed:{
            StatusList(){
                let statuslist=[]
                if(this.tableData==null){
                    return null;
                }
                for(let v of this.tableData){
                    let type=v.orderStatus
                    if(statuslist.indexOf(type)==-1){
                        statuslist.push(type)
                    }
                }
                return statuslist
            },
            filteredData(){
                if(this.filterType==-1){
                    return this.tableData
                }
                else if(this.filterType==3){
                    return this.tableData.filter((v)=>{
                        return v.orderStatus==this.filterStatus
                    })
                }
                else if(this.filterType==0){
                    if(this.fGoodsID==""||this.fGoodsID==null){
                        return this.tableData
                    }
                    else{
                        return this.tableData.filter((v)=>{
                            // console.log(this.ownerID)
                        return v.orderGoods==Number(this.fGoodsID)
                        })
                    }
                }
                else if(this.filterType==1){
                    if(this.fOwnerID==""||this.fOwnerID==null){
                        return this.tableData
                    }
                    else{
                        return this.tableData.filter((v)=>{
                            // console.log(this.ownerID)
                        return v.orderSeller==Number(this.fOwnerID)
                        })
                    }
                }
                else if(this.filterType==2){
                    if(this.fCustomerID==""||this.fCustomerID==null){
                        return this.tableData
                    }
                    else{
                        return this.tableData.filter((v)=>{
                            // console.log(this.ownerID)
                        return v.orderBuyer==Number(this.fCustomerID)
                        })
                    }
                }
                else if(this.filterType==4){
                    if(this.fEXAddress==""||this.fEXAddress==null){
                        return this.tableData
                    }
                    else{
                        return this.tableData.filter((v)=>{
                            // console.log(this.ownerID)
                        return v.orderSaddress==this.fEXAddress
                        })
                    }
                }
                else if(this.filterType==5){
                    if(this.fIMAddress==""||this.fIMAddress==null){
                        return this.tableData
                    }
                    else{
                        return this.tableData.filter((v)=>{
                            // console.log(this.ownerID)
                        return v.orderBaddress==this.fIMAddress
                        })
                    }
                }
                else if(this.filterType==6){
                    if(this.fReciverName==""||this.fReciverName==null){
                        return this.tableData
                    }
                    else{
                        return this.tableData.filter((v)=>{
                            // console.log(this.ownerID)
                        return v.orderRec==this.fReciverName
                        })
                    }
                }
                else if(this.filterType==7){
                    if(this.fReciverPhone==""||this.fReciverPhone==null){
                        return this.tableData
                    }
                    else{
                        return this.tableData.filter((v)=>{
                            // console.log(this.ownerID)
                        return v.orderMobile==this.fReciverPhone
                        })
                    }
                }
            }
        },
        mounted() {
            this.$axios({
                url: 'http://192.168.43.201:8081/allOrders',
                method: 'get'
            }).then(value=>{
                console.log(value)
                let goodsArr=[]
                for(let v in value.data.data){
                    goodsArr.push(value.data.data[v])
                }
                this.tableData=goodsArr
            })
        },
}
</script>

<style scoped>
    .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }

</style>
