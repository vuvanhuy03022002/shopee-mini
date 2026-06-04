<template>
  <div class="slider">

    <!-- Khung dịch chuyển slide -->
    <div class="track" :style="{ transform: `translateX(-${index * 100}%)` }">
      <div class="slide" v-for="(s, i) in slides" :key="i">
        <img :src="s.image" :alt="s.title" />

        <div class="content">
          <h1>{{ s.title }}</h1>
          <p>{{ s.desc }}</p>
          <button @click="goToProducts">Mua ngay</button>
        </div>
      </div>
    </div>

    <!-- Nút điều hướng -->
    <button class="prev" @click="prev">‹</button>
    <button class="next" @click="next">›</button>

    <!-- Chấm chuyển slide nhanh -->
    <div class="dots">
      <span
        v-for="(s, i) in slides"
        :key="i"
        :class="{ active: i === index }"
        @click="setSlide(i)"
      />
    </div>

  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
    name: 'HomeSlider',
    setup() {
        const router = useRouter()
        const index = ref(0)

        const slides = [
            {
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000",
            title: "Sale Lớn 2026",
            desc: "Giảm đến 70%"
            },
            {
            image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1000",
            title: "Sneaker Trend",
            desc: "Hot nhất hiện nay"
            },
            {
            image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000",
            title: "Thời trang mới",
            desc: "Phong cách trẻ trung"
            }
        ]

        const next = () => {
            index.value = (index.value + 1) % slides.length
        }

        const prev = () => {
            index.value = (index.value - 1 + slides.length) % slides.length
        }

        const setSlide = (i) => {
            index.value = i
        }

        const goHome = () => {
            router.push('/')
        }

        // ✅ SCROLL SẢN PHẨM
        const goToProducts = () => {
            const el = document.getElementById('products')
            if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
            }
        }

        return {
            slides,
            index,
            next,
            prev,
            setSlide,
            goHome,
            goToProducts   // 👈 PHẢI RETURN
        }
        }
}
</script>

<style scoped>
.slider {
  position: relative;
  width: 100%;
  height: 420px;
  overflow: hidden;
  border-radius: 16px;
}

.track {
  display: flex;
  transition: transform 0.5s ease-in-out; /* Chỉ định rõ transition cho thuộc tính transform */
  height: 100%;
}

.slide {
  flex: 0 0 100%; /* Đảm bảo slide luôn chiếm đúng 100% chiều rộng track, không co, không giãn */
  position: relative;
  height: 100%;
}

.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  position: absolute;
  top: 50%;
  left: 80px;
  transform: translateY(-50%);
  color: white;
  z-index: 2;
}

.prev, .next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.4);
  color: white;
  border: none;
  font-size: 24px;
  padding: 10px 15px;
  cursor: pointer;
  z-index: 10; /* Đảm bảo nút điều hướng luôn nằm trên ảnh */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.prev { left: 20px; }
.next { right: 20px; }

.dots {
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
  z-index: 10;
}

.dots span {
  width: 10px;
  height: 10px;
  display: inline-block;
  margin: 0 5px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s ease;
}

.dots .active {
  background: #ff4d2d;
  width: 24px; /* Tạo hiệu ứng dot dài ra nhìn hiện đại hơn */
  border-radius: 5px;
}
</style>