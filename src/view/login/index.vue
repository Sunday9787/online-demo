<template>
  <div>
    <h1>Login</h1>
    <el-form ref="form" :model="form" label-width="80px" class="bg-slate-900 -my-16">
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

    <div class="container">
      <img src="/public/image/banner.png" alt="" srcset="" id="scale" />
    </div>
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

  mounted() {
    const el = document.getElementById('scale')
    let scale = 1
    const minScale = 1
    const maxScale = 4
    let x = 0
    let y = 0

    /**
     * @param {WheelEvent} e
     */
    const mousewheel = function (e) {
      console.log(e)
      let ratio = 1.1

      if (e.deltaY > 0) {
        ratio = 1 / 1.1
      }

      const onScale = scale * ratio

      if (onScale > maxScale) {
        ratio = maxScale / scale
        scale = maxScale
      } else if (onScale < minScale) {
        ratio = minScale / scale
        scale = minScale
      } else {
        scale = onScale
      }

      const origin = {
        x: (ratio - 1) * el.offsetWidth * 0.5,
        y: (ratio - 1) * el.offsetHeight * 0.5
      }

      x -= (ratio - 1) * (e.clientX - x - (window.innerWidth - el.offsetWidth) * 0.5) - origin.x
      y -= (ratio - 1) * (e.clientY - y - (window.innerHeight - el.innerHeight) * 0.5) - origin.y

      const offsetX = Math.min(
        Math.max(x, el.offsetWidth - (el.offsetWidth * (scale + 1)) / 2),
        (el.offsetWidth * (scale - 1)) / 2
      )
      const offsetY = Math.min(
        Math.max(y, el.offsetHeight - (el.offsetHeight * (scale + 1)) / 2),
        (el.offsetHeight * (scale - 1)) / 2
      )

      x = offsetX
      y = offsetY
      el.style.transform = `matrix(${scale}, 0, 0, ${scale}, ${offsetX}, ${offsetY})`
    }

    el.addEventListener('mousewheel', mousewheel)

    this.$once('hook:beforeDestroy', function () {
      el.removeEventListener('mousewheel', mousewheel)
    })
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
.container {
  display: flex;
  justify-content: center;
}
</style>
