<template lang="pug">
  div.form
    el-card.box-card(shadow="hover")
      div.clearfix(slot="header")
        span
          i.el-icon-circle-plus 添加产品
      el-form(
        :model="ruleForm",
        :rules="rules",
        ref="ruleForm",
        label-width="100px",
        class="product-add")
        el-form-item(label="商品名称", prop="name")
          el-input(v-model="ruleForm.name", autofocus, size="small", clearable)
        el-form-item(label="商品单价", prop="price")
          el-input(v-model.number="ruleForm.price", size="small", clearable)
        el-form-item(label="商品优惠价", prop="discountPrice")
          el-input(v-model="ruleForm.discountPrice", size="small", clearable)
        el-form-item(label="商品库存", prop="inventory")
          el-input(v-model.number="ruleForm.inventory", size="small", clearable)
        el-form-item(label="商品描述", prop="descripe")
          el-input(type="textarea", rows=4 v-model="ruleForm.descripe", clearable)
        el-form-item(label="商品图片")
          el-upload(
            action="https://jsonplaceholder.typicode.com/posts/",
            list-type="picture-card",
            :on-remove="removeImg")
            i(class="el-icon-plus")
        el-form-item(label="商品特点")
          el-checkbox-group(v-model="ruleForm.checkedData")
            el-checkbox(v-for="(item, index) in checkBoxList" :label="item" :key="index") {{item}}
        el-form-item(label="发布商品")
          el-radio(v-model="ruleForm.isPuublish", label="1") 发布
          el-radio(v-model="ruleForm.isPuublish", label="2") 不发布
        el-form-item
          el-button(@click="resetForm('ruleForm')", size="small") 重置表单
          el-button(type="primary" @click="submitForm('ruleForm')", size="small") 立即添加
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        name: '',
        price: null,
        discountPrice: null,
        inventory: null,
        descripe: '',
        isPuublish: '',
        checkedData: [],
        previewImg: ''
      },
      checkBoxList: [
        '绿色',
        '无机',
        '天然'
      ],
      rules: {
        name: [
          { required: true, message: '请输入产品名称', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ],
        price: [
          {required: true, message: '请输入单价', trigger: 'blur'},
          {type: 'number', message: '价格必须为数字'}
        ],
        inventory: [
          {required: true, message: '请输入库存', trigger: 'blur'},
          {type: 'number', message: '库存必须为数字', trigger: 'blur'}
        ]
      }
    }
  },
  created () {
    console.log(this.$route.meta.title)
  },
  methods: {
    removeImg () {
      console.log('removeImg')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitPublish (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  computed: {
    onActive () {
      return this.$route
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.box-card {
  .el-icon-circle-plus {
    &:before {
      margin-right: 5px;
    }
  }
}
.product-add {
  width: 500px;
  padding: 10px 30px 30px;
}
</style>
