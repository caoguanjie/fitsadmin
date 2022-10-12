<template>
    <div class="cal-container-task">
        <div class="card" id="cal2" />
        <div id="picker" style="visibility: hidden;">
            <el-date-picker class="click_date" v-model="pickDate" type="date" placeholder="请选择日期"
                @change="changeDate()" />
        </div>
        <div id="dialogOuter" style="visibility:hidden;display: flex;height: 0px;">
            <div id="dialogBox" class="dialog-contain dialogBox">
                <div class="my-header">
                    <div>
                        <div class="title-week">{{dailongTitle.week}}</div>
                        <div class="title-date">{{dailongTitle.date}}</div>
                    </div>
                    <img class="dialong-button" src="/src/assets/calendar-icon/close.png" @click="closeDialong">
                </div>
                <div class="item" v-for="(data,key) in dialongData" :key="key">
                    <div class="item-title">
                        {{data.title}}
                    </div>
                    <div class="item-detail" v-if="typeof(data.detail) == 'string' && !isEdit">
                        {{data.detail}}
                    </div>
                    <div class="item-detail" v-else-if="typeof(data.detail) == 'string' && isEdit">
                        <el-input v-model="data.detail" />
                    </div>
                    <div class="member" v-else>
                        <div class="member-item" v-for="(data2,key2) in data.detail" :key="key2">
                            <img class="member-photo" :src=data2.src>
                            <div>{{data2.name}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

import '@fullcalendar/core/vdom'// 解决插件在顶级库前加载的报错
import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

let calendar: any
let cal2: any
//事件
let events = [
    {
        id: '1',
        resourceId: '1',//对应资源id
        title: '5h 任务1',
        start: '2022-09-28',
        end: '2022-09-28',
        backgroundColor: "rgb(200 212 249)",
        textColor: "#666666"
    },
    {
        id: '2',
        resourceId: '2',
        title: '5h 任务2',
        start: '2022-10-04',
        end: '2022-10-04',
        backgroundColor: "rgb(200 212 249)",
        textColor: "#666666"
    },
    {
        id: '3',
        resourceId: '3',
        title: '5h 任务3',
        start: '2022-10-10',
        end: '2022-10-10',
        backgroundColor: "rgb(200 212 249)",
        textColor: "#666666"
    },
    {
        id: '3',
        resourceId: '3',
        title: '5h 任务3-1',
        start: '2022-10-10',
        end: '2022-10-10',
        backgroundColor: "rgb(200 212 249)",
        textColor: "#666666"
    },
    {
        id: '3',
        resourceId: '3',
        title: '5h 任务3-2',
        start: '2022-10-10',
        end: '2022-10-10',
        backgroundColor: "rgb(200 212 249)",
        textColor: "#666666"
    },
    {
        id: '3',
        resourceId: '3',
        title: '5h 任务3-3',
        start: '2022-10-10',
        end: '2022-10-10',
        backgroundColor: "rgb(200 212 249)",
        textColor: "#666666"
    },
    {
        id: '4',
        resourceId: '4',
        title: '4h 休年假',
        start: '2022-10-20',
        end: '2022-10-20',
        backgroundColor: "rgba(255, 153, 0, 0.16)",
        textColor: "#999999",
    },
]
//弹窗数据
let dialongData = ref([
    {
        title: "工时",
        detail: "2h"
    },
    {
        title: "任务",
        detail: "任务内容任务内容任务内容任务内容任务内容任务内容任务内容任务内容"
    },
    {
        title: "工作内容",
        detail: "工作内容工作内容工作内容工作内容工作内容"
    }
])
//阿拉伯数字转中文数字
const alaboToChinese = (num: string) => {
    switch (num) {
        case '1':
            return '一';
        case '2':
            return '二';
        case '3':
            return '三';
        case '4':
            return '四';
        case '5':
            return '五';
        case '6':
            return '六';
        case '7':
            return '七';
        case '8':
            return '八';
        case '9':
            return '九';
        case '10':
            return '十';
        case '11':
            return '十一';
        case '12':
            return '十二';
    }
}
let pickDate = ref()
let isEdit = ref(false)
let dateChooser: any
let dailongTitle = ref({
    week: "",
    date: "",
})
let dialog: any
//日历配置
let calOptions: any = {
    locale: 'zh-cn',
    initialView: 'dayGridMonth',//，默认月视图
    initialDate: moment().format('YYYY-MM-DD'),//初始显示位置
    plugins: [
        dayGridPlugin,
        interactionPlugin,//用于检测dateClick等操作
    ],
    //头部按钮
    headerToolbar: {
        left: 'PrevButton',
        center: 'TitleButton',
        right: 'NextButton'
    },
    contentHeight: "auto",
    // aspectRatio: 1.7,
    //工作日，0-周日
    businessHours: {
        daysOfWeek: [1, 2, 3, 4, 5], // Monday - Friday
        startTime: '00:00:00',
        endTime: '24:00:00',
    },
    events: events,//事件源
    eventBorderColor: "#ffffff00",
    slotLabelInterval: { hours: 24 },//时间轴的时间间隔
    dayMaxEvents: 3,
    schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',//隐藏版权提示
    customButtons: {//自定义按钮
        PrevButton: {
            text: "< " + alaboToChinese(moment().add(-1, 'M').format("M")) + moment().format('月,YYYY'),
            click: function () {
                clickButton('prev')
            }
        },
        NextButton: {
            text: alaboToChinese(moment().add(1, 'M').format("M")) + moment().format('月,YYYY') + " >",
            click: function () {
                clickButton('next')
            }
        },
        TitleButton: {
            text: alaboToChinese(moment().format("M")) + moment().format('月,YYYY')
        },
    },
    //单元格增加classname
    dayCellClassNames(arg: any) {
        if (arg.isToday) {
            return ['isDate', 'isToday']
        } else {
            return ['isDate']
        }
    },
    //单元格内容注入
    dayCellContent(arg: any) {
        dayCellMount(arg)
    },
    //单元格渲染
    dayCellDidMount(arg: any) {
        mountDaycell(arg)
    },
    //事件点击
    eventClick(arg: any) {
        clickEvent(arg)
    },
    //更多事件渲染
    moreLinkContent(arg: any) {
        arg.text = "展开" + arg.num + "个工时"
    }
}

onMounted(() => {
    cal2 = document.getElementById('cal2')
    calendar = new Calendar(cal2, calOptions)
    calendar.render();
    //获取日期选择器
    let date_click = document.getElementsByClassName("click_date")
    //获取标题的父节点
    let parent = document.querySelector(".fc-TitleButton-button")?.parentNode
    //在标题父节点中追加节点
    parent?.appendChild(date_click[0])
})

//日历中日期显示格式修改
const dayCellMount = (arg: any) => {
    let date = moment(arg.date).format('DD')
    arg.dayNumberText = date//修改显示的日期格式
}

const changeDate = () => {
    //保存日期选择器
    saveDateChooser()
    let year = moment(pickDate.value).format('月,YYYY')
    calendar.destroy();//销毁原来的日历
    calOptions.initialDate = moment(pickDate.value).format('YYYY-MM-DD')
    calOptions.customButtons.TitleButton.text = alaboToChinese(moment(pickDate.value).format("M")) + year
    calOptions.customButtons.NextButton.text = alaboToChinese(moment(pickDate.value).add(1, 'M').format("M")) + year + " >"
    calOptions.customButtons.PrevButton.text = "< " + alaboToChinese(moment(pickDate.value).add(-1, 'M').format("M")) + year
    calendar = new Calendar(cal2, calOptions)
    calendar.render();//创建新的日历
    //获取标题的父节点
    let parent = document.querySelector(".fc-TitleButton-button")?.parentNode
    //在标题父节点中增加日期选择器
    parent?.appendChild(dateChooser[0])

}
const clickButton = (operation: string) => {
    //保存日期选择器
    saveDateChooser()
    calendar.destroy()
    let year = moment(calendar.currentData.currentDate).format("月,YYYY")
    pickDate.value = ""
    if (operation == 'prev') {
        calOptions.initialDate = moment(calendar.currentData.currentDate).add(-1, 'M').format('YYYY-MM-DD')
        calOptions.customButtons.NextButton.text = alaboToChinese(moment(calendar.currentData.currentDate).format("M")) + year + " >"
        calOptions.customButtons.TitleButton.text = alaboToChinese(moment(calendar.currentData.currentDate).add(-1, 'M').format("M")) + year
        calOptions.customButtons.PrevButton.text = "< " + alaboToChinese(moment(calendar.currentData.currentDate).add(-2, 'M').format("M")) + year
    }
    else {
        calOptions.initialDate = moment(calendar.currentData.currentDate).add(1, 'M').format('YYYY-MM-DD')
        calOptions.customButtons.NextButton.text = alaboToChinese(moment(calendar.currentData.currentDate).add(2, 'M').format("M")) + year + " >"
        calOptions.customButtons.TitleButton.text = alaboToChinese(moment(calendar.currentData.currentDate).add(1, 'M').format("M")) + year
        calOptions.customButtons.PrevButton.text = "< " + alaboToChinese(moment(calendar.currentData.currentDate).format("M")) + year
    }
    calendar = new Calendar(cal2, calOptions)
    calendar.render();//创建新的日历
    let parent = document.querySelector(".fc-TitleButton-button")?.parentNode
    parent?.appendChild(dateChooser[0])
}

//日期单元格渲染
const mountDaycell = (arg: any) => {
    let top = arg.el.children[0].children[0] //显示日期的div
    let vacation = "<div class='vacation'>休</div>"
    let lack = "<div class='lack'>缺</div>"
    let work = "<div class='work'>加</div>"
    //增加标签
    if (Number(moment(arg.date).format('DD')) == 6) {
        let content = "<div style='display:flex'>" + lack + "</div>"
        top.innerHTML += content
    }
    else if (Number(moment(arg.date).format('DD')) == 14) {
        let content = "<div style='display:flex'>" + work + "</div>"
        top.innerHTML += content
    }
    else if (Number(moment(arg.date).format('DD')) == 20) {
        let content = "<div style='display:flex'>" + vacation + "</div>"
        top.innerHTML += content
    }
    //增加未填写
    if (Number(moment(arg.date).format('DD')) == 2) {
        let content = '<div class="tipOutClass"><div class="tipClass">!' + '</div></div>'
        let inner = '<div class="tipboxClass">' + content + '</div>'
        let text = '<div class="tipTextClass">未填写</div>'
        let outter = '<div>' + inner + text + '</div>'
        arg.el.childNodes[0].children[1].innerHTML += outter
    }
}

//事件点击
const clickEvent = (arg: any) => {
}

//保存日期选择器
const saveDateChooser = () => {
    dateChooser = document.getElementsByClassName("click_date")
    let picker = document.getElementById("picker")
    picker?.appendChild(dateChooser[0])
}

</script>

<style lang="scss" scoped>
.cal-container-task {
    font-family: Microsoft YaHei;
    // background-color: skyblue;
    // height: 100vh;
    padding: 10px;
    position: relative;

    .my-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        padding: 20px;
        background-color: #c9d5fa;

        .dialong-button {
            margin-left: 22px;
            width: 16px;
            height: 16px;
            cursor: pointer;
        }

        .title-week {
            color: #666666;
        }

        .title-date {
            color: #666666;
            font-size: 25px;
            font-weight: 600;
        }
    }

}

