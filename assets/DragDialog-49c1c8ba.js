import{V as a,y as l}from"./index-ca93fc99.js";import{E as s,a as i,J as e,l as t,m as o,O as r,R as d,V as n,u,p as v}from"./vxetable-dc6e1f3b.js";import"./echarts-e0cca795.js";const p={class:"drag-dialog"},m=v("div",null,"我是拖拽弹窗",-1),g=v("div",null,"我是拖拽弹窗",-1),c=v("div",null,"我是拖拽弹窗",-1),b=v("div",null,"我是拖拽弹窗",-1),f=v("div",null,"我是拖拽弹窗",-1),_=s({__name:"DragDialog",setup(s){const v=i(!1),_=e({title:"拖拽弹窗",width:"30%",draggable:!0});return(s,i)=>{const e=l;return t(),o("div",p,[r(e,{onClick:i[0]||(i[0]=a=>v.value=!0),type:"primary"},{default:d((()=>[n(" 打开弹窗 ")])),_:1}),r(u(a),{visible:u(v),dialogProp:u(_),onCancel:i[1]||(i[1]=a=>v.value=!1),onSubmit:i[2]||(i[2]=a=>v.value=!1)},{default:d((()=>[m,g,c,b,f])),_:1},8,["visible","dialogProp"])])}}});export{_ as default};