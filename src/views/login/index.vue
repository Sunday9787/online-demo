<template lang="pug">
.login-container
  h1.login-title Login

  el-form.login-form(ref="form" :model="form")
    el-form-item(label="账号")
      el-input(v-model="form.userName" placeholder="请输入用户名/邮箱")

    el-form-item(label="密码")
      el-input(v-model="form.password" type="password" placeholder="请输入密码")

    el-form-item
      el-row(type="flex" justify="center")
        el-button(type="primary" @click="login()") 登录
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

<style lang="scss">
.login-container {
  @apply flex;
  @apply min-h-full;
  @apply flex-col;
  @apply px-6;
  @apply py-10;
  @apply lg:px-8;
  @apply bg-slate-800;
}

.login-title {
  margin-top: 16vh;
  @apply text-white;
  @apply text-center;
  @apply text-2xl;
  @apply font-bold;
  @apply leading-9;
  @apply tracking-tight;
}

.login-form {
  --label-width: 56px;
  @apply mt-10;
  @apply sm:mx-auto;
  @apply sm:w-full;
  @apply sm:max-w-sm;

  .el-form-item {
    position: relative;
  }

  .el-form-item__label {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: var(--label-width);
  }

  .el-input__inner {
    padding-left: var(--label-width);
  }
}
</style>