//标题样式
:deep(.fc-toolbar-chunk) {
    display: flex;
    align-items: center;
}

:deep(.fc-toolbar-title) {
    font-size: 16px;
}

:deep(.fc-header-toolbar) {
    border: 2px solid rgba(220, 220, 220, 0.5019607843);
    border-bottom: 0px;
    padding: 20px 21px 11px 21px;
    margin-bottom: 0px !important;
}

//周标题样式
:deep(.fc-col-header-cell-cushion) {
    font-size: 16px;
    font-family: Microsoft YaHei;
    color: #999999;
    font-weight: bolder;
    line-height: 50px;
}

//单元格日期样式
:deep(.fc-daygrid-day-number) {
    font-size: 16px;
    font-family: Microsoft YaHei;
    color: #999999;
    font-weight: bolder;
    margin: 8px;
}

//灰色单元格样式
:deep(.fc-non-business) {
    background-color: #c8c8c85c
}

//边框
:deep(.fc-theme-standard td) {
    border: 1px solid #dcdcdc80;
}

//边框
:deep(.fc-theme-standard th) {
    border: 1px solid #dcdcdc80;
}

//修改今天单元格样式
:deep(.isToday .fc-daygrid-day-number) {
    color: white;
    background-color: #4c74ed;
    border-radius: 20px;
}

