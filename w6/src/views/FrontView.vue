<template>
  <h1>你現在在前台頁面</h1>
  <nav>
    <RouterLink to="/">首頁</RouterLink> │ <RouterLink to="/products">前台產品列表</RouterLink> │
    <RouterLink to="/cart">前台購物車</RouterLink> │ <RouterLink to="/login">登入</RouterLink> │
    <RouterLink to="/admin/products">前往後台</RouterLink>
  </nav>
  <routerView></routerView>
</template>
