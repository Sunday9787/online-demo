<template>
  <div>
    <h1>Login</h1>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.userName" />
      </el-form-item>

      <el-form-item label="密码">
        <el-input v-model="form.password" />
      </el-form-item>

      <el-form-item>
        <el-row type="flex" justify="center">
          <el-button type="primary" @click="login()">登录</el-button>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoginIndex',
  data() {
    return {
      form: { userName: '', password: '' }
    }
  },
  methods: {
    ...mapActions('appModule', { doLogin: 'login' }),
    async login() {
      await this.doLogin(this.form)
      this.$router.push('/dashboard')
    }
  }
}
</script>
