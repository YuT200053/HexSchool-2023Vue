<template>
  <div class="container fw-bold pt-5">
    <h1 class="text-center">前台頁面</h1>
    <nav class="text-center">
      <RouterLink to="/">首頁</RouterLink> │ <RouterLink to="/products">前台產品列表</RouterLink> │
      <RouterLink to="/cart">前台購物車</RouterLink> │ <RouterLink to="/login">登入</RouterLink> │
      <RouterLink to="/admin/products">前往後台</RouterLink>
    </nav>
    <routerView></routerView>
  </div>
</template>