:deep(.isDate) {
    background-color: white !important;
}

:deep(.head_icon) {
    width: 30px;
}

:deep(.fc-TitleButton-button) {
    color: #000000 !important;
    font-size: 1.75em;
}

:deep(.fc-button) {
    padding: 0;
}

:deep(.fc-button-primary) {
    color: #999999;
    font-weight: 600;
    font-size: 16px;
    background-color: #2c3e5000;
    border-color: #2c3e5000;
}

:deep(.fc-button-primary:not(:disabled):active) {
    box-shadow: 0 0 0 0.2rem rgb(76 91 106 / 0%);
}

:deep(.fc-button-primary:not(:disabled):hover) {
    background-color: #1e2b3700;
    border-color: #1e2b3700;
    color: #999999;
    font-weight: 600;
}

:deep(.fc .fc-button-primary:focus) {
    box-shadow: 0 0 0 0.2rem rgba(76, 77, 106, 0) !important;
    border-color: #1e2b3700;
}

:deep(.fc-theme-standard th) {
    min-height: 60px;
}

:deep(.fc-theme-standard td) {
    min-height: 90px;
}

:deep(.fc .fc-datagrid-header .fc-datagrid-cell-frame) {
    min-height: 60px !important;
}

:deep(.fc-datagrid-cell-frame) {
    display: flex;
    justify-content: center !important;
    min-height: 60px !important;
}

