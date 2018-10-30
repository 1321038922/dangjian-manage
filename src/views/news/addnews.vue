<template>
   <div>
     <Title></Title>
       <el-card  >
           <div slot="header">
               添加新闻
           </div>
          <el-form ref="form" :model="formData" label-width="80px" class="form-userinfo" label-position="left">
            <el-form-item label="新闻标题">
                <el-input v-model="formData.title" ></el-input>
            </el-form-item>
            <el-form-item label="新闻头图" required>
                <ImgUpload v-model="formData.img"></ImgUpload>
            </el-form-item>
            <el-form-item label="作者" required>
                <el-select v-model="formData.author">
                    <el-option
                    v-for="(item , index) in users"
                    :label="item.nickname" 
                    :value="item._id" 
                    :key="index">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="新闻分类" required>
                <el-select v-model="formData.type">
                    <el-option
                    v-for="(item , index) in category"
                    :label="item.title" 
                    :value="item._id" 
                    :key="index">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="新闻内容" required>
                 <quill-editor v-model="formData.content"
                ref="myQuillEditor"
                @change="eidtChange"
                :options="editorOption">
                </quill-editor>
            </el-form-item>
         
            <el-form-item>
                <el-button v-if="isEdit" type="primary" @click="onSubmit">新建</el-button>
                <el-button v-else type="primary" @click="handleSave">保存</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>
       </el-card>
    </div>
</template>

<script>
import axios from "axios";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor, Quill } from "vue-quill-editor";
import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";

Quill.register("modules/ImageExtend", ImageExtend);
export default {
  components: { quillEditor },
  data() {
    return {
      formData: {
        title: "",
        content: "",
        contentText: "",
        img: "",
        author: "",
        type: ""
      },
      isEdit: true,
      category: [],
      token: "",
      users: [],
      editorOption: {
        modules: {
          ImageExtend: {
            loading: true,
            name: "file",
            action: "https://upload-z1.qiniup.com",
            response: res => {
              return res.url;
            },
            change: (xhr, formData) => {
              formData.append("token", this.token);
            }
          },
          toolbar: {
            container: container,
            handlers: {
              image: function() {
                QuillWatch.emit(this.quill.id);
              }
            }
          }
        }
      }
    };
  },
  methods: {
    getUser() {
      this.$axios.get("/admin/adminUser").then(res => {
        console.log(res);
        if (res.code == 200) {
          console.log(res);
          this.users = res.data;
        }
      });
    },
    handleSave(){
        this.$axios.patch(`/admin/news/${this.$route.query.id}`,this.formData).then(res => {
          if(res.code == 200) {
            this.$message.success(res.msg)
            this.$router.push({ name: "newslist" });
          }
        })
    },
    eidtChange({ quill, html, text }) {
      this.formData.contentText = text;
    },
    cancel() {
      this.formData = {};
    },
    getToken() {
      axios.get("http://mawenli.xyz:3000/getToken").then(res => {
        this.token = res.data.data;
      });
    },
    getcategory() {
      this.$axios.get("/admin/category").then(res => {
        this.category = res.data;
      });
    },
    onSubmit() {
      this.$axios.post("/admin/news", this.formData).then(res => {
        if (res.code == 200) {
          this.$message.success(res.msg);
          this.$router.push({ name: "newslist" });
        } else {
          this.$message.info(res.msg);
        }
      });
    },
    getnews() {
      this.$axios.get(`/admin/news/${this.$route.query.id}`).then(res => {
        if (res.code == 200) {
          this.formData = res.data
        } else {
        }
      });
    }
  },
  created() {
    if (this.$route.name == "newsDetail") {
      this.isEdit = false;
      this.getUser();
      this.getToken();
      this.getcategory();
      this.getnews()
    } else {
      this.isEdit = true
      this.getUser();
      this.getToken();
      this.getcategory();
    }
  },
  watch: {
    $route(to, from) {
      if (to.name == "newsDetail") {
        this.isEdit = false;
        this.getUser();
        this.getToken();
        this.getcategory();
        this.getnews()
      } else {
        this.isEdit = true
        this.getUser();
        this.getToken();
        this.getcategory();
      }
    }
  }
};
</script>

<style >
.ql-container {
  min-height: 200px;
}
</style>