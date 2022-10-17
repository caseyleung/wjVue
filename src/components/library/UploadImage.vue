<template>
  <el-upload
      class="upload-demo"
      ref="uploadImage"
      action="http://localhost:8443/api/covers"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      multiple
      :limit="1"
      :on-exceed="handleExceed"
      :file-list="fileList"
      list-type="picture">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
</template>

<script>
export default {
  name: "UploadImage",
  data() {
    return {
      fileList: [],
      url: ''
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file) {
      return this.$confirm(`确定移除${file.name}?`)
    },
    handleSuccess (result) {
      this.url = result
      this.$emit('onUpload')
      this.$message.success('上传成功')
    },
    clear() {
      this.$refs.uploadImage.clearFiles()
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      console.log('---------filesize-------')
      console.log(file.size)
      const isLt500kb = file.size / 1024 < 500;

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!');
      }
      if (!isLt500kb) {
        this.$message.error('上传图片大小不能超过 500kb!');
      }
      return isJPG && isLt500kb;
    }
  }
}
</script>

<style scoped>

</style>