import{a as n}from"./axios-Bo0ATomq.js";import{_ as m,c as p,b as d,a as s,e as c,f as e,w as f,g as k,h as x,r as i,o as u}from"./index-C5k8Ny1j.js";var V={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"yu-t-200053",BASE_URL:"/HexSchool-2023Vue/w7/dist/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:$}=V,R={data(){return{checkSuccess:!1}},methods:{checkAdmin(){const t=document.cookie.replace(/(?:(?:^|.*;\s*)yu-t-200053\s*=\s*([^;]*).*$)|^.*$/,"$1");if(t){n.defaults.headers.common.Authorization=`${t}`;const a=`${$}/api/user/check`;n.post(a).then(()=>{this.checkSuccess=!0}).catch(r=>{alert(r.response.data.message),this.$router.push("/")})}else alert("您尚未登入"),this.$router.push("/")},logout(){document.cookie="yu-t-200053=;expires=;",alert("token 已清除"),this.$router.push("/")}},mounted(){this.checkAdmin()}},v={class:"container mx-auto py-3"},E=d("h1",{class:"text-center"},"後台",-1),S={class:"mx-auto text-center my-3"};function w(t,a,r,y,h,_){const o=i("RouterLink"),l=i("RouterView");return u(),p("div",v,[E,d("nav",S,[s(o,{to:"/admin/products"},{default:c(()=>[e("後台產品列表")]),_:1}),e(" │ "),s(o,{to:"/admin/orders"},{default:c(()=>[e("orders")]),_:1}),e(" │"),s(o,{to:"",onClick:f(_.logout,["prevent"])},{default:c(()=>[e("登出")]),_:1},8,["onClick"])]),h.checkSuccess?(u(),k(l,{key:0})):x("",!0)])}const C=m(R,[["render",w]]);export{C as default};