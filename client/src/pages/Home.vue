<template>
  <div>

    <header class="header">

      <div class="logo" @click="goHome">
        🛍 HuyShop
      </div>

      <input
        v-model="search"
        class="search"
        placeholder="Tìm kiếm sản phẩm..."
      >

      <router-link
        to="/cart"
        class="cart"
      >
        🛒 {{ cartCount }}
      </router-link>
      <div v-if="!user">

        <router-link to="/login">
          Đăng nhập
        </router-link>

        <router-link to="/register">
          Đăng ký
        </router-link>

      </div>

      <div v-else>

        <button @click="logout">
          Đăng xuất
        </button>

      </div>

    </header>

    <HeroSlider />

    <section class="categories">

      <div class="category" @click="selectedCategory='phone'">
        📱 Điện thoại
      </div>

      <div class="category" @click="selectedCategory='laptop'">
        💻 Laptop
      </div>

      <div class="category" @click="selectedCategory='accessory'">
        🎧 Phụ kiện
      </div>

      <div class="category" @click="selectedCategory='watch'">
        ⌚ Đồng hồ
      </div>

      <div class="category" @click="selectedCategory='all'">
        📷 tất cả
      </div>

    </section>

    <h2 class="title" id="products"> 
      Sản phẩm nổi bật
    </h2>

    <div class="products">

      <div
        class="card"
        v-for="product in filteredProducts"
        :key="product.id"
      >

        <router-link :to="'/product/' + product.id">
        <img :src="product.image">
        </router-link>

        <div class="content">

          <router-link
            :to="'/product/' + product.id"
          >
            <h3>
              {{ product.name }}
            </h3>
          </router-link>

          <p class="price">
            {{ product.price.toLocaleString() }} đ
          </p>

          <button
            @click="addToCart(product)"
          >
            Thêm vào giỏ
          </button>

        </div>

      </div>

    </div>

  </div>
  <section class="about">

    <h2>✨ Về HuyShop</h2>

    <p>
      HuyShop là nền tảng mua sắm công nghệ hiện đại, mang đến trải nghiệm
      nhanh, mượt và tiện lợi cho người dùng.
    </p>

    <div class="features">

      <div class="feature">
        🚀 <h3>Giao hàng nhanh</h3>
        <p>Giao hàng toàn quốc chỉ từ 1–3 ngày</p>
      </div>

      <div class="feature">
        🔒 <h3>Thanh toán an toàn</h3>
        <p>Hỗ trợ COD và chuyển khoản bảo mật</p>
      </div>

      <div class="feature">
        📱 <h3>Sản phẩm chính hãng</h3>
        <p>Cam kết 100% hàng chất lượng cao</p>
      </div>

      <div class="feature">
        💬 <h3>Hỗ trợ 24/7</h3>
        <p>Luôn sẵn sàng hỗ trợ khách hàng</p>
      </div>

    </div>

  </section>
  <Footer />
</template>

<script>
import productsData from '../data/products'
import { useRouter } from 'vue-router'
import HeroSlider from '../components/HeroSlider.vue'
import Footer from '../components/Footer.vue' 
export default {
  components: { HeroSlider, Footer },
  data() {
    return {
      user: null,
      search: '',
      selectedCategory: 'all',
      products: productsData,
      current: 0
    }
  },

  mounted() {
    const token = localStorage.getItem('token')

    if (token) {
      this.user = true
    }

    setInterval(() => {
      this.current = (this.current + 1) % 3
    }, 3000)
  },

  methods: {

    addToCart(product) {
      let cart = JSON.parse(localStorage.getItem('cart') || '[]')

      const index = cart.findIndex(p => p.id === product.id)

      if (index !== -1) {
        cart[index].qty++
      } else {
        cart.push({
          ...product,
          qty: 1
        })
      }

      localStorage.setItem('cart', JSON.stringify(cart))

      alert('Đã thêm vào giỏ')
    },

    logout() {
      localStorage.removeItem('token')
      this.user = null
      this.$router.push('/login')
    }
  },

  computed: {

    cartCount() {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')

      return cart.reduce((sum, item) => sum + item.qty, 0)
    },

    filteredProducts() {
      let result = this.products

      if (this.selectedCategory !== 'all') {
        result = result.filter(
          product => product.category === this.selectedCategory
        )
      }

      if (this.search) {
        result = result.filter(
          product =>
            product.name.toLowerCase().includes(this.search.toLowerCase())
        )
      }

      return result
    }
  },
  setup() {
    const router = useRouter()

    const goHome = () => {
      router.push('/')
    }

    return { goHome }
  }
}

</script>

<!-- <style>

body{
  margin:0;
  background:#f5f5f5;
  font-family:Arial;
}

.header{
  background:#ee4d2d;
  padding:15px;
  display:flex;
  align-items:center;
  gap:15px;
}

.logo{
  color:white;
  font-size:24px;
  font-weight:bold;
}

.search{
  flex:1;
  padding:10px;
  border:none;
  border-radius:5px;
}

.cart{
  color:white;
  text-decoration:none;
  font-size:20px;
}

.banner{
  margin:20px;
  padding:40px;
  border-radius:15px;
  text-align:center;
  color:white;
  background:
  linear-gradient(
    135deg,
    #ff512f,
    #dd2476
  );
}

.categories{
  display:grid;
  grid-template-columns:
  repeat(5,1fr);
  gap:10px;
  padding:20px;
}

.category{
  background:white;
  padding:20px;
  text-align:center;
  border-radius:10px;
}

.title{
  padding-left:20px;
}

.products{
  display:grid;
  grid-template-columns:
  repeat(auto-fit,minmax(250px,1fr));
  gap:20px;
  padding:20px;
}

.card{
  background:white;
  border-radius:10px;
  overflow:hidden;
  box-shadow:
  0 2px 8px rgba(0,0,0,.1);
}

.card img{
  width:100%;
  height:220px;
  object-fit:cover;
}

.content{
  padding:15px;
}

.price{
  color:#ee4d2d;
  font-weight:bold;
}

button{
  width:100%;
  padding:12px;
  border:none;
  background:#ee4d2d;
  color:white;
  cursor:pointer;
}

</style> -->