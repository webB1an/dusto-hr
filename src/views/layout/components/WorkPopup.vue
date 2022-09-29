<template>
  <!-- 家庭关系 -->
  <van-popup v-model="visible" :safe-area-inset-bottom="true" position="bottom" @open="handleOpenpopup" @close="handleClosePopup">
    <van-form @submit="submit">
      <van-field
        :value="startTime"
        :rules="rule.startTime"
        readonly
        clickable
        name="startTime"
        label="开始时间"
        placeholder="请选择开始时间"
        @click="timePickerVisible = true;timePickerType = 'start';timePickerValue = form.startTime"
      />
      <van-field
        :value="endTime"
        :rules="rule.endTime"
        readonly
        clickable
        name="endTime"
        label="结束时间"
        placeholder="请选择结束时间"
        @click="timePickerVisible = true;timePickerType = 'end';timePickerValue = form.endTime"
      />
      <van-popup v-model="timePickerVisible" position="bottom">
        <van-datetime-picker
          v-model="timePickerValue"
          :min-date="minDate"
          :max-date="maxDate"
          type="year-month"
          title="选择年月"
          @confirm="handleConfirmTime"
          @cancel="timePickerVisible = false"
        />
      </van-popup>

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
        v-model="popupForm.money"
        :rules="rule.money"
        name="money"
        label="待遇"
        placeholder="请输入待遇"
      />

      <van-field
        v-model="popupForm.hrName"
        :rules="rule.hrName"
        name="hrName"
        label="人事姓名"
        placeholder="请输入人事姓名"
      />

      <van-field
        v-model="popupForm.hrPhone"
        :rules="rule.hrPhone"
        name="hrPhone"
        label="人事电话"
        placeholder="请输入人事电话"
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
  name: 'WorkPopup',
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
        startTime: [{ required: true, message: '请选择开始时间' }],
        endTime: [{ required: true, message: '请选择结束时间' }],
        work: [{ required: true, message: '请输入工作单位' }],
        job: [{ required: true, message: '请输入工作岗位' }],
        money: [{ required: true, message: '请输入待遇' }],
        hrName: [{ required: true, message: '请输入公司人事姓名' }],
        hrPhone: [{ required: true, message: '请输入人事电话' }]

      })
    },
    popupForm: {
      type: Object,
      default: () => ({
        startTime: new Date(), // 入学时间
        startTimeYear: '',
        startTimeMonth: '',
        endTime: new Date(), // 毕业时间
        endTimeYear: '',
        endTimeMonth: '',
        work: '', // 工作单位
        job: '', // 工作岗位
        money: '', // 待遇
        hrName: '', // hr 名字
        hrPhone: '' // hr 电话
      })
    }
  },
  data() {
    return {
      type: {
        ADD: 'add',
        EDITOR: 'editor'
      },
      timePickerValue: new Date(),
      minDate: new Date(1949, 0, 1),
      maxDate: new Date(),
      timePickerVisible: false,
      timePickerType: 'start',
      startTime: '',
      endTime: ''
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
  watch: {

  },
  created() {
    console.log(this.form)
  },
  methods: {
    handleConfirmTime(time) {
      const date = new Date(time)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const _time = `${year} 年 ${month} 月`
      const type = this.timePickerType

      this[`${type}Time`] = _time
      this.form[`${type}Time`] = date
      this.form[`${type}TimeYear`] = year
      this.form[`${type}TimeMonth`] = month

      this.timePickerVisible = false
    },
    handleOpenpopup() {
      if (this.form.startTimeYear) {
        this.startTime = `${this.form.startTimeYear} 年 ${this.form.startTimeMonth} 月`
      }
      if (this.form.endTimeYear) {
        this.endTime = `${this.form.endTimeYear} 年 ${this.form.endTimeMonth} 月`
      }
    },
    handleClosePopup() {
      this.startTime = ''
      this.endTime = ''
    },
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
