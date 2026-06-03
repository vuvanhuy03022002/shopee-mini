<template>

<div class="container" v-if="product">

  <div class="left">

    <img
      :src="product.image"
      class="main-image"
    >

  </div>

  <div class="right">

    <h1>
      {{ product.name }}
    </h1>

    <h2 class="price">
      {{ product.price?.toLocaleString() }} đ
    </h2>

    <p>
      {{ product.description }}
    </p>

    <button
      @click="addToCart"
    >
      Thêm vào giỏ
    </button>

    <button
      class="buy"
    >
      Mua ngay
    </button>

  </div>

</div>

</template>

<script>
import products from '../data/products'

export default {

  data() {
    return {
      product: null
    }
  },

  mounted() {

    const id =
      Number(this.$route.params.id)

    this.product =
      products.find(
        p => p.id === id
      )

  },

  methods: {

    addToCart() {

      let cart =
      JSON.parse(
        localStorage.getItem('cart')
        || '[]'
      )

      const index =
      cart.findIndex(
        p => p.id === this.product.id
      )

      if(index !== -1){

        cart[index].qty++

      }else{

        cart.push({
          ...this.product,
          qty:1
        })

      }

      localStorage.setItem(
        'cart',
        JSON.stringify(cart)
      )

      alert('Đã thêm vào giỏ')

    }

  }

}
</script>

<style>
.container{
  display:flex;
  gap:40px;
  padding:40px;
}

.left{
  flex:1;
}

.right{
  flex:1;
}

.main-image{
  width:100%;
}

.price{
  color:#ee4d2d;
}

button{
  padding:15px 25px;
  margin-right:10px;
  border:none;
  cursor:pointer;
}

.buy{
  background:#ee4d2d;
  color:white;
}
</style>