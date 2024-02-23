import{a as v}from"./axios-Bo0ATomq.js";import{M as x,P as C}from"./bootstrap.esm-B8D9F63g.js";import{_ as M,o as l,c as d,b as t,d as n,v as r,F as k,i as w,h as E,w as m,j as $,f as U,t as _,a as h,r as b}from"./index-DpkVDxez.js";const D={data(){return{editModal:""}},props:["tempProduct","isNew"],methods:{openModal(){this.editModal.show()},hideModal(){this.editModal.hide()},editProduct(){this.$emit("editProduct")}},mounted(){this.editModal=new x(this.$refs.editModal,{keyboard:!1,backdrop:"static"})}},N={class:"modal fade",id:"exampleModal",tabindex:"-1","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"editModal"},T={class:"modal-dialog modal-xl"},R={class:"modal-content"},S={class:"modal-header bg-dark"},A={class:"modal-title text-white"},B={key:0},I={key:1},H=t("button",{type:"button",class:"btn-close btn-close-white","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),F={class:"modal-body"},G={class:"row"},O={class:"col-4"},j={class:"mb-3"},q=t("label",{for:"imageUrl",class:"form-label"},"主要圖片",-1),z=["src","alt"],J=t("label",{for:"imagesUrl",class:"form-label"},"圖片網址",-1),K=["onUpdate:modelValue"],Q=["src","alt"],W={class:"col-8"},X={class:"row"},Y={class:"col-12 mb-3"},Z=t("label",{for:"title",class:"form-label"},"標題",-1),tt={class:"col-6 mb-3"},et=t("label",{for:"category",class:"form-label"},"分類",-1),ot={class:"col-6 mb-3"},st=t("label",{for:"unit",class:"form-label"},"單位",-1),lt={class:"col-6 mb-3"},dt=t("label",{for:"origin_price",class:"form-label"},"原價",-1),at={class:"col-6 mb-3"},it=t("label",{for:"price",class:"form-label"},"售價",-1),nt=t("hr",null,null,-1),ct={class:"mb-3"},rt=t("label",{for:"description",class:"form-label"},"產品描述",-1),ut={class:"mb-3"},mt=t("label",{for:"content",class:"form-label"},"說明內容",-1),pt={class:"mb-3"},_t=t("label",{for:"is_enabled",class:"form-check-label"},"是否啟用",-1),ht={class:"modal-footer"},bt=t("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function gt(a,e,o,y,u,i){return l(),d("div",N,[t("div",T,[t("div",R,[t("div",S,[t("h5",A,[o.isNew?(l(),d("span",B,"新增產品")):(l(),d("span",I,"編輯產品"))]),H]),t("div",F,[t("div",G,[t("div",O,[t("div",j,[q,n(t("input",{type:"text",id:"imageUrl",class:"form-control",placeholder:"請輸入圖片連結","onUpdate:modelValue":e[0]||(e[0]=s=>o.tempProduct.imageUrl=s)},null,512),[[r,o.tempProduct.imageUrl]])]),t("img",{class:"w-100 mb-3",src:o.tempProduct.imageUrl,alt:o.tempProduct.title},null,8,z),(l(!0),d(k,null,w(o.tempProduct.imagesUrl,(s,p)=>(l(),d("div",{key:"img"+p},[J,n(t("input",{type:"text",id:"imagesUrl",class:"form-control mb-3",placeholder:"請輸入圖片連結","onUpdate:modelValue":P=>o.tempProduct.imagesUrl[p]=P},null,8,K),[[r,o.tempProduct.imagesUrl[p]]]),s?(l(),d("img",{key:0,class:"w-100 mb-3",src:s,alt:"img"+p},null,8,Q)):E("",!0)]))),128)),!o.tempProduct.imagesUrl.length||o.tempProduct.imagesUrl[o.tempProduct.imagesUrl.length-1]?(l(),d("button",{key:0,type:"button",class:"btn btn-outline-primary w-100 mb-3",onClick:e[1]||(e[1]=m(s=>o.tempProduct.imagesUrl.push(""),["prevent"]))}," 新增圖片 ")):(l(),d("button",{key:1,type:"button",class:"btn btn-outline-danger w-100 mb-3",onClick:e[2]||(e[2]=m(s=>o.tempProduct.imagesUrl.pop(),["prevent"]))}," 刪除圖片 "))]),t("div",W,[t("div",X,[t("div",Y,[Z,n(t("input",{type:"text",id:"title",class:"form-control",placeholder:"請輸入標題","onUpdate:modelValue":e[3]||(e[3]=s=>o.tempProduct.title=s)},null,512),[[r,o.tempProduct.title]])]),t("div",tt,[et,n(t("input",{type:"text",id:"category",class:"form-control",placeholder:"請輸入分類","onUpdate:modelValue":e[4]||(e[4]=s=>o.tempProduct.category=s)},null,512),[[r,o.tempProduct.category]])]),t("div",ot,[st,n(t("input",{type:"text",id:"unit",class:"form-control",placeholder:"請輸入單位","onUpdate:modelValue":e[5]||(e[5]=s=>o.tempProduct.unit=s)},null,512),[[r,o.tempProduct.unit]])]),t("div",lt,[dt,n(t("input",{type:"number",id:"origin_price",class:"form-control",placeholder:"請輸入原價","onUpdate:modelValue":e[6]||(e[6]=s=>o.tempProduct.origin_price=s)},null,512),[[r,o.tempProduct.origin_price]])]),t("div",at,[it,n(t("input",{type:"number",id:"price",class:"form-control",placeholder:"請輸入售價","onUpdate:modelValue":e[7]||(e[7]=s=>o.tempProduct.price=s)},null,512),[[r,o.tempProduct.price]])])]),nt,t("div",ct,[rt,n(t("textarea",{name:"description",id:"description",class:"form-control",cols:"30",placeholder:"請輸入產品描述","onUpdate:modelValue":e[8]||(e[8]=s=>o.tempProduct.description=s)},null,512),[[r,o.tempProduct.description]])]),t("div",ut,[mt,n(t("textarea",{name:"content",id:"content",class:"form-control",cols:"30",placeholder:"請輸入說明內容","onUpdate:modelValue":e[9]||(e[9]=s=>o.tempProduct.content=s)},null,512),[[r,o.tempProduct.content]])]),t("div",pt,[n(t("input",{type:"checkbox",id:"is_enabled",class:"form-check-input me-1","onUpdate:modelValue":e[10]||(e[10]=s=>o.tempProduct.is_enabled=s)},null,512),[[$,o.tempProduct.is_enabled]]),_t])])])]),t("div",ht,[bt,t("button",{type:"button",class:"btn btn-primary",onClick:e[11]||(e[11]=m((...s)=>i.editProduct&&i.editProduct(...s),["prevent"]))},"確認")])])])],512)}const ft=M(D,[["render",gt]]),Pt={data(){return{deleteModal:""}},props:["tempProduct"],methods:{openModal(){this.deleteModal.show()},hideModal(){this.deleteModal.hide()},deleteProduct(){this.$emit("deleteProduct")}},mounted(){this.deleteModal=new x(this.$refs.deleteModal,{keyboard:!1,backdrop:"static"})}},vt={class:"modal fade",id:"exampleModal",tabindex:"-1","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"deleteModal"},Mt={class:"modal-dialog"},yt={class:"modal-content"},Ut=t("div",{class:"modal-header bg-danger"},[t("h5",{class:"modal-title text-white"},"刪除產品"),t("button",{type:"button",class:"btn-close btn-close-white","data-bs-dismiss":"modal","aria-label":"Close"})],-1),xt={class:"modal-body"},kt={class:"text-danger"},wt={class:"modal-footer"},Vt=t("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function Lt(a,e,o,y,u,i){return l(),d("div",vt,[t("div",Mt,[t("div",yt,[Ut,t("div",xt,[U(" 是否刪除 "),t("strong",kt,_(o.tempProduct.title),1),U(" 商品 (刪除後將無法恢復)。 ")]),t("div",wt,[Vt,t("button",{type:"button",class:"btn btn-danger",onClick:e[0]||(e[0]=m((...s)=>i.deleteProduct&&i.deleteProduct(...s),["prevent"]))}," 確認刪除 ")])])])],512)}const Ct=M(Pt,[["render",Lt]]);var Et={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"yu-t-200053",BASE_URL:"/HexSchool-2023Vue/w7/dist/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:g,VITE_PATH:f}=Et,$t={data(){return{products:[],pagination:{},isNew:!1,tempProduct:{imagesUrl:[]},deleteModal:"",isLoading:!1}},components:{PaginationComponent:C,EditModal:ft,DeleteModal:Ct},methods:{getProducts(a=1){const e=`${g}/api/${f}/admin/products?page=${a}`;this.isLoading=!0,v.get(e).then(o=>{this.products=o.data.products,this.pagination=o.data.pagination,this.isLoading=!1}).catch(o=>{alert(o.response.data.message)})},openModal(a,e){this.isLoading=!0,a==="add"?(this.isNew=!0,this.tempProduct={imagesUrl:[]},this.$refs.editModal.openModal(),this.isLoading=!1):a==="edit"?(this.isNew,this.tempProduct={...e},this.tempProduct.imagesUrl=this.tempProduct.imagesUrl||[],this.$refs.editModal.openModal(),this.isLoading=!1):a==="delete"&&(this.tempProduct={...e},this.tempProduct.imagesUrl=this.tempProduct.imagesUrl||[],this.$refs.deleteModal.openModal(),this.isLoading=!1)},editProduct(){let a=`${g}/api/${f}/admin/product`,e="post";this.isNew||(a=`${g}/api/${f}/admin/product/${this.tempProduct.id}`,e="put"),this.isLoading=!0,v[e](a,{data:this.tempProduct}).then(o=>{alert(o.data.message),this.$refs.editModal.hideModal(),this.getProducts(),this.isLoading=!1}).catch(o=>{alert(o.response.data.message)})},deleteProduct(){const a=`${g}/api/${f}/admin/product/${this.tempProduct.id}`;this.isLoading=!0,v.delete(a).then(e=>{alert(e.data.message),this.$refs.deleteModal.hideModal(),this.getProducts(),this.isLoading=!1}).catch(e=>{alert(e.response.data.message)})}},mounted(){this.getProducts()}},Dt={class:"container mx-auto"},Nt=t("h2",{class:"text-center"},"後台產品列表",-1),Tt={class:"text-end my-3"},Rt={class:"table align-middle"},St=t("thead",null,[t("tr",null,[t("td",null,"分類"),t("td",{width:"25%"},"產品名稱"),t("td",null,"原價"),t("td",null,"售價"),t("td",null,"是否啟用"),t("td",null,"編輯")])],-1),At={key:0,class:"text-success"},Bt={key:1},It={class:"btn-group btn-group-sm",role:"group","aria-label":"edit"},Ht=["onClick"],Ft=["onClick"];function Gt(a,e,o,y,u,i){const s=b("VueLoading"),p=b("PaginationComponent"),P=b("EditModal"),V=b("DeleteModal");return l(),d("div",Dt,[h(s,{active:u.isLoading},null,8,["active"]),Nt,t("div",Tt,[t("button",{type:"button",class:"btn btn-primary",onClick:e[0]||(e[0]=m(c=>i.openModal("add"),["prevent"]))}," 建立新產品 ")]),t("table",Rt,[St,t("tbody",null,[(l(!0),d(k,null,w(u.products,c=>(l(),d("tr",{key:c.id},[t("td",null,_(c.category),1),t("td",null,_(c.title),1),t("td",null,_(c.origin_price),1),t("td",null,_(c.price),1),t("td",null,[c.is_enabled?(l(),d("span",At,"啟用")):(l(),d("span",Bt,"未啟用"))]),t("td",null,[t("div",It,[t("button",{type:"button",class:"btn btn-outline-primary",onClick:m(L=>i.openModal("edit",c),["prevent"])}," 編輯 ",8,Ht),t("button",{type:"button",class:"btn btn-outline-danger",onClick:m(L=>i.openModal("delete",c),["prevent"])}," 刪除 ",8,Ft)])])]))),128))])]),h(p,{pagination:u.pagination,onGetProducts:i.getProducts},null,8,["pagination","onGetProducts"]),h(P,{ref:"editModal","temp-product":u.tempProduct,"is-new":u.isNew,onEditProduct:i.editProduct},null,8,["temp-product","is-new","onEditProduct"]),h(V,{ref:"deleteModal","temp-product":u.tempProduct,onDeleteProduct:i.deleteProduct},null,8,["temp-product","onDeleteProduct"])])}const zt=M($t,[["render",Gt]]);export{zt as default};