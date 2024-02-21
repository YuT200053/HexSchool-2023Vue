<template>
  <div>
    後台
    <nav>
      <RouterLink to="/">登入</RouterLink>
      <RouterLink to="/admin">admin</RouterLink>
      <RouterLink to="/admin/products">products</RouterLink>
      <RouterLink to="/admin/orders">orders</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>
