<template lang="pug">
  div.form
    el-card.box-card(shadow="hover")
      div.clearfix(slot="header")
        span
          i.el-icon-date 添加产品
      el-form(
        :model="ruleForm",
        :rules="rules",
        ref="ruleForm",
        label-width="100px",
        class="product-add")
        el-form-item(label="商品名称", prop="name")
          el-input(v-model="ruleForm.name", autofocus, clearable)
        el-form-item(label="商品单价", prop="price")
          el-input(v-model.number="ruleForm.price", clearable)
        el-form-item(label="商品优惠价", prop="discountPrice")
          el-input(v-model="ruleForm.discountPrice", clearable)
        el-form-item(label="商品库存", prop="inventory")
          el-input(v-model.number="ruleForm.inventory", clearable)
        el-form-item(label="商品描述", prop="descripe")
          el-input(type="textarea", rows=3 v-model="ruleForm.descripe", clearable)
        el-form-item
          el-button(@click="resetForm('ruleForm')", size="small") 重置表单
          el-button(type="primary" @click="submitForm('ruleForm')", size="small") 立即添加
          el-button(type="primary" @click="submitPublish('ruleForm')", size="small") 立即发布
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
        descripe: ''
      },
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
          {type: 'number', message: '库存必须为数字'}
        ]
      }
    }
  },
  created () {
    console.log(this.$route.meta.title)
  },
  methods: {
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
<style scoped>
.product-add {
  width: 400px;
  padding: 30px;
}
</style>
