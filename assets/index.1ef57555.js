var e=Object.defineProperty,a=(a,t,o)=>(((a,t,o)=>{t in a?e(a,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):a[t]=o})(a,"symbol"!=typeof t?t+"":t,o),o);import{b4 as t,k as o,a3 as s}from"./index.0ea97641.js";import{F as n,Z as u,a1 as r,c as l,l as i,m,O as c,U as p,u as d,S as g,p as f,W as x,ak as I,L as C,P as G,ah as D,Q as v,V as N,ax as h,ay as b}from"./vxetable.5e2aec1d.js";import{F as L}from"./FitsCard.c1d99023.js";import"./echarts.d8b3161e.js";class S{constructor({headers:e,ajax:t,groupConditions:o,expandGroupsNum:s,requestGroupNums:n}){a(this,"headers"),a(this,"ajax"),a(this,"groupConditions"),a(this,"expandGroupsNum"),a(this,"requestGroupNums"),this.headers=null!=e?e:[],this.ajax=t,this.groupConditions=null!=o?o:{conditions:[]},this.expandGroupsNum=null!=s?s:3,this.requestGroupNums=null!=n?n:4}}const A={class:"base-group-table"},E=n({name:"QualityControl"});var y=o(n({...E,setup(e){const a=u({config:new S({headers:[{title:"年龄",field:"age"},{title:"性别",field:"sex"},{title:"姓名",field:"name"}],ajax:{query:({form:e,page:a,cancelToken:t,isLoading:o,httpType:s})=>{let n=[],u=[],r=0;return new Promise((a=>{"All"===s&&(""===e.GroupCondition?(u=[{age:"18",sex:"男",name:"张三"},{age:"60",sex:"女",name:"李四"},{age:"99",sex:"男",name:"马五"}],r=3):"sex"===e.GroupCondition?(n=[{ID:"1",NAME:"男",DataSource:{ItemCount:2,GroupList:[{age:"18",sex:"男",name:"张三"},{age:"99",sex:"男",name:"马五"}]}},{ID:"2",NAME:"女",DataSource:{ItemCount:1,GroupList:[{age:"60",sex:"女",name:"李四"}]}}],r=2):(n=[{ID:"1",NAME:"18",DataSource:{ItemCount:2,GroupList:[{age:"18",sex:"男",name:"张三"},{age:"18",sex:"男",name:"张三2"}]}},{ID:"2",NAME:"20",DataSource:{ItemCount:1,GroupList:[{age:"20",sex:"女",name:"李四"}]}},{ID:"3",NAME:"60",DataSource:{ItemCount:1,GroupList:[{age:"60",sex:"女",name:"李四22"}]}}],r=3),a({result:{GroupTable:n,ItemCount:r,TableList:u}}))}))}},groupConditions:{defaultChecked:"age",conditions:[{name:"按年龄",value:"age"},{name:"按性别",value:"sex"}]}})}),{config:o}=r(a),s=l();return(e,a)=>(i(),m("div",A,[c(" 现在这里没用到自定义列，到时候想和框架的查询兼容，还需要等到时候修改 "),p(d(t),{ref_key:"table",ref:s,config:d(o)},null,8,["config"])]))}}),[["__scopeId","data-v-2a1c84de"]]);const M={class:"base-group-table"},T=n({name:"QualityControl"});var k=o(n({...T,setup(e){const a=u({config:new S({headers:[{title:"年龄",field:"age"},{title:"性别",field:"sex"},{title:"姓名",field:"name"}],ajax:{query:({form:e,page:a,cancelToken:t,isLoading:o,httpType:s})=>{let n=[],u=[],r=0;return new Promise((a=>{if("All"===s)""===e.GroupCondition?(u=[{age:"18",sex:"男",name:"张三"},{age:"60",sex:"女",name:"李四"},{age:"99",sex:"男",name:"马五"}],r=3):"sex"===e.GroupCondition?(n=[{ID:"1",NAME:"男",DataSource:{ItemCount:2,GroupList:[{age:"18",sex:"男",name:"张三"},{age:"99",sex:"男",name:"马五"}]}},{ID:"2",NAME:"女",DataSource:{ItemCount:1,GroupList:[{age:"60",sex:"女",name:"李四"}]}}],r=2):(n=[{ID:"1",NAME:"18",DataSource:{ItemCount:2,GroupList:[{age:"18",sex:"男",name:"张三"},{age:"18",sex:"男",name:"张三2"}]}},{ID:"2",NAME:"10",DataSource:{ItemCount:1,GroupList:[]}},{ID:"3",NAME:"20",DataSource:{ItemCount:1,GroupList:[]}},{ID:"4",NAME:"30",DataSource:{ItemCount:1,GroupList:[]}},{ID:"5",NAME:"40",DataSource:{ItemCount:1,GroupList:[]}}],r=5),a({result:{GroupTable:n,ItemCount:r,TableList:u}});else if("Fragment"===s){(e.GroupValue.split(",")||[]).forEach(((e,a)=>{n.push({ID:e,NAME:"",DataSource:{ItemCount:0,GroupList:[{age:a+1+"0",sex:"男",name:"张三12"+a}]}})})),setTimeout((()=>{a({result:{GroupTable:n,ItemCount:r,TableList:u}})}),3e3)}}))}},groupConditions:{defaultChecked:"age",conditions:[{name:"按年龄",value:"age"},{name:"按性别",value:"sex"}]},expandGroupsNum:1})}),{config:o}=r(a),s=l();return(e,a)=>(i(),m("div",M,[c(" 现在这里没用到自定义列，到时候想和框架的查询兼容，还需要等到时候修改 "),p(d(t),{ref_key:"table",ref:s,config:d(o)},null,8,["config"])]))}}),[["__scopeId","data-v-b5e3114c"]]);const _={class:"base-group-table"},j=n({name:"QualityControl"});var w=o(n({...j,setup(e){const a=u({config:new S({headers:[{title:"年龄",field:"age"},{title:"性别",field:"sex"},{title:"姓名",field:"name"}],ajax:{query:({form:e,page:a,cancelToken:t,isLoading:o,httpType:s})=>{let n=[],u=[],r=0;return new Promise((a=>{if("All"===s)""===e.GroupCondition?(u=[{age:"18",sex:"男",name:"张三"},{age:"60",sex:"女",name:"李四"},{age:"99",sex:"男",name:"马五"}],r=3):"sex"===e.GroupCondition?(n=[{ID:"1",NAME:"男",DataSource:{ItemCount:2,GroupList:[{age:"18",sex:"男",name:"张三"},{age:"99",sex:"男",name:"马五"}]}},{ID:"2",NAME:"女",DataSource:{ItemCount:1,GroupList:[{age:"60",sex:"女",name:"李四"}]}}],r=2):(n=[{ID:"1",NAME:"18",DataSource:{ItemCount:2,GroupList:[{age:"18",sex:"男",name:"张三"},{age:"18",sex:"男",name:"张三2"}]}},{ID:"2",NAME:"10",DataSource:{ItemCount:1,GroupList:[]}},{ID:"3",NAME:"20",DataSource:{ItemCount:1,GroupList:[]}},{ID:"4",NAME:"30",DataSource:{ItemCount:1,GroupList:[]}},{ID:"5",NAME:"40",DataSource:{ItemCount:1,GroupList:[]}}],r=5),a({result:{GroupTable:n,ItemCount:r,TableList:u}});else if("Fragment"===s){(e.GroupValue.split(",")||[]).forEach(((e,a)=>{n.push({ID:e,NAME:"",DataSource:{ItemCount:0,GroupList:[{age:a+1+"0",sex:"男",name:"张三12"+a}]}})})),setTimeout((()=>{a({result:{GroupTable:n,ItemCount:r,TableList:u}})}),3e3)}}))}},groupConditions:{defaultChecked:"age",conditions:[{name:"按年龄",value:"age"},{name:"按性别",value:"sex"}]},expandGroupsNum:1,requestGroupNums:2})}),{config:o}=r(a),s=l();return(e,a)=>(i(),m("div",_,[c(" 现在这里没用到自定义列，到时候想和框架的查询兼容，还需要等到时候修改 "),p(d(t),{ref_key:"table",ref:s,config:d(o)},null,8,["config"])]))}}),[["__scopeId","data-v-79ecfda5"]]);const q={class:"base-group-table"},P=n({name:"QualityControl"});var F=o(n({...P,setup(e){const a=u({config:new S({headers:[{title:"年龄",field:"age"},{title:"性别",field:"sex"},{title:"姓名",field:"name"}],ajax:{query:({form:e,page:a,cancelToken:t,isLoading:o,httpType:s})=>{let n=[],u=[],r=0;return new Promise((a=>{"All"===s&&(""===e.GroupCondition?(u=[{age:"18",sex:"男",name:"张三"},{age:"60",sex:"女",name:"李四"},{age:"99",sex:"男",name:"马五"}],r=3):"sex"===e.GroupCondition?(n=[{ID:"1",NAME:"男",DataSource:{ItemCount:2,GroupList:[{age:"18",sex:"男",name:"张三"},{age:"99",sex:"男",name:"马五"}]}},{ID:"2",NAME:"女",DataSource:{ItemCount:1,GroupList:[{age:"60",sex:"女",name:"李四"}]}}],r=2):(n=[{ID:"1",NAME:"18",DataSource:{ItemCount:2,GroupList:[{age:"18",sex:"男",name:"张三"},{age:"18",sex:"男",name:"张三2"}]}},{ID:"2",NAME:"20",DataSource:{ItemCount:1,GroupList:[{age:"20",sex:"女",name:"李四"}]}},{ID:"3",NAME:"60",DataSource:{ItemCount:1,GroupList:[{age:"60",sex:"女",name:"李四22"}]}}],r=3),a({result:{GroupTable:n,ItemCount:r,TableList:u}}))}))}},groupConditions:{defaultChecked:"age",conditions:[{name:"按年龄",value:"age"},{name:"按性别",value:"sex"}]}})}),{config:o}=r(a),s=l();return(e,a)=>(i(),m("div",q,[c(" 现在这里没用到自定义列，到时候想和框架的查询兼容，还需要等到时候修改 "),p(d(t),{ref_key:"table",ref:s,config:d(o)},{age:g((e=>[f("div",null,x(e.row.age)+"岁",1)])),_:1},8,["config"])]))}}),[["__scopeId","data-v-2d820dfe"]]);const Q={class:"group-table-example"},V={class:"content"},B={class:"right"},O={class:"menu"},U=(e=>(h("data-v-4617376a"),e=e(),b(),e))((()=>f("div",{class:"menu-title"},"此页内容",-1))),W=["id","onClick"],Z=n({name:"GroupTable"});var z=o(n({...Z,setup(e){const a=l([]),t=u({num:0});let o=0;const n={callback:function(e){a.value=e},selectors:["h1","h2"],exceptSelector:"[un-nav]",listenScroll:!0};const r=e=>{if(null!==o)c(o);else if(null===o)for(let o=0;o<a.value.length;o++){let s=document.getElementById("menuItem"+o);a.value[o].pos.top<=e.scrollTop+a.value[0].pos.top&&s&&(t.num=o)}},c=e=>{for(let t=0;t<a.value.length;t++){let a=document.getElementById("menuItem"+t);e!==t&&a&&(a.className="defaultStyle")}setTimeout((()=>{o=null}),100)};return(e,u)=>{const l=s,d=I("outline");return i(),m("div",Q,[p(l,{class:"left",onScroll:r,always:""},{default:g((()=>[C((i(),m("div",V,[p(L,{title:"基础分组表格",desc:"传入headers属性声明列配置。然后传入ajax.query属性，通过promise的形式返回组件表格的数据，传入result属性中即可。groupConditions属性（分组条件）可传可不传，defaultChecked属性表示默认选中哪个分组。"},{default:g((()=>[p(y)])),_:1}),p(L,{title:"插槽分组表格",desc:"可通过插槽去重写表格单元格的内容（插槽名是字段名），另外还提供了额外的插槽：query表格查询条件插槽、noData暂无数据插槽、right组头右侧插槽、groupName组名插槽、expand展开行插槽。"},{default:g((()=>[p(F)])),_:1}),p(L,{title:"默认展开分组表格",desc:"通过设置expandGroupsNum属性表示默认展开多少个分组，默认展开的分组第一次请求时会返回表格数据，其余分组表格的数据通过分段请求返回（会在组头开启loading图标）。但expandGroupsNum属性的值必须大于1（后端规定的）。"},{default:g((()=>[p(k)])),_:1}),p(L,{title:"分段请求分组表格",desc:"如果当前页的分组表格个数大于默认展开分组表格的个数，剩余的分组表格会开启分段请求（会在组头开启loading图标）。可以通过requestGroupNums属性设置多少个表格为一组去分段请求。"},{default:g((()=>[p(w)])),_:1})])),[[d,n]])])),_:1}),f("div",B,[f("div",O,[U,(i(!0),m(G,null,D(a.value,((e,a)=>(i(),m("div",{class:v([{active:t.num===a},"defaultStyle"]),key:a,id:"menuItem"+a,onClick:N((s=>function(e,a){o=a,t.num=a,e.scrollIntoView({block:"start",inline:"nearest"}),c(o)}(e.el,a)),["stop"])},x(e.title),11,W)))),128))])])])}}}),[["__scopeId","data-v-4617376a"]]);export{z as default};
