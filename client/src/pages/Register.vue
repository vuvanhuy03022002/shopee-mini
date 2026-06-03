<template>

<div class="box">

<h1>Đăng ký</h1>

<input
v-model="name"
placeholder="Tên"
>

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
@click="register"
>
Đăng ký
</button>

</div>

</template>

<script>
import api from '../api/api'

export default {

  data() {
    return {
      name:'',
      email:'',
      password:''
    }
  },

  methods: {

    async register() {

      try {

        await api.post(
          '/register',
          {
            name:this.name,
            email:this.email,
            password:this.password
          }
        )

        alert(
          'Đăng ký thành công'
        )

        this.$router.push('/login')

      } catch(err) {

        alert(
          'Đăng ký thất bại'
        )

      }

    }

  }

}
</script>