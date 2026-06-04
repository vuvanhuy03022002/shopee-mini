<template>
  <footer class="footer">

    <div class="container">

      <!-- Cột 1 -->
      <div class="col">
        <h3>HuyShop</h3>
        <p>
          Nền tảng mua sắm công nghệ hiện đại,
          nhanh chóng và uy tín.
        </p>
      </div>

      <!-- Cột 2 -->
      <div class="col">
        <h3>Liên kết</h3>
        <a href="#">Trang chủ</a>
        <a href="#">Sản phẩm</a>
        <a href="#">Giỏ hàng</a>
        <a href="#">Liên hệ</a>
      </div>

      <!-- Cột 3 -->
      <div class="col">
        <h3>Hỗ trợ</h3>
        <a href="#">FAQ</a>
        <a href="#">Chính sách</a>
        <a href="#">Bảo mật</a>
      </div>

      <!-- Cột 4 -->
      <div class="col">
        <h3>Liên hệ</h3>
        <p>📍 Hà Nội, Việt Nam</p>
        <p>📞 0386459796</p>
        <p>✉ vuvanhuy03022002@gmail.com</p>
      </div>

    </div>

    <div class="bottom">
      © 2026 HuyShop. All rights reserved.
    </div>

  </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
.footer {
  background: #111;
  color: #fff;
  margin-top: 50px;
  padding: 40px 20px 10px;
}

.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: auto;
}

.col h3 {
  margin-bottom: 10px;
  color: #ff4d2d;
}

.col a {
  display: block;
  color: #ccc;
  text-decoration: none;
  margin: 5px 0;
  font-size: 14px;
}

.col a:hover {
  color: white;
}

.bottom {
  text-align: center;
  margin-top: 30px;
  padding-top: 10px;
  border-top: 1px solid #333;
  font-size: 13px;
  color: #aaa;
}
</style>