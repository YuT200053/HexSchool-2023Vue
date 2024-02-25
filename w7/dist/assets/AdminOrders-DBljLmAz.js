import{a as p}from"./axios-Bo0ATomq.js";import{M as D,P as $,D as C}from"./DeleteModal-B8biiRxc.js";import{_ as k,o as d,c as o,b as t,t as s,h as V,F as f,i as O,d as y,j as E,w as v,k as S,a as h,r as m}from"./index-CUrWq2d5.js";const P={data(){return{orderModal:""}},props:["tempOrder"],methods:{openModal(){this.orderModal.show()},hideModal(){this.orderModal.hide()},updateOrder(){this.$emit("updateOrder",this.tempOrder)}},mounted(){this.orderModal=new D(this.$refs.orderModal,{keyboard:!1,backdrop:"static"})}},I={class:"modal fade",id:"orderModal",tabindex:"-1","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"orderModal"},T={class:"modal-dialog modal-xl"},U={class:"modal-content"},R=t("div",{class:"modal-header bg-dark"},[t("h5",{class:"modal-title text-white"},"訂單細節"),t("button",{type:"button",class:"btn-close btn-close-white","data-bs-dismiss":"modal","aria-label":"Close"})],-1),A={class:"modal-body"},B={class:"row"},H={class:"col-4"},N=t("h3",null,"用戶資料",-1),j={class:"table"},q={key:0},F=t("th",null,"姓名",-1),G=t("th",null,"Email",-1),z=t("th",null,"電話",-1),J=t("th",null,"地址",-1),K={class:"col-8"},Q=t("h3",null,"訂單細節",-1),W={class:"table"},X=t("th",null,"訂單編號",-1),Y=t("th",null,"下單時間",-1),Z=t("th",null,"付款時間",-1),tt={key:0},et={key:1,class:"text-muted"},st=t("th",null,"付款狀態",-1),dt={key:0,class:"text-success"},ot={key:1,class:"text-muted"},at=t("th",null,"總金額",-1),nt=t("h3",null,"選購商品",-1),lt={class:"table"},it={class:"form-check d-flex justify-content-end"},rt={class:"form-check-label",for:"is_paid"},ct={key:0},_t={key:1},ut={class:"modal-footer"},ht=t("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function mt(l,a,e,u,_,r){return d(),o("div",I,[t("div",T,[t("div",U,[R,t("div",A,[t("div",B,[t("div",H,[N,t("table",j,[e.tempOrder.user?(d(),o("tbody",q,[t("tr",null,[F,t("td",null,s(e.tempOrder.user.name),1)]),t("tr",null,[G,t("td",null,s(e.tempOrder.user.email),1)]),t("tr",null,[z,t("td",null,s(e.tempOrder.user.tel),1)]),t("tr",null,[J,t("td",null,s(e.tempOrder.user.address),1)])])):V("",!0)])]),t("div",K,[Q,t("table",W,[t("tbody",null,[t("tr",null,[X,t("td",null,s(e.tempOrder.id),1)]),t("tr",null,[Y,t("td",null,s(new Date(e.tempOrder.create_at*1e3).toLocaleDateString()),1)]),t("tr",null,[Z,t("td",null,[e.tempOrder.paid_date?(d(),o("span",tt,s(new Date(e.tempOrder.paid_date*1e3).toLocaleDateString()),1)):(d(),o("span",et,"尚未付款"))])]),t("tr",null,[st,t("td",null,[e.tempOrder.is_paid?(d(),o("strong",dt,"已付款")):(d(),o("span",ot,"尚未付款"))])]),t("tr",null,[at,t("td",null,s(e.tempOrder.total),1)])])]),nt,t("table",lt,[(d(!0),o(f,null,O(e.tempOrder.products,i=>(d(),o("tr",{key:i.id},[t("th",null,s(i.product.title),1),t("td",null,s(i.qty)+" / "+s(i.product.unit),1),t("td",null,s(i.total),1)]))),128))]),t("div",it,[y(t("input",{class:"form-check-input me-1",type:"checkbox",value:"",id:"is_paid","onUpdate:modelValue":a[0]||(a[0]=i=>e.tempOrder.is_paid=i)},null,512),[[E,e.tempOrder.is_paid]]),t("label",rt,[e.tempOrder.is_paid?(d(),o("span",ct,"已付款")):(d(),o("span",_t,"未付款"))])])])])]),t("div",ut,[ht,t("button",{type:"button",class:"btn btn-primary",onClick:a[1]||(a[1]=v(i=>r.updateOrder(e.tempOrder),["prevent"]))}," 修改付款狀態 ")])])])],512)}const pt=k(P,[["render",mt]]);var bt={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"yu-t-200053",BASE_URL:"/HexSchool-2023Vue/w7/dist/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:b,VITE_PATH:g}=bt,gt={data(){return{orders:{},pagination:{},isLoading:!1,tempOrder:{}}},components:{PaginationComponent:$,OrderModal:pt,DeleteModal:C},methods:{getOrders(l=1){const a=`${b}/api/${g}/admin/orders?page=${l}`;this.isLoading=!0,p.get(a).then(e=>{this.orders=e.data.orders,this.pagination=e.data.pagination,this.isLoading=!1}).catch(e=>{alert(e.response.data.message)})},openModal(l,a){this.tempOrder={...l},this.isLoading=!0,a==="view"?(this.$refs.orderModal.openModal(),this.isLoading=!1):a==="delete"&&(this.$refs.deleteModal.openModal(),this.isLoading=!1)},updateOrder(l){const a=`${b}/api/${g}/admin/order/${l.id}`,e={is_paid:l.is_paid};this.isLoading=!0,p.put(a,{data:e}).then(u=>{alert(u.data.message),this.$refs.orderModal.hideModal(),this.getOrders(this.pagination.current_page),this.isLoading=!1}).catch(u=>{alert(u.response.data.message)})},deleteOrder(){const l=`${b}/api/${g}/admin/order/${this.tempOrder.id}`;this.isLoading=!0,p.delete(l).then(a=>{alert(a.data.message),this.getOrders(this.pagination.current_page),this.$refs.deleteModal.hideModal(),this.isLoading=!1}).catch(a=>{alert(a.response.data.message)})}},mounted(){this.getOrders()}},ft={class:"container mx-auto"},Ot=t("h2",{class:"text-center"},"後台訂單",-1),vt={class:"table align-middle"},kt=t("thead",null,[t("tr",null,[t("td",null,"購買時間"),t("td",{width:"25%"},"Email"),t("td",{width:"25%"},"購買款項"),t("td",null,"應付金額"),t("td",null,"是否付款"),t("td",null,"編輯")])],-1),yt={class:"list-unstyled"},Mt={class:"form-check form-switch"},Lt=["id","checked","onChange"],xt=["for"],wt={key:0},Dt={key:1},$t={class:"btn-group btn-group-sm",role:"group","aria-label":"edit"},Ct=["onClick"],Vt=["onClick"];function Et(l,a,e,u,_,r){const i=m("VueLoading"),M=m("PaginationComponent"),L=m("OrderModal"),x=m("DeleteModal"),w=S("modal");return d(),o("div",ft,[h(i,{active:_.isLoading},null,8,["active"]),Ot,t("table",vt,[kt,t("tbody",null,[(d(!0),o(f,null,O(_.orders,n=>(d(),o("tr",{key:n.id},[t("td",null,s(new Date(n.create_at*1e3).toLocaleDateString()),1),t("td",null,s(n.user.email),1),t("td",null,[t("ul",yt,[(d(!0),o(f,null,O(n.products,c=>(d(),o("li",{key:c.id},s(c.product.title)+" "+s(c.qty)+" "+s(c.product.unit),1))),128))])]),t("td",null,s(n.total),1),t("td",null,[t("div",Mt,[y(t("input",{class:"form-check-input",type:"checkbox",role:"switch",id:`paidSwitch${n.id}`,checked:n.is_paid,onChange:c=>r.updateOrder(n)},null,40,Lt),[[w,n.is_paid]]),t("label",{class:"form-check-label",for:`paidSwitch${n.id}`},[n.is_paid?(d(),o("span",wt,"已付款")):(d(),o("span",Dt,"未付款"))],8,xt)])]),t("td",null,[t("div",$t,[t("button",{type:"button",class:"btn btn-outline-primary",onClick:v(c=>r.openModal(n,"view"),["prevent"])}," 檢視 ",8,Ct),t("button",{type:"button",class:"btn btn-outline-danger",onClick:v(c=>r.openModal(n,"delete"),["prevent"])}," 刪除 ",8,Vt)])])]))),128))])]),h(M,{pagination:_.pagination,onGetProducts:r.getOrders},null,8,["pagination","onGetProducts"]),h(L,{ref:"orderModal","temp-order":_.tempOrder,onUpdateOrder:r.updateOrder},null,8,["temp-order","onUpdateOrder"]),h(x,{ref:"deleteModal","temp-item":_.tempOrder,onDeleteItem:r.deleteOrder},null,8,["temp-item","onDeleteItem"])])}const Tt=k(gt,[["render",Et]]);export{Tt as default};