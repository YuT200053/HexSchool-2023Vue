import{a as p}from"./axios-Bo0ATomq.js";import{P as w,M}from"./bootstrap.esm-B8D9F63g.js";import{_ as D,k as L,c as n,a as m,b as t,F as u,i as h,t as o,h as V,d as b,j as C,w as g,r as y,o as l}from"./index-DpkVDxez.js";var E={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"yu-t-200053",BASE_URL:"/HexSchool-2023Vue/w7/dist/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:k,VITE_PATH:f}=E,S={data(){return{orders:{},pagination:{},isLoading:!1,orderModal:"",tempOrder:{}}},components:{PaginationComponent:w},methods:{getOrders(d=1){const i=`${k}/api/${f}/admin/orders?page=${d}`;p.get(i).then(a=>{this.orders=a.data.orders,this.pagination=a.data.pagination,console.log(this.orders[0])}).catch(a=>{alert(a.response.data.message)})},openModal(d){this.tempOrder={...d},this.orderModal.show()},updateOrder(d){const i=`${k}/api/${f}/admin/order/${d.id}`,a={is_paid:d.is_paid};p.put(i,{data:a}).then(c=>{alert(c.data.message),this.orderModal.hide(),this.getOrders(this.pagination.current_page)}).catch(c=>{alert(c.response.data.message)})}},mounted(){this.getOrders(),this.orderModal=new M(this.$refs.orderModal,{keyboard:!1,backdrop:"static"})}},P={class:"container mx-auto"},T=t("h2",{class:"text-center"},"後台訂單",-1),R={class:"table align-middle"},A=t("thead",null,[t("tr",null,[t("td",null,"購買時間"),t("td",{width:"25%"},"Email"),t("td",{width:"25%"},"購買款項"),t("td",null,"應付金額"),t("td",null,"是否付款"),t("td",null,"編輯")])],-1),B={class:"list-unstyled"},I={class:"form-check form-switch"},U=["id","checked"],H=["for"],N={key:0},j={key:1},q={class:"btn-group btn-group-sm",role:"group","aria-label":"edit"},F=["onClick"],G=t("button",{type:"button",class:"btn btn-outline-danger"},"刪除",-1),z={class:"modal fade",id:"orderModal",tabindex:"-1","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"orderModal"},J={class:"modal-dialog modal-xl"},K={class:"modal-content"},Q=t("div",{class:"modal-header bg-dark"},[t("h5",{class:"modal-title text-white"},"訂單細節"),t("button",{type:"button",class:"btn-close btn-close-white","data-bs-dismiss":"modal","aria-label":"Close"})],-1),W={class:"modal-body"},X={class:"row"},Y={class:"col-4"},Z=t("h3",null,"用戶資料",-1),$={class:"table"},tt={key:0},et=t("th",null,"姓名",-1),st=t("th",null,"Email",-1),ot=t("th",null,"電話",-1),nt=t("th",null,"地址",-1),lt={class:"col-8"},it=t("h3",null,"訂單細節",-1),dt={class:"table"},at=t("th",null,"訂單編號",-1),rt=t("th",null,"下單時間",-1),ct=t("th",null,"付款時間",-1),_t={key:0},ut={key:1,class:"text-muted"},ht=t("th",null,"付款狀態",-1),pt={key:0,class:"text-success"},mt={key:1,class:"text-muted"},bt=t("th",null,"總金額",-1),gt=t("h3",null,"選購商品",-1),yt={class:"table"},kt={class:"form-check d-flex justify-content-end"},ft={class:"form-check-label",for:"is_paid"},vt={key:0},Ot={key:1},xt={class:"modal-footer"},wt=t("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function Mt(d,i,a,c,s,_){const v=y("VueLoading"),O=y("PaginationComponent"),x=L("modal");return l(),n("div",P,[m(v,{active:s.isLoading},null,8,["active"]),T,t("table",R,[A,t("tbody",null,[(l(!0),n(u,null,h(s.orders,e=>(l(),n("tr",{key:e.id},[t("td",null,o(new Date(e.create_at*1e3).toLocaleDateString()),1),t("td",null,o(e.user.email),1),t("td",null,[t("ul",B,[(l(!0),n(u,null,h(e.products,r=>(l(),n("li",{key:r.id},o(r.product.title)+" "+o(r.qty)+" "+o(r.product.unit),1))),128))])]),t("td",null,o(e.total),1),t("td",null,[t("div",I,[b(t("input",{class:"form-check-input",type:"checkbox",role:"switch",id:`paidSwitch${e.id}`,checked:e.is_paid},null,8,U),[[x,e.is_paid]]),t("label",{class:"form-check-label",for:`paidSwitch${e.id}`},[e.is_paid?(l(),n("span",N,"已付款")):(l(),n("span",j,"未付款"))],8,H)])]),t("td",null,[t("div",q,[t("button",{type:"button",class:"btn btn-outline-primary",onClick:g(r=>_.openModal(e),["prevent"])}," 檢視 ",8,F),G])])]))),128))])]),m(O,{pagination:s.pagination,onGetProducts:_.getOrders},null,8,["pagination","onGetProducts"]),t("div",z,[t("div",J,[t("div",K,[Q,t("div",W,[t("div",X,[t("div",Y,[Z,t("table",$,[s.tempOrder.user?(l(),n("tbody",tt,[t("tr",null,[et,t("td",null,o(s.tempOrder.user.name),1)]),t("tr",null,[st,t("td",null,o(s.tempOrder.user.email),1)]),t("tr",null,[ot,t("td",null,o(s.tempOrder.user.tel),1)]),t("tr",null,[nt,t("td",null,o(s.tempOrder.user.address),1)])])):V("",!0)])]),t("div",lt,[it,t("table",dt,[t("tbody",null,[t("tr",null,[at,t("td",null,o(s.tempOrder.id),1)]),t("tr",null,[rt,t("td",null,o(new Date(s.tempOrder.create_at*1e3).toLocaleDateString()),1)]),t("tr",null,[ct,t("td",null,[s.tempOrder.paid_date?(l(),n("span",_t,o(new Date(s.tempOrder.paid_date*1e3).toLocaleDateString()),1)):(l(),n("span",ut,"尚未付款"))])]),t("tr",null,[ht,t("td",null,[s.tempOrder.is_paid?(l(),n("strong",pt,"已付款")):(l(),n("span",mt,"尚未付款"))])]),t("tr",null,[bt,t("td",null,o(s.tempOrder.total),1)])])]),gt,t("table",yt,[(l(!0),n(u,null,h(s.tempOrder.products,e=>(l(),n("tr",{key:e.id},[t("th",null,o(e.product.title),1),t("td",null,o(e.qty)+" / "+o(e.product.unit),1),t("td",null,o(e.total),1)]))),128))]),t("div",kt,[b(t("input",{class:"form-check-input me-1",type:"checkbox",value:"",id:"is_paid","onUpdate:modelValue":i[0]||(i[0]=e=>s.tempOrder.is_paid=e)},null,512),[[C,s.tempOrder.is_paid]]),t("label",ft,[s.tempOrder.is_paid?(l(),n("span",vt,"已付款")):(l(),n("span",Ot,"未付款"))])])])])]),t("div",xt,[wt,t("button",{type:"button",class:"btn btn-primary",onClick:i[1]||(i[1]=g(e=>_.updateOrder(s.tempOrder),["prevent"]))}," 修改付款狀態 ")])])])],512)])}const Ct=D(S,[["render",Mt]]);export{Ct as default};