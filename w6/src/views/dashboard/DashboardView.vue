<template>
  <h1>你現在在後台頁面</h1>
  <nav>
    <RouterLink to="/">回到前台</RouterLink> │
    <RouterLink to="/admin/products">後台產品列表</RouterLink> │
    <RouterLink to="/admin/order">後台訂單</RouterLink>
  </nav>
  <routerView></routerView>
</template>