:deep(th.fc-datagrid-cell) {
    background-color: white;
}

:deep(.fc .fc-datagrid-cell-cushion) {
    display: flex;
    align-items: center;
    justify-content: center !important;
    flex-direction: column-reverse;
}

:deep(.fc-event-title) {
    padding-left: 10px;
}

:deep(.el-input__suffix-inner) {
    display: none;
}

:deep(.fc-daygrid-day-top) {
    justify-content: space-between;
}

:deep(.fc-daygrid-day-events) {
    padding: 0 10px;
    min-height: 7em !important;
}

:deep(.fc-daygrid-day-bottom) {
    padding-top: 18px;
    color: #666666;
}

:deep(.fc-daygrid-event) {
    margin-top: 4px;
}

:deep(.vacation) {
    width: 30px;
    height: 30px;
    background-color: #ff9900;
    color: #ffffff;
    line-height: 30px;
    display: flex;
    justify-content: center;
}

:deep(.lack) {
    width: 30px;
    height: 30px;
    background-color: #ff3a3a;
    color: #ffffff;
    line-height: 30px;
    display: flex;
    justify-content: center;
}

:deep(.work) {
    width: 30px;
    height: 30px;
    background-color: #40c463;
    color: #ffffff;
    line-height: 30px;
    display: flex;
    justify-content: center;
}

:deep(.tipOutClass) {
    width: 1.5rem;
    height: 1.5rem;
    color: white;
    background-color: #fceeec;
    border-radius: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

:deep(.tipClass) {
    width: 1rem;
    height: 1rem;
    color: white;
    background-color: #eb8e82;
    border-radius: 1.5rem;
    display: flex;
    justify-content: center;
    line-height: 1rem;
}

:deep(.tipTextClass) {
    display: flex;
    justify-content: center;
    font-size: 12px;
    color: #7f7f7f;
    padding-top: 10px;
}

:deep(.tipboxClass) {
    display: flex;
    justify-content: center;
    box-sizing: content-box;
    padding-top: 15px;
}


:deep(.popoverBox) {
    position: absolute;
    z-index: 10;
    background-color: #ffffff;
    box-shadow: 0px 0px 20px 0px #bbbbbb;
}
</style>
<style lang="scss">
.cal-container-task {
    .dialog-contain {
        width: 350px;

        .item {
            display: flex;
            margin-bottom: 14px;
            padding: 0 20px;

            .item-title {
                width: 80px;
                margin-right: 24px;
                color: #999999;
            }

            .item-detail {
                width: 200px;
            }

            .member {
                display: flex;

                .member-item {
                    display: flex;
                    padding-right: 20px;

                    .member-photo {
                        width: 20px;
                        height: 20px;
                        margin-right: 8px;
                    }
                }
            }
        }
    }

}
</style>