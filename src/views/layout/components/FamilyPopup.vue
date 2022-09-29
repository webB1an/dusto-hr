<template>
  <!-- 家庭关系 -->
  <van-popup v-model="visible" :safe-area-inset-bottom="true" position="bottom">
    <van-form @submit="submit">
      <van-field
        v-model="popupForm.title"
        :rules="rule.title"
        name="title"
        label="称谓"
        placeholder="请输入称谓"
      />

      <van-field
        v-model="popupForm.name"
        :rules="rule.name"
        name="name"
        label="姓名"
        placeholder="请输入姓名"
      />

      <van-field
        v-model="popupForm.age"
        :rules="rule.age"
        name="age"
        label="年龄"
        placeholder="请输入年龄"
      />

      <van-field
        v-model="popupForm.work"
        :rules="rule.work"
        name="work"
        label="工作单位"
        placeholder="请输入工作单位"
      />

      <van-field
        v-model="popupForm.job"
        :rules="rule.job"
        name="job"
        label="工作岗位"
        placeholder="请输入工作岗位"
      />

      <van-field
        v-model="popupForm.phone"
        :rules="rule.phone"
        name="phone"
        label="联系方式"
        placeholder="请输入联系方式"
      />

      <div style="display: flex; justify-content: space-between; margin: 16px;">
        <van-button v-if="popupType === type.ADD" round block type="info" native-type="submit">保存</van-button>
        <van-button v-if="popupType === type.EDITOR" round type="danger" native-type="button" style="width: 45%" @click="del">删除</van-button>
        <van-button v-if="popupType === type.EDITOR" round type="info" native-type="submit" style="width: 45%">保存</van-button>
      </div>
    </van-form>

  </van-popup>
</template>

<script>
export default {
  name: 'FamilyPopup',
  props: {
    popupVisible: {
      type: Boolean,
      default: false
    },
    popupType: {
      type: String,
      default: 'add'
    },
    popupRule: {
      type: Object,
      default: () => ({
        title: [{ required: true, message: '请输入称谓' }],
        name: [{ required: true, message: '请输入姓名' }],
        age: [{ validator: this.validateAge, message: '请输入正确年龄' }],
        work: [{ required: true, message: '请输入工作单位' }],
        job: [{ required: true, message: '请输入工作岗位' }],
        phone: [{ validator: this.validatePhone, message: '请输入正确联系方式' }]
      })
    },
    popupForm: {
      type: Object,
      default: () => ({
        title: '', // 称谓
        name: '', // 姓名
        age: '', // 年龄
        work: '', // 工作单位
        job: '', // 工作岗位
        phone: '' // 联系方式
      })
    }
  },
  data() {
    return {
      type: {
        ADD: 'add',
        EDITOR: 'editor'
      }
    }
  },
  computed: {
    visible: {
      get() {
        return this.popupVisible
      },
      set(val) {
        return this.$emit('update:popupVisible', val)
      }
    },
    form: {
      get() {
        return this.popupForm
      },
      set(val) {
        return this.$emit('update:popupForm', val)
      }
    },
    rule: {
      get() {
        return this.popupRule
      }
    }
  },
  methods: {
    del() {
      this.$emit('del')
    },
    // 弹窗 form 提交
    submit(values) {
      this.$emit('submit', this.popupForm)
    }
  }
}
</script>

<style>

</style>
