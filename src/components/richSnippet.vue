<template>
    <div>
         <quill-editor v-model="formData.content"
        ref="myQuillEditor"
        @change="eidtChange($event)"
        :options="editorOption"
        class="rich">
        </quill-editor>
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
  props: {
    value: Object
  },
  data() {
    return {
      formData: {
        content: "",
        contentText: ""
      },
      token: "",
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
    eidtChange({ quill, html, text }) {
      this.formData.contentText = text;
      this.formData.content = html;
      this.$emit("input", this.formData);
    },
    getToken() {
      axios.get("http://mawenli.xyz:3000/getToken").then(res => {
        this.token = res.data.data;
      });
    },
  },
  created() {
    this.getToken();
  },
  watch: {
    value(val) {
      this.formData = val;
    }
  }
};
</script>

<style scoped>
.rich {
  width: 100%;
  height: 400px;
}
</style>