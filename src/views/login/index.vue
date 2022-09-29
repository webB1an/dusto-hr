<template>
  <div class="login-container">
    <div class="login-wrapper">
      <div class="login-title">登录</div>
      <van-form @submit="onSubmit" >
        <van-field
          v-model="username"
          :rules="[{ required: true}]"
          name="username"
          label="请输入用户名"
          placeholder="用户名"
        />
        <van-field
          v-model="phone"
          :rules="[{ required: true }]"
          type="phone"
          name="phone"
          label="请输入手机号"
          placeholder="手机号"
        />
        <van-field
          v-model="idCard"
          :rules="[{ required: true }]"
          type="idCard"
          name="idCard"
          label="请输入身份证号"
          placeholder="身份证号"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      phone: '',
      idCard: ''
    }
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values)
    }
  }
}
</script>

<style>
.login-container {
  position: relative;
  height: 100%;
  background-color: #f0f0f0;
}
.login-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  padding: 10px 10px 0;
  background-color: #fff;
}
.login-title {
  margin-bottom: 10px;
  color: #646566;
  font-size: 18px;
  text-align: center;
}
</style>
