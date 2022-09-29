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
        label="入学时间"
        placeholder="请选择入学时间"
        @click="timePickerVisible = true;timePickerType = 'start';timePickerValue = form.startTime"
      />
      <van-field
        :value="endTime"
        :rules="rule.endTime"
        readonly
        clickable
        name="endTime"
        label="毕业时间"
        placeholder="请选择毕业时间"
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

      <van-field :rules="rule.education" name="education" label="学历">
        <template #input>
          <van-radio-group v-model="form.education" direction="vertical">
            <van-radio class="mb10" name="1">博士</van-radio>
            <van-radio class="mb10" name="2">研究生</van-radio>
            <van-radio class="mb10" name="3">大学</van-radio>
            <van-radio class="mb10" name="4">中专</van-radio>
            <van-radio class="mb10" name="5">小学</van-radio>
            <van-radio class="mb10" name="6">无</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
        v-model="form.school"
        :rules="rule.school"
        name="school"
        label="学校名称"
        placeholder="请输入学校名称"
      />

      <van-field
        v-model="form.major"
        :rules="rule.major"
        name="major"
        label="专业"
        placeholder="请输入专业"
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
  name: 'EducationPopup',
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
        startTime: [{ required: true, message: '请选择入学时间' }],
        endTime: [{ required: true, message: '请选择毕业时间' }],
        education: [{ required: true, message: '请选择学历' }],
        school: [{ required: true, message: '请输入学校名称' }],
        major: [{ required: true, message: '请输入专业' }]
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
        education: '', // 学历
        school: '', // 学校名称
        major: '' // 专业
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
