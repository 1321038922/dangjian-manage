<template>
    <div>
        <label class="upload-wrap">
            <i class="el-icon-plus" v-if="!imgurl"></i>
            <img :src="imgurl" v-else>
            <input type="file" style="display: none" name="" @change="upload">
        </label>
    </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    value: {
      type: String
    }
  },
  data() {
    return {
      token: "",
      imgurl: this.value
    };
  },
  methods: {
    getToken() {
      axios.get("http://mawenli.xyz:3000/getToken").then(res => {
        this.token = res.data.data;
      });
    },
    upload() {
      let file = event.target.files[0];
      let formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("token", this.token);

      axios
        .post("https://upload-z1.qiniup.com", formData, {
          handers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          this.imgurl = res.data.url;
          console.log(res);
          this.$emit("success", res.data.url);
          this.$emit("input", res.data.url);
          this.$emit("change", res.data.url);
        });
    }
  },
  watch: {
    value(val) {
      this.imgurl = val;
    }
  },
  created() {
    this.getToken();
  }
};
</script>

<style scoped>
.upload-wrap {
  position: relative;
  display: block;
  width: 100px;
  height: 100px;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  cursor: pointer;
}
.el-icon-plus {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

img {
  display: block;
  width: 100px;
  height: 100px;
}
</style>