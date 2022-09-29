<template>
  <div class="todo-container">
    <van-form @submit="handleSubmit">
      <van-field
        v-model="form.username"
        :rules="rules.username"
        name="username"
        label="姓名"
        placeholder="请输入姓名"
      />

      <van-field
        :value="birthday"
        :rules="rules.birthday"
        readonly
        clickable
        name="birthday"
        label="出生日期"
        placeholder="请选择出身日期"
        @click="birthdayPickerVisible = true"
      />
      <van-popup v-model="birthdayPickerVisible" position="bottom">
        <van-datetime-picker
          :min-date="birthdayMinDate"
          :max-date="birthdayMaxDate"
          type="date"
          title="选择年月日"
          @confirm="handleConfirmBirthDay"
          @cancel="birthdayPickerVisible = false"
        />
      </van-popup>

      <van-field :rules="rules.gender" name="gender" label="性别">
        <template #input>
          <van-radio-group v-model="form.gender" direction="horizontal">
            <van-radio name="1">男</van-radio>
            <van-radio name="2">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
        v-model="form.minority"
        :rules="rules.minority"
        name="minority"
        label="民族"
        placeholder="请输入民族"
      />

      <van-field
        v-model="form.height"
        :rules="rules.height"
        name="height"
        label="身高"
        placeholder="请输入身高"
      />

      <van-field
        v-model="form.from"
        :rules="rules.from"
        name="from"
        label="籍贯"
        placeholder="请输入籍贯"
      />

      <van-field :rules="rules.fromType" name="fromType" label="户口类型">
        <template #input>
          <van-radio-group v-model="form.fromType" direction="vertical">
            <van-radio class="mb10" name="1">本省农村</van-radio>
            <van-radio class="mb10" name="2">本省城镇</van-radio>
            <van-radio class="mb10" name="3">非本省农村</van-radio>
            <van-radio class="mb10" name="4">非本省城镇</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
        v-model="form.phone"
        :rules="rules.phone"
        name="phone"
        label="手机号码"
        placeholder="请输入手机号码"
      />

      <van-field :rules="rules.marriage" name="marriage" label="婚姻状况">
        <template #input>
          <van-radio-group v-model="form.marriage" direction="horizontal">
            <van-radio name="1">已婚</van-radio>
            <van-radio name="2">未婚</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field :rules="rules.politic" name="politic" label="政治面貌">
        <template #input>
          <van-radio-group v-model="form.politic" direction="vertical">
            <van-radio class="mb10" name="1">党员</van-radio>
            <van-radio class="mb10" name="2">预备党员</van-radio>
            <van-radio class="mb10" name="3">群众</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
        v-model="form.address"
        :rules="rules.address"
        name="address"
        label="常住地址"
        placeholder="请输入常住地址"
      />

      <van-field
        v-model="form.contact"
        :rules="rules.contact"
        name="contact"
        label="紧急联系人"
        placeholder="请输入紧急联系人"
      />

      <van-field
        v-model="form.contactRelation"
        :rules="rules.contactRelation"
        name="contactRelation"
        label="紧急联系人关系"
        placeholder="请输入紧急联系人关系"
      />

      <van-field
        v-model="form.contactPhone"
        :rules="rules.contactPhone"
        name="contactPhone"
        label="紧急联系人手机号"
        placeholder="请输入紧急联系人手机号"
      />

      <van-field :rules="rules.idCardType" name="idCardType" label="证件类型">
        <template #input>
          <van-radio-group v-model="form.idCardType" direction="horizontal">
            <van-radio name="1">身份证</van-radio>
            <van-radio name="2">护照</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
        v-model="form.idCardNumber"
        :rules="rules.idCardNumber"
        name="idCardNumber"
        label="证件号码"
        placeholder="请输入证件号码"
      />

      <van-field
        v-model="form.idCardFrom"
        :rules="rules.idCardFrom"
        name="idCardFrom"
        label="发证机关"
        placeholder="请输入发证机关"
      />

      <van-field
        v-model="form.idCardTimeStart"
        :rules="rules.idCardTimeStart"
        name="idCardTimeStart"
        label="有效日期开始"
        placeholder="请输入有效日期开始"
      />

      <van-field
        v-model="form.idCardTimeEnd"
        :rules="rules.idCardTimeEnd"
        name="idCardTimeEnd"
        label="有效日期结束"
        placeholder="请输入有效日期结束"
      />

      <van-field :rules="rules.idCardFrontPic" name="idCardFrontPic" label="证件照-正面">
        <template #input>
          <van-uploader :after-read="handleIdCardFrontPicUpload" v-model="idCardFrontPic" :max-count="1" />
        </template>
      </van-field>

      <van-field :rules="rules.idCardbackPic" name="idCardTimeEnd" label="证件照-反面">
        <template #input>
          <van-uploader v-model="idCardbackPic" :max-count="1" />
        </template>
      </van-field>

      <van-field :rules="rules.peopleCardPic" name="peopleCardPic" label="单寸证件照">
        <template #input>
          <van-uploader v-model="peopleCardPic" :max-count="1" />
        </template>
      </van-field>

      <van-field
        v-model="form.bankCardNumber"
        :rules="rules.bankCardNumber"
        name="bankCardNumber"
        label="银行卡号"
        placeholder="请输入银行卡号"
      />

      <van-field
        v-model="form.bankCardFrom"
        :rules="rules.bankCardFrom"
        name="bankCardFrom"
        label="银行卡开户行"
        placeholder="请输入银行卡开户行"
      />

      <van-field :rules="rules.bankCardPic" name="bankCardPic" label="银行卡">
        <template #input>
          <van-uploader v-model="bankCardPic" :max-count="1" />
        </template>
      </van-field>

      <van-field :rules="rules.diploma" name="diploma" label="毕业证">
        <template #input>
          <van-uploader v-model="diploma" :max-count="1" />
        </template>
      </van-field>

      <van-field :rules="rules.degree" name="degree" label="学位证">
        <template #input>
          <van-uploader v-model="degree" :max-count="1" />
        </template>
      </van-field>

      <div class="multi van-cell">
        <div class="multi-title van-field__label">家庭主要成员</div>
        <van-icon name="add" @click="handleOpenfamilyPopup" />
      </div>
      <van-cell-group v-for="(family, index) in form.family" :key="family.phone" :border="false" class="multi-list">
        <van-cell :value="family.name" :title="family.title" is-link @click="handleShowFamilyPopup(index)" />
      </van-cell-group>

      <div class="multi van-cell">
        <div class="multi-title van-field__label">教育经历</div>
        <van-icon name="add" @click="handleOpenEducationPopup" />
      </div>
      <van-cell-group v-for="(education, index) in form.education" :key="education.phone" :border="false" class="multi-list">
        <van-cell :value="education.school" :title="education.education" is-link @click="handleShowEducationPopup(index)" />
      </van-cell-group>

      <div class="multi van-cell">
        <div class="multi-title van-field__label">工作经历</div>
        <van-icon name="add" @click="handleOpenWorkPopup" />
      </div>
      <van-cell-group v-for="(work, index) in form.work" :key="work.phone" :border="false" class="multi-list">
        <van-cell :value="work.job" :title="work.work" is-link @click="handleShowWorkPopup(index)" />
      </van-cell-group>

      <van-field :rules="rules.offerFrom" name="offerFrom" label="应聘渠道">
        <template #input>
          <van-radio-group v-model="form.offerFrom" direction="vertical">
            <van-radio class="mb10" name="1">BOSS</van-radio>
            <van-radio class="mb10" name="2">智联</van-radio>
            <van-radio class="mb10" name="3">前程</van-radio>
            <van-radio class="mb10" name="4">其他</van-radio>
            <van-radio class="mb10" name="5">内部介绍</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
        v-if="form.offerFrom == 4"
        v-model="form.offerFromDetail"
        :rules="rules.offerFromDetail"
        name="offerFromDetail"
        label="渠道"
        placeholder="请输入渠道"
      />

      <van-field
        v-if="form.offerFrom == 5"
        v-model="form.introducer"
        :rules="rules.introducer"
        name="introducer"
        label="介绍人"
        placeholder="请输入介绍人"
      />

      <!-- hasRelation -->
      <van-field name="hasRelation" label="是否有亲属在公司">
        <template #input>
          <van-switch v-model="form.hasRelation" size="20" />
        </template>
      </van-field>

      <div v-if="form.hasRelation" class="multi-list">
        <van-field
          v-model="form.relationName"
          :rules="rules.relationName"
          name="relationName"
          label="姓名"
          placeholder="请输入姓名"
        />
        <van-field
          v-model="form.relation"
          :rules="rules.relation"
          name="relation"
          label="与本人关系"
          placeholder="请输入与本人关系"
        />
        <van-field
          v-model="form.relationFrom"
          :rules="rules.relationFrom"
          name="relationFrom"
          label="所在部门"
          placeholder="请输入所在部门"
        />
        <van-field
          v-model="form.relationJob"
          :rules="rules.relationJob"
          name="relationJob"
          label="岗位"
          placeholder="请输入岗位"
        />
      </div>

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>

    <!-- 家庭关系 -->
    <family-popup
      :popup-form.sync="familyForm"
      :popup-visible.sync="familyPopupVisible"
      :popup-type="familyPopupType"
      @del="handleDelFamilyItem"
      @submit="hanleFamilySubmit" />

    <!-- 教育经历 -->
    <education-popup
      :popup-form.sync="educationForm"
      :popup-visible.sync="educationPopupVisible"
      :popup-type="educationPopupType"
      @del="handleDelEducationItem"
      @submit="hanleEducationSubmit" />

    <!-- 工作经历 -->
    <work-popup
      :popup-form.sync="workForm"
      :popup-visible.sync="workPopupVisible"
      :popup-type="workPopupType"
      @del="handleDelWorkItem"
      @submit="hanleWorkSubmit" />
  </div>
