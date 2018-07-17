<template>
    <el-card>
        <el-row>
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                label="标题"
                align="left"
                >
                <template slot-scope="scope">
                    <template v-if="scope.row.editable">
                        <el-input placeholder="请输入标题"></el-input>
                    </template>
                    <template v-else>
                         <p>{{ scope.row.title }}</p>
                    </template>
                </template>
                </el-table-column>
                <el-table-column
                label="排序"
                align="left"
                >
                 <template slot-scope="scope">
                    <template v-if="scope.row.editable">
                        <el-input placeholder="请输入序号"></el-input>
                    </template>
                    <template v-else>
                         <p>{{ scope.row.title }}</p>
                    </template>
                  </template>
                </el-table-column>
                <el-table-column
                label="修改时间"
                align="left"
                >
                 <template slot-scope="scope">
                    <p>{{ scope.row.date }}</p>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="left">
                <template slot-scope="scope">
                    <template v-if="scope.row.editable">
                        <template v-if="scope.row.isNew">
                            <el-button
                                size="mini"
                                @click="addRow(scope.$index, scope.row)">
                                添加
                            </el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">
                                删除
                            </el-button>
                        </template>
                        <template v-else>
                            <el-button
                                size="mini"
                                @click="saveRow(scope.$index, scope.row)">
                                保存
                            </el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">
                                取消
                            </el-button>
                        </template>
                    </template>
                    <template v-else>
                        <el-button
                            size="mini"
                            @click="editRow(scope.$index, scope.row)">
                            编辑
                        </el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">
                            删除
                        </el-button>
                    </template>
                </template>
                </el-table-column>
            </el-table>
             <el-button size="medium" class="add-btn" @click="addNew">新增分类</el-button>
        </el-row>
    </el-card>
</template>
<script>
export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          title: '王小虎',
          sort: '1'
        }, {
          date: '2016-05-04',
          title: '王小虎',
          sort: '2'
        }, {
          date: '2016-05-01',
          title: '王小虎',
          sort: '3'
        }, {
          date: '2016-05-03',
          title: '王小虎',
          sort: '4'
        }],
      }
    },
    methods: {
      addNew() {
        const newData = {
            date: this.moment().format('YYYY-MM-DD'),
            title: '',
            sort: '',
            editable: true,
            isNew: true
        }
        this.tableData = this.tableData.concat(newData)
      },
      addRow(i, row) {
         delete row.isNew
         row.editable = false
         this.tableData.concat(row)
      },
      editRow(i, row) {
        this.tableData = this.tableData.map((item, index) => {
            if(index === i) {
                item.editable = true
            }
            return item
        })
      },
      saveRow(i, row) {
        this.tableData = this.tableData.map((item, index) => {
            if(index === i) {
                item = row
                item.editable = false
            }
            return item
        })
      },
      handleDelete(i, row) {
        this.$confirm('确定删除此行?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData = this.tableData.filter((item, index) => {
            return index !== i
          })
        })
      }
    }
};
</script>
<style lang="less" scoped>
    .el-row {
        margin-bottom: 10px
    }
    .add-btn {
        margin-top: 5px;
        width: 100%;
        border: 1px dotted #ccc
    }
</style>

