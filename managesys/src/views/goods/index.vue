<template>
    <el-container style="height: 100%; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-button style="width:200px;height:50px" icon="el-icon-s-grid" @click="filterData(-1)">显示全部</el-button>
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose">
                <el-submenu index="1">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>按类别</span>
                    </template>
                    <el-menu-item v-for="(item, index) in TypeList" :key="index" @click="filterData(0,item)">{{item}}</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>按商户</span>
                    </template>
                    <el-input placeholder="请输入内容" v-model="ownerID" class="input-with-select" style="margin-top:5px" @focus="filterData(1)"></el-input>
                </el-submenu>
            </el-menu>
            <el-button style="width:200px;height:50px;margin-button:5px;" icon="el-icon-circle-plus-outline" @click="addFormVisible=true">新增</el-button>
            <!-- <div style="height:50px;background-color:white;">
                <el-input placeholder="请输入内容" v-model="ownerID" class="input-with-select" style="margin-top:5px">
                    <el-button slot="append" @click="filterData(1)">按商户</el-button>
                </el-input>
            </div> -->
        </el-aside>
        
        <el-container>
            <el-main>
                <el-table
                    :data="filteredData"
                    stripe
                    style="width: 100%">
                    <el-table-column
                    prop="goodsID"
                    label="商品ID"
                    width="90"
                    fixed
                    sortable
                    >
                    </el-table-column>
                    <el-table-column
                    prop="goodsName"
                    label="商品名"
                    width="120"
                    sortable
                    >
                    </el-table-column>
                    <el-table-column
                    prop="goodsOwner"
                    label="商户ID"
                    width="100"
                    sortable
                    >
                    </el-table-column>
                    <el-table-column
                    prop="goodsPic"
                    label="图片路径"
                    width="180"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="goodsPrice"
                    label="商品价格(￥)"
                    width="130"
                    sortable
                    >
                    </el-table-column>
                    <el-table-column
                    prop="goodsStatus"
                    label="商品状态"
                    width="100"
                    sortable
                    >
                    <template slot-scope="scope">
                        <el-tag :type="getStatus(scope.row.goodsStatus)[0]">{{getStatus(scope.row.goodsStatus)[1]}}</el-tag>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="goodsStock"
                    label="商品数目"
                    width="100"
                    sortable
                    >
                    </el-table-column>
                    <el-table-column
                    prop="goodsType"
                    label="商品类别"
                    width="100"
                    sortable
                    >
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    width="145"
                    >
                         <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>        
                </el-table>
                <el-dialog title="商品信息" :visible.sync="editFormVisible">
                    <el-form :model="form">
                        <el-form-item label="商品名" :label-width="formLabelWidth">
                            <el-input v-model="form.goodsName" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="商户ID" :label-width="formLabelWidth">
                            <el-input v-model="form.goodsOwner" autocomplete="off" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="图片路径" :label-width="formLabelWidth">
                            <el-input v-model="form.goodsPic" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="商品价格" :label-width="formLabelWidth">
                            <el-input v-model="form.goodsPrice" autocomplete="off" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品状态" :label-width="formLabelWidth">
                            <el-radio v-model="form.goodsStatus" :label="0">下架</el-radio>
                            <el-radio v-model="form.goodsStatus" :label="1">上架</el-radio>
                        </el-form-item>
                        <el-form-item label="商品数目" :label-width="formLabelWidth">
                            <el-input v-model="form.goodsStock" autocomplete="off" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品类别" :label-width="formLabelWidth">
                            <el-input v-model="form.goodsType" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="editFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="submitChange">确 定</el-button>
                    </div>
                </el-dialog>

                <el-dialog title="新增商品" :visible.sync="addFormVisible">
                    <el-form :model="addForm">
                        <el-form-item label="商品名" :label-width="formLabelWidth">
                            <el-input v-model="addForm.goodsName" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="商户ID" :label-width="formLabelWidth">
                            <el-input v-model="addForm.goodsOwner" autocomplete="off" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="图片路径" :label-width="formLabelWidth">
                            <el-input v-model="addForm.goodsPic" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="商品价格" :label-width="formLabelWidth">
                            <el-input v-model="addForm.goodsPrice" autocomplete="off" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品状态" :label-width="formLabelWidth">
                            <el-radio v-model="addForm.goodsStatus" :label="0">下架</el-radio>
                            <el-radio v-model="addForm.goodsStatus" :label="1">上架</el-radio>
                        </el-form-item>
                        <el-form-item label="商品数目" :label-width="formLabelWidth">
                            <el-input v-model="addForm.goodsStock" autocomplete="off" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品类别" :label-width="formLabelWidth">
                            <el-input v-model="addForm.goodsType" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="addFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="submitAdd">确 定</el-button>
                    </div>
                </el-dialog>
            </el-main>
        </el-container>
        <!-- <img src="http://127.0.0.1:3000/imgs/Logo.jpg" alt=""> -->
    </el-container>