</template>

<script>
import _ from 'lodash'
import FamilyPopup from './components/FamilyPopup.vue'
import EducationPopup from './components/EducationPopup.vue'
import WorkPopup from './components/WorkPopup.vue'
import { idCardOCR } from '@/utils/ocr.js'
export default {
  name: 'Todo',
  components: { FamilyPopup, EducationPopup, WorkPopup },
  data() {
    return {
      birthday: '',
      birthdayMinDate: new Date(1949, 0, 1),
      birthdayMaxDate: new Date(2099, 11, 30),
      birthdayPickerVisible: false,

      idCardFrontPic: [{ url: 'https://img01.yzcdn.cn/vant/leaf.jpg' }],
      idCardbackPic: [{ url: 'https://img01.yzcdn.cn/vant/leaf.jpg' }],

      peopleCardPic: [{ url: 'https://img01.yzcdn.cn/vant/leaf.jpg' }],

      bankCardPic: [{ url: 'https://img01.yzcdn.cn/vant/leaf.jpg' }],

      diploma: [{ url: 'https://img01.yzcdn.cn/vant/leaf.jpg' }],
      degree: [{ url: 'https://img01.yzcdn.cn/vant/leaf.jpg' }],
      // -----------------------------------
      familyPopupVisible: false,
      familyPopupType: 'add', // 家庭关系弹窗方式 add/editor
      familySelectedIndex: null, // 选中的家庭关系，用于删除
      familyForm: {
        title: '', // 称谓
        name: '', // 姓名
        age: '', // 年龄
        work: '', // 工作单位
        job: '', // 工作岗位
        phone: '' // 联系方式
      },
      // -----------------------------------
      educationPopupVisible: false,
      educationPopupType: 'add', // 家庭关系弹窗方式 add/editor
      educationSelectedIndex: null, // 选中的家庭关系，用于删除
      educationForm: {
        startTime: new Date(), // 入学时间
        startTimeYear: '',
        startTimeMonth: '',
        endTime: new Date(), // 毕业时间
        endTimeYear: '',
        endTimeMonth: '',
        education: '', // 学历
        school: '', // 学校名称
        major: '' // 专业
      },
      // -----------------------------------
      workPopupVisible: false,
      workPopupType: 'add', // 家庭关系弹窗方式 add/editor
      workSelectedIndex: null, // 选中的家庭关系，用于删除
      workForm: {
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
      },
      // -----------------------------------
      form: {
        username: '',
        birthYear: '',
        birthMonth: '',
        birthDate: '',
        gender: '',
        minority: '',
        height: '',
        from: '',
        fromType: '',
        phone: '',
        marriage: '',
        politic: '',
        address: '',
        contact: '',
        contactRelation: '',
        contactPhone: '',
        idCardType: '',
        idCardNumber: '',
        idCardFrom: '', // 发证机关
        idCardTimeStart: '',
        idCardTimeEnd: '',
        idCardFrontPic: 'https://img01.yzcdn.cn/vant/leaf.jpg',
        idCardBackPic: 'https://img01.yzcdn.cn/vant/leaf.jpg',
        peopleCardPic: '',
        bankCardNumber: '',
        bankCardFrom: '',
        bankCardPic: '',
        diploma: '',
        degree: '',
        family: [],
        education: [],
        work: [],
        offerFrom: '', // 应聘渠道
        offerFromDetail: '',
        introducer: '', // 介绍人
        hasRelation: '', // 是否有亲属在公司
        relationName: '',
        relation: '',
        relationFrom: '',
        relationJob: ''
      },

      rules: {
        username: [{ required: true, message: '请输入姓名' }],
        birthday: [{ required: true, message: '请选择生日期' }],
        gender: [{ required: true, message: '请选择性别' }],
        minority: [{ required: true, message: '请输入名族' }],
        height: [{ required: true, message: '请输入身高' }],
        from: [{ required: true, message: '请输入籍贯' }],
        fromType: [{ required: true, message: '请选择户籍类型' }],
        phone: [{ validator: this.validatePhone, message: '请输入手机号' }],
        marriage: [{ required: true, message: '请选择婚姻状况' }],
        politic: [{ required: true, message: '请选择政治面貌' }],
        address: [{ required: true, message: '请输入常住地址' }],
        contact: [{ required: true, message: '请输入紧急联系人' }],
        contactRelation: [{ required: true, message: '请输入紧急联系人关系' }],
        contactPhone: [{ validator: this.validatePhone, message: '请输入紧急联系人手机号' }],
        idCardType: [{ required: true, message: '请选择证件类型' }],
        idCardNumber: [{ required: true, message: '请输入证件号码' }],
        idCardFrom: [{ required: true, message: '请输入发证机关' }],
        idCardTimeStart: [{ required: true, message: '请选择证件开始有效期' }],
        idCardTimeEnd: [{ required: true, message: '请选择证件结束有效期' }],
        idCardFrontPic: [{ required: true, message: '请上传证件照正面' }],
        idCardbackPic: [{ required: true, message: '请上传证件照正面' }],
        peopleCardPic: [{ required: true, message: '请上传单寸证件照' }],
        bankCardNumber: [{ required: true, message: '请输入银行卡号' }],
        bankCardFrom: [{ required: true, message: '请输入银行卡开户行' }],
        diploma: [{ required: true, message: '请上传毕业证' }],
        degree: [{ required: true, message: '请上传学位证' }],
        family: [{ validator: this.validateFamily, message: '请填写家庭关系' }],
        offerFrom: [{ required: true, message: '请选择应聘渠道' }],
        offerFromDetail: [{ required: true, message: '请输入应聘渠道' }],
        introducer: [{ required: true, message: '请输入介绍人' }],
        relationName: [{ required: true, message: '请输入关系人姓名' }],
        relation: [{ required: true, message: '请输入关系' }],
        relationFrom: [{ required: true, message: '请输入部门' }],
        relationJob: [{ required: true, message: '请输入岗位' }]
      }

    }
  },
  async created() {
    // await idCardOCR()
  },
  methods: {
    // 生日格式化
    handleConfirmBirthDay(time) {
      const date = new Date(time)

      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()

      this.birthday = `${year} 年 ${month} 月 ${day} 号`

      this.form.birthYear = year
      this.form.birthMonth = month
      this.form.birthDate = day

      this.birthdayPickerVisible = false
    },
    // 验证手机号
    validatePhone(val) {
      return /1\d{10}/.test(val)
    },
    // 验证年龄
    validateAge(val) {
      return /^((1[0-5])|[1-9])?\d$/.test(val)
    },
    validateFamily() {
      if (this.form.family.length === 0) {
        return false
      }
      return true
    },

    async handleIdCardFrontPicUpload(file) {
      console.log('---------------file---------------', file)
      console.log(this.form)
      await idCardOCR(file.file)
    },

    // -----------------------------------

    // 新建家庭关系
    handleOpenfamilyPopup() {
      this.familyForm = {
        title: '', // 称谓
        name: '', // 姓名
        age: '', // 年龄
        work: '', // 工作单位
        job: '', // 工作岗位
        phone: '' // 联系方式
      }
      this.familyPopupType = 'add'
      this.familyPopupVisible = true
    },
    // 点击家庭关系
    handleShowFamilyPopup(index) {
      console.log('index', index)
      this.familyForm = _.cloneDeep(this.form.family[index])
      this.familySelectedIndex = index
      this.familyPopupType = 'editor'
      this.familyPopupVisible = true
    },
    // 删除单条家庭关系
    handleDelFamilyItem() {
      this.form.family.splice(this.familySelectedIndex, 1)
      this.familyPopupVisible = false
    },
    // 家庭关系录入弹窗 form 提交
    hanleFamilySubmit(values) {
      const _type = this.familyPopupType
      const _family = this.form.family
      const _index = this.familySelectedIndex
      const _familyForm = _.cloneDeep(this.familyForm)

      if (_type === 'add') {
        if (_family.some(item => item.name === _familyForm.name)) return this.$toast.fail('存在重复内容')
        this.form.family.push(_familyForm)
      } else {
        if (_family.some((item, index) => item.name === _familyForm.name && index !== _index)) return this.$toast.fail('存在重复内容')
        this.form.family.splice(_index, 1, _familyForm)
      }

      this.familyPopupVisible = false
    },
    // -----------------------------------
    // 新建教育经历
    handleOpenEducationPopup() {
      this.educationForm = {
        startTime: new Date(), // 入学时间
        startTimeYear: '',
        startTimeMonth: '',
        endTime: new Date(), // 毕业时间
        endTimeYear: '',
        endTimeMonth: '',
        education: '', // 学历
        school: '', // 学校名称
        major: '' // 专业
      }
      this.educationPopupType = 'add'
      this.educationPopupVisible = true
    },
    // 点击教育经历
    handleShowEducationPopup(index) {
      console.log('index', index)
      this.educationForm = _.cloneDeep(this.form.education[index])
      this.educationSelectedIndex = index
      this.educationPopupType = 'editor'
      this.educationPopupVisible = true
    },
    // 删除单条教育经历
    handleDelEducationItem() {
      this.form.education.splice(this.educationSelectedIndex, 1)
      this.educationPopupVisible = false
    },
    // 教育经历录入弹窗 form 提交
    hanleEducationSubmit(values) {
      const _type = this.educationPopupType
      const _education = this.form.education
      const _index = this.educationSelectedIndex
      const _educationForm = _.cloneDeep(this.educationForm)

      if (_type === 'add') {
        if (_education.some(item => item.education === _educationForm.education)) return this.$toast.fail('存在重复内容')
        this.form.education.push(_educationForm)
      } else {
        if (_education.some((item, index) => item.education === _educationForm.education && index !== _index)) return this.$toast.fail('存在重复内容')
        this.form.education.splice(_index, 1, _educationForm)
      }

      this.educationPopupVisible = false
    },

    // -----------------------------------

    // 新建工作经历
    handleOpenWorkPopup() {
      this.workForm = {
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
      }
      this.workPopupType = 'add'
      this.workPopupVisible = true
    },
    // 点击工作经历
    handleShowWorkPopup(index) {
      console.log('index', index)
      this.workForm = _.cloneDeep(this.form.work[index])
      this.workSelectedIndex = index
      this.workPopupType = 'editor'
      this.workPopupVisible = true
    },
    // 删除单条工作经历
    handleDelWorkItem() {
      this.form.work.splice(this.workSelectedIndex, 1)
      this.workPopupVisible = false
    },
    // 工作经历录入弹窗 form 提交
    hanleWorkSubmit(values) {
      const _type = this.workPopupType
      const _work = this.form.work
      const _index = this.workSelectedIndex
      const _workForm = _.cloneDeep(this.workForm)

      if (_type === 'add') {
        if (_work.some(item => item.work === _workForm.work)) return this.$toast.fail('存在重复内容')
        this.form.work.push(_workForm)
      } else {
        if (_work.some((item, index) => item.work === _workForm.work && index !== _index)) return this.$toast.fail('存在重复内容')
        this.form.work.splice(_index, 1, _workForm)
      }

      this.workPopupVisible = false
    },

    // 整体提交
    handleSubmit(values) {
      console.log('submit', values)
    }

  }
}
</script>

<style>
.todo-container {
  padding-bottom: 50px;
}
.mb10 {
  margin-bottom: 10px;
}
.multi {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.multi-list {
  font-size: 12px;
  padding: 0 10px;
}
.multi-list .van-cell {
  font-size: 12px;
}
</style>
