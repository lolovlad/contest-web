<template>
  <div class="text__editor">
    <h1>{{$props.placeholder}}</h1>
    <quill-editor theme="snow"
                  toolbar="full"
                  :modules="modules"
                  @text-change="onChange"
                  v-model:content="content"
                  content-type="html"
                  ref="edit"
    />
  </div>
</template>

<script>
import {QuillEditor} from "@vueup/vue-quill";
import BlotFormatter from 'quill-blot-formatter';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
  name: "TextEditor",
  components: {QuillEditor},
  props: {
    placeholder: {
      type: String
    }
  },
  data(){
    return{
       modules: {
        name: 'blotFormatter',
        module: BlotFormatter,
        options: {/* options */}
      },
      content: ""
    }
  },
  methods: {
    val(content){
      this.$refs.edit.setContents(content)
    },
    onChange(){
      this.$emit('update:modelValue', this.$refs.edit.getContents())
    }
  }
}
</script>

<style scoped>
.text__editor > h1{
  margin-bottom: 20px;
  font-size: 30px;
}
</style>