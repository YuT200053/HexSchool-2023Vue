import{a as c}from"./axios-Bo0ATomq.js";import{_ as m,c as p,a as s,f as u,g as l,v as d,o as _}from"./index-HJmEgyNn.js";var f={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"yu-t-200053",BASE_URL:"/HexSchool-2023Vue/w6/dist/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:h}=f,w={data(){return{user:{username:"",password:""}}},methods:{login(){const a=`${h}/admin/signin`;c.post(a,this.user).then(e=>{const{token:r,expired:n}=e.data;document.cookie=`yu-t-200053=${r};expires=${new Date(n)};`,alert(e.data.message),this.$router.push("/admin/products")}).catch(e=>{alert(e.response.data.message)})}}},g={class:"container text-center d-flex align-items-center",style:{height:"100vh"}},v={class:"row w-100"},x={class:"col-12 col-md-5 col-lg-4 mx-auto"},b=s("h2",{class:"mb-3"},"請先登入",-1),V={class:"form-floating mb-3"},E=s("label",{for:"email"},"Email address",-1),y={class:"form-floating mb-3"},D=s("label",{for:"password"},"Password",-1),R=s("button",{type:"submit",class:"btn btn-primary btn-lg w-100 fw-bold"},"登入",-1);function S(a,e,r,n,t,i){return _(),p("div",g,[s("div",v,[s("div",x,[b,s("form",{onSubmit:e[2]||(e[2]=u((...o)=>i.login&&i.login(...o),["prevent"]))},[s("div",V,[l(s("input",{type:"email",name:"email",class:"form-control",id:"email",placeholder:"name@example.com","onUpdate:modelValue":e[0]||(e[0]=o=>t.user.username=o)},null,512),[[d,t.user.username]]),E]),s("div",y,[l(s("input",{type:"password",name:"password",class:"form-control",id:"password",placeholder:"Password","onUpdate:modelValue":e[1]||(e[1]=o=>t.user.password=o)},null,512),[[d,t.user.password]]),D]),R],32)])])])}const k=m(w,[["render",S]]);export{k as default};
