<template>
  <div class="container py-3 text-center d-flex align-items-center" style="height: 100vh">
    <div class="row w-100">
      <div class="col-12 col-md-5 col-lg-4 mx-auto">
        <p class="h2 mb-4">請先登入</p>
        <form>
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="email" placeholder="name@example.com" />
            <label for="email">Email address</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" id="Password" placeholder="Password" />
            <label for="Password">Password</label>
          </div>
          <button type="submit" class="btn btn-primary w-100 my-4">登入</button>
        </form>
      </div>
    </div>
  </div>
</template>
