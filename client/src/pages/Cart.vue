<template>
  <div>

    <nav>
      <router-link to="/">
        ← Tiếp tục mua hàng
      </router-link>
    </nav>

    <h1>🛒 Giỏ hàng</h1>

    <div
      v-if="cart.length === 0"
      class="empty"
    >
      Chưa có sản phẩm nào
    </div>

    <div
      v-for="item in cart"
      :key="item.id"
      class="item"
    >
      <img :src="item.image">

      <div class="info">

        <h3>{{ item.name }}</h3>

        <p>
          {{ item.price.toLocaleString() }} đ
        </p>

        <div class="qty">

          <button
            @click="decrease(item.id)"
          >
            -
          </button>

          <span>
            {{ item.qty }}
          </span>

          <button
            @click="increase(item.id)"
          >
            +
          </button>

        </div>

        <button
          class="delete"
          @click="removeItem(item.id)"
        >
          Xóa
        </button>

      </div>

    </div>

    <div
      v-if="cart.length"
      class="total"
    >
      <h2>
        Tổng tiền:
        {{ total.toLocaleString() }} đ
      </h2>
    </div>

    <router-link to="/checkout">
    <button @click="goCheckout">
      Mua hàng
    </button>
</router-link>

  </div>
</template>

<script>
export default {

  data(){
    return{
      cart:[]
    }
  },

  mounted(){
    this.loadCart()
  },

  methods:{

    loadCart(){

      this.cart =
      JSON.parse(
        localStorage.getItem('cart')
        || '[]'
      )

    },

    saveCart(){

      localStorage.setItem(
        'cart',
        JSON.stringify(this.cart)
      )

    },

    increase(id){

      const item =
      this.cart.find(
        p => p.id === id
      )

      item.qty++

      this.saveCart()

    },

    decrease(id){

      const item =
      this.cart.find(
        p => p.id === id
      )

      if(item.qty > 1){

        item.qty--

        this.saveCart()

      }

    },

    removeItem(id){

      this.cart =
      this.cart.filter(
        p => p.id !== id
      )

      this.saveCart()

    },

    goCheckout() {
      localStorage.setItem(
        'checkout_cart',
        JSON.stringify(this.cart)
      )

      this.$router.push('/checkout')
    }

  },

  computed:{

    total(){

      return this.cart.reduce(
        (sum,item)=>
        sum +
        item.price *
        item.qty,
        0
      )

    }

  }

}
</script>

<style>

body{
  font-family:Arial;
}

nav{
  padding:15px;
  background:#ee4d2d;
}

nav a{
  color:white;
  text-decoration:none;
}

.item{
  display:flex;
  gap:20px;
  padding:20px;
  border-bottom:1px solid #ddd;
}

.item img{
  width:120px;
  height:120px;
  object-fit:cover;
}

.info{
  flex:1;
}

.qty{
  display:flex;
  align-items:center;
  gap:10px;
  margin:10px 0;
}

.qty button{
  width:35px;
  height:35px;
}

.delete{
  background:red;
  color:white;
  border:none;
  padding:10px;
}

.total{
  padding:20px;
  text-align:right;
}

.empty{
  padding:30px;
}

</style>