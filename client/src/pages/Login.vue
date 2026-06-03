<template>

<div class="box">

<h1>Đăng nhập</h1>

<input
v-model="email"
placeholder="Email"
>

<input
v-model="password"
type="password"
placeholder="Mật khẩu"
>

<button
@click="login"
>
Đăng nhập
</button>

</div>

</template>

<script>
import api from '../api/api'

export default {

  data() {
    return {
      email:'',
      password:''
    }
  },

  methods: {

    async login() {

      try {

        const res =
        await api.post(
          '/login',
          {
            email:this.email,
            password:this.password
          }
        )

        localStorage.setItem(
          'token',
          res.data.token
        )

        alert(
          'Đăng nhập thành công'
        )

        this.$router.push('/')

      } catch(err) {

        alert(
          'Sai tài khoản hoặc mật khẩu'
        )

      }

    }

  }

}
</script>

<style>

</style>