</template>

<script>
export default {
        data() {
            return {
                tableData:null,
                ownerID:null,
                filterType:-1,
                filterName:null,
                editFormVisible:false,
                addFormVisible:false,
                form:{
                    goodsName:"",
                    goodsOwner:null,
                    goodsPrice:null,
                    goodsStatus:1,
                    goodsStock:null,
                    goodsType:"",
                    goodsPic:""
                },
                addForm:{
                    goodsName:"",
                    goodsOwner:null,
                    goodsPrice:null,
                    goodsStatus:1,
                    goodsStock:null,
                    goodsType:"",
                    goodsPic:""
                },
                fileList: [],
                formLabelWidth: '120px',
                files:null,
                fileName:null
            }
        },
        methods: {
            getStatus(status){
                if(status){
                    return ['success','上架']
                }else{
                    return ['info','下架']
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
                this.filterName=data
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
            submitChange(){
                let submitFormData=new FormData()
                submitFormData.append("gid",this.form.goodsID)
                submitFormData.append("gName",this.form.goodsName)
                submitFormData.append("gType",this.form.goodsType)
                submitFormData.append("gOwner",this.form.goodsOwner)
                submitFormData.append("gPrice",this.form.goodsPrice)
                submitFormData.append("gStock",this.form.goodsStock)
                submitFormData.append("gStatus",this.form.goodsStatus)
                submitFormData.append("gPic",this.form.goodsPic)
                this.$axios({
                    url: 'http://192.168.43.201:8081/updateGoods',
                    method: 'POST',
                    data:submitFormData
                }).then(value=>{
                    this.$axios({
                        url: 'http://192.168.43.201:8081/allGoods',
                        method: 'get'
                    }).then(value=>{
                        
                        // console.log(value)
                        let goodsArr=[]
                        for(let v in value.data.data){
                            goodsArr.push(value.data.data[v])
                        }
                        this.tableData=goodsArr

                        this.$message({
                            message: '修改成功',
                            type: 'success',
                            duration: 1500,
                        })
                        this.editFormVisible=false
                    })
                })
            },
            submitAdd(){
                let submitFormData=new FormData()
                // submitFormData.append("gid",this.addForm.goodsID)
                submitFormData.append("gName",this.addForm.goodsName)
                submitFormData.append("gType",this.addForm.goodsType)
                submitFormData.append("gOwner",this.addForm.goodsOwner)
                submitFormData.append("gPrice",this.addForm.goodsPrice)
                submitFormData.append("gStock",this.addForm.goodsStock)
                submitFormData.append("gStatus",this.addForm.goodsStatus)
                submitFormData.append("gPic",this.addForm.goodsPic)
                this.$axios({
                    url: 'http://192.168.43.201:8081/addGoods',
                    method: 'POST',
                    data:submitFormData
                }).then(value=>{
                    this.$axios({
                        url: 'http://192.168.43.201:8081/allGoods',
                        method: 'get'
                    }).then(value=>{
                        
                        // console.log(value)
                        let goodsArr=[]
                        for(let v in value.data.data){
                            goodsArr.push(value.data.data[v])
                        }
                        this.tableData=goodsArr

                        this.$message({
                            message: '修改成功',
                            type: 'success',
                            duration: 1500,
                        })
                        this.editFormVisible=false
                    })
                })
            },
        },
        computed:{
            TypeList(){
                let typelist=[]
                if(this.tableData==null){
                    return null;
                }
                for(let v of this.tableData){
                    let type=v.goodsType
                    if(typelist.indexOf(type)==-1){
                        typelist.push(type)
                    }
                }
                return typelist
            },
            filteredData(){
                if(this.filterType==-1){
                    return this.tableData
                }
                else if(this.filterType==0){
                    return this.tableData.filter((v)=>{
                        return v.goodsType==this.filterName
                    })
                }
                else if(this.filterType==1){
                    if(this.ownerID==""||this.ownerID==null){
                        return this.tableData
                    }
                    else{
                        return this.tableData.filter((v)=>{
                            // console.log(this.ownerID)
                        return v.goodsOwner==Number(this.ownerID)
                        })
                    }

                }
            }
        },
        mounted() {
            this.$axios({
                url: 'http://192.168.43.201:8081/allGoods',
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
