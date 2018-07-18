<template>
    <div>
        <el-card>
            <div slot="header">
                <h3 class="card-title">轮播图</h3>
            </div>
            <el-row :gutter="20">
                <el-col :span="6" v-for="item in banner" v-dragging="{ item: item, list: banner, group: 'banner', key: item.sort, otherData: item }" :key="item.sort">
                <el-card :body-style="{ padding: '0px' }" style="height: 280px">
                    <img :src="item.src" class="image" style="height:200px">
                    <el-upload
                        class="upload-demo"
                        ref="upload"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :auto-upload="false">
                        <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success">上传到服务器</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png格式图片</div>
                    </el-upload>
                </el-card>
                </el-col>
            </el-row>
        </el-card>
        <el-card>
            <div slot="header">
                <h3 class="card-title">公司介绍</h3>
            </div>
            <quill-editor
                ref="myQuillEditor"
                :options="editorOption"
            >
            </quill-editor>
        </el-card>
        <el-card>
            <div slot="header">
                <h3 class="card-title">技术创新</h3>
            </div>
            <quill-editor
                ref="myQuillEditor"
                :options="editorOption"
            >
            </quill-editor>
        </el-card>
        <el-card>
            <div slot="header">
                <h3 class="card-title">产品介绍与导航</h3>
            </div>
            <quill-editor
                ref="myQuillEditor"
                :options="editorOption"
            >
            </quill-editor>
        </el-card>
        <el-card>
            <div slot="header">
                <h3 class="card-title">合作伙伴</h3>
            </div>
            <quill-editor
                ref="myQuillEditor"
                :options="editorOption"
            >
            </quill-editor>
        </el-card>
   </div>
</template>
<script>
export default {
  data() {
    return {
        banner: [{
            src: require('../../assets/1.svg'),
            sort: 1
        }, {
            src: require('../../assets/2.svg'),
            sort: 2
        }, {
            src: require('../../assets/3.svg'),
            sort: 3
        }, {
            src: require('../../assets/4.svg'),
            sort: 4
        }],
        editorOption: {
          // some quill options
        }
    };
  },
  mounted() {
    this.$dragging.$on("dragged", ({ value }) => {
      console.log(value.item);
      console.log(value.list);
      console.log(value.otherData);
    });
  }
};
</script>
<style lang="less" scoped>
    .el-card {
        margin-bottom: 20px;
        .card-title {
            text-align: left
        }
    }
</style>
