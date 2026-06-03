<template>
  <div class="checkout">

    <h1>Thông tin đặt hàng</h1>

    <input v-model="name" placeholder="Họ tên" />
    <input v-model="phone" placeholder="Số điện thoại" />
    <input v-model="address" placeholder="Địa chỉ giao hàng" />

    <select v-model="payment">
      <option value="cod">COD - Thanh toán khi nhận hàng</option>
      <option value="bank">Chuyển khoản</option>
    </select>

    <button @click="placeOrder">
      Xác nhận đặt hàng
    </button>

  </div>
</template>

<script>
import api from '../api/api'
export default {
  data() {
    return {
      name: '',
      phone: '',
      address: '',
      payment: 'cod'
    }
  },

  methods: {
    placeOrder() {

      if (!this.name || !this.phone || !this.address) {
        alert('Vui lòng nhập đầy đủ thông tin')
        return
      }

      alert('Đặt hàng thành công 🎉')

      console.log({
        name: this.name,
        phone: this.phone,
        address: this.address,
        payment: this.payment
      })

      this.$router.push('/')
    }
  }
}
</script>

<style>
.checkout {
  max-width: 450px;
  margin: 40px auto;
}

input, select {
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
}

button {
  width: 100%;
  padding: 12px;
  background: #0071e3;
  color: white;
  border: none;
  border-radius: 999px;
}
</style>