<template>
    <div class="cal-container">
        <div style="height:30px;">
            <div class="change-button" @click="changeVis()"> 切换视图</div>
        </div>
        <div class="card" id="cal" />
        <el-dialog v-model="dialogTableVisible" :show-close="false">
            <template #header="{ close }">
                <div class="my-header">
                    <img class="dialong-button" src="/src/assets/calendar-icon/edit.png" @click="edit">
                    <img class="dialong-button" src="/src/assets/calendar-icon/delete.png">
                    <img class="dialong-button" src="/src/assets/calendar-icon/close.png" @click="close">
                </div>
            </template>
            <div class="dialog-contain">
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
                    <div class="number" v-else>
                        <div class="number-item" v-for="(data2,key2) in data.detail" :key="key2">
                            <img class="number-photo" :src=data2.src>
                            <div>{{data2.name}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </el-dialog>
        <div id="picker" style="visibility: hidden;">
            <el-date-picker class="click_date" v-model="pickDate" type="date" placeholder="请选择日期"
                @change="dateChanage()" />
        </div>
    </div>
</template>
<script setup lang="ts">
import '@fullcalendar/core/vdom'// 解决插件在顶级库前加载的报错
import { Calendar, CalendarRoot } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid';
import ResourceTimeLine from '@fullcalendar/resource-timeline'
import interactionPlugin from '@fullcalendar/interaction'

let gridData = ref("空")
let dialogTableVisible = ref(false)
let calendar: any
let events = [
    {
        id: '1',
        resourceId: '1',//对应资源id
        title: '50h 任务1',
        start: '2022-08-28',
        end: '2022-09-15',
        backgroundColor: "#216e394d",
        textColor: "#216e39"
    },
    {
        id: '2',
        resourceId: '2',
        title: '50h 任务2',
        start: '2022-09-04',
        end: '2022-09-20',
        backgroundColor: "#40c4634d",
        textColor: "#40c463"
    },
    {
        id: '3',
        resourceId: '3',
        title: '50h 任务3',
        start: '2022-09-11',
        end: '2022-09-25',
        backgroundColor: "#ff3a3a4d",
        textColor: "#ff3a3a"
    },
    {
        id: '4',
        resourceId: '4',
        title: '0h 任务4',
        start: '2022-09-20',
        end: '2022-09-24',
        backgroundColor: "#40c4634d",
        textColor: "#40c463",
    },
    {
        id: '5',
        resourceId: '5',
        title: '50h 任务5 ',
        start: '2022-10-7',
        end: '2022-10-20',
    },
    {
        id: '6',
        resourceId: '5',
        title: '0h 任务6 ',
        start: '2022-09-26',
        end: '2022-10-5',
        backgroundColor: "#40c4634d",
        textColor: "#40c463",
    },
    {
        id: '6',
        resourceId: '5',
        title: '0h 任务6 ',
        start: '2022-09-29',
        end: '2022-10-15',
        backgroundColor: "#40c4634d",
        textColor: "#40c463",
    },
    {
        id: '6',
        resourceId: '5',
        title: '任务6 ',
        start: '50h 2022-09-26',
        end: '2022-09-30',
        backgroundColor: "#40c4634d",
        textColor: "#40c463",
    },
    {
        id: '6',
        resourceId: '5',
        title: '0h 任务6 ',
        start: '2022-09-26',
        end: '2022-09-30',
        backgroundColor: "#40c4634d",
        textColor: "#40c463",
    },
    {
        id: '1',
        resourceId: '1',
        title: '0h 任务4',
        start: '2022-10-01',
        end: '2022-10-20',
        backgroundColor: "#ff3a3a4d",
        textColor: "#ff3a3a"
    },
    {
        id: '1',
        resourceId: '2',//对应资源id
        title: '50h 任务7',
        start: '2022-10-9',
        end: '2022-09-15',
        backgroundColor: "#216e394d",
        textColor: "#216e39"
    },
]
let resources = [
    {
        id: '1',
        groupId: '1',
        name: '王民琦'
    },
    {
        id: '2',
        groupId: '2',
        name: '孙宏坤'
    },
    {
        id: '5',
        groupId: '5',
        name: '赵宵蕙'
    }
]
let dialongData = ref([
    {
        title: "所属项目",
        detail: "项目名称项目名称项目名称项目名称项目名称项目名称项目名称项目名称项目名"
    },
    {
        title: "任务内容",
        detail: "任务内容任务内容任务内容任务内容任务内容任务内容任务内容任务内容"
    },
    {
        title: "所属批次",
        detail: "批次名称"
    },
    {
        title: "责任人",
        detail: [
            {
                name: "冯玉杰",
                src: "/src/assets/calendar-icon/header.png"
            },
            {
                name: "赵林",
                src: "/src/assets/calendar-icon/header.png"
            },
        ],
    },
    {
        title: "计划时间",
        detail: "2022-06-22 ~ 2022-07-01"
    },
    {
        title: "实际时间",
        detail: "2022-06-22 ~ 2022-07-01"
    },
    {
        title: "任务状态",
        detail: "进行中"
    },
])
let initialView = 'dayGridMonth'
let dateOpt = {
    key: 1
}
let pickDate = ref()
let isEdit = ref(false)
let datePick: any
let calOptions: any = {
    locale: 'zh-cn',
    initialView: initialView,//，默认月视图
    initialDate: moment().format('YYYY-MM-DD'),//初始显示位置
    // initialView: 'resourceTimelineWeek',//资源视图
    plugins: [
        dayGridPlugin,
        ResourceTimeLine,
        interactionPlugin,//用于检测dateClick等操作
    ],
    //头部按钮
    headerToolbar: {
        left: 'mPrevButton',
        center: 'titleButton',
        right: 'mNextButton'
    },
    buttonText: {
        prev: "< 上一周",
        next: "下一周 >",
    },
    schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',//隐藏版权提示
    customButtons: {
        mPrevButton: {
            text: "< " + moment().add(-1, 'M').format("M月,YYYY"),
            click: function () {
                //获取到日期选择器的dom
                datePick = document.getElementsByClassName("click_date")
                let picker = document.getElementById("picker")
                picker?.appendChild(datePick[0])
                calendar.destroy()
                calOptions.initialDate = moment(calendar.currentData.currentDate).add(-1, 'M').format('YYYY-MM-DD')
                calOptions.customButtons.titleButton.text = moment(calendar.currentData.currentDate).add(-1, 'M').format("M月,YYYY")
                calOptions.customButtons.mNextButton.text = moment(calendar.currentData.currentDate).format("M月,YYYY") + " >"
                calOptions.customButtons.mPrevButton.text = "< " + moment(calendar.currentData.currentDate).add(-2, 'M').format("M月,YYYY")
                let cal: any = document.getElementById('cal')
                calendar = new Calendar(cal, calOptions)
                calendar.render();//创建新的日历
                //获取标题的父节点
                let parent = document.querySelector(".fc-titleButton-button")?.parentNode
                //在标题父节点中追加节点
                parent?.appendChild(datePick[0])
            }
        },
        mNextButton: {
            text: moment().add(1, 'M').format("M月,YYYY") + ">",
            click: function () {
                //获取到日期选择器的dom
                datePick = document.getElementsByClassName("click_date")
                let picker = document.getElementById("picker")
                picker?.appendChild(datePick[0])
                calendar.destroy()
                calOptions.initialDate = moment(calendar.currentData.currentDate).add(1, 'M').format('YYYY-MM-DD')
                calOptions.customButtons.titleButton.text = moment(calendar.currentData.currentDate).add(1, 'M').format("M月,YYYY")
                calOptions.customButtons.mNextButton.text = moment(calendar.currentData.currentDate).add(2, 'M').format("M月,YYYY") + " >"
                calOptions.customButtons.mPrevButton.text = "< " + moment(calendar.currentData.currentDate).format("M月,YYYY")
                let cal: any = document.getElementById('cal')
                calendar = new Calendar(cal, calOptions)
                calendar.render();//创建新的日历
                //获取标题的父节点
                let parent = document.querySelector(".fc-titleButton-button")?.parentNode
                //在标题父节点中追加节点
                parent?.appendChild(datePick[0])
            }
        },
        wPrevButton: {
            text: "< 上一周",
            click: function () {
                calendar.prev()
            }
        },
        wNextButton: {
            text: "下一周 >",
            click: function () {
                calendar.next()
            }
        },
        titleButton: {
            text: moment().format("M月,YYYY")
        }
    },
    //工作日，0-周日
    businessHours: {
        daysOfWeek: [1, 2, 3, 4, 5], // Monday - Friday
        startTime: '00:00:00',
        endTime: '24:00:00',
    },
    aspectRatio: 2.4,//日历宽高比
    events: events,//事件源
    resources: resources,//左侧资源
    eventTextColor: '#4c74ed',
    eventBackgroundColor: '#4c74ed4d',
    eventBorderColor: "#ffffff00",
    slotLabelInterval: { hours: 24 },//时间轴的时间间隔
    resourceAreaWidth: '100px',//左侧资源列宽度
    // firstDay: 1,//每周的起始天，0周日，1周一
    //周视图列标题显示的内容
    slotLabelFormat: [
        { weekday: 'short' },
    ],
    //左侧资源列配置
    resourceAreaColumns: [
        {
            field: 'name',//资源列显示resources中的哪个变量
            headerContent: ''//标题内容
        }
    ],
    //单元格渲染函数
    dayCellContent(arg: any) {
        dayCellMount(arg)
    },
    //单元格增加classname
    dayCellClassNames(arg: any) {
        if (arg.isToday) {
            return ['isDate', 'isToday']
        } else {
            return ['isDate']
        }
    },
    //左侧资源渲染函数
    resourceLabelDidMount(arg: any) {
        let img = document.createElement('div')
        img.innerHTML = '<img class="head_icon" src="/src/assets/calendar-icon/header.png"></img>'
        arg.el.children[0].children[0].appendChild(img)
    },
    //左侧资源列增加类名
    resourceLabelClassNames(arg: any) {
        return ["isResource"]
    },
    //事件点击
    eventClick(arg: any) {
        dialogTableVisible.value = true
        gridData.value = arg.event.title
    },
    dateClick(arg: any) {
        dialogTableVisible.value = true
        gridData.value = arg.dateStr
    }
}
onMounted(() => {
    let cal: any = document.getElementById('cal')
    calendar = new Calendar(cal, calOptions)
    calendar.render();
    //获取到日期选择器的dom
    let date_click = document.getElementsByClassName("click_date")
    //获取标题的父节点
    let parent = document.querySelector(".fc-titleButton-button")?.parentNode
    //在标题父节点中追加节点
    parent?.appendChild(date_click[0])
})

const dayCellMount = (arg: any) => {
    let date = moment(arg.date).format('DD')
    arg.dayNumberText = date//修改显示的日期格式
}
//切换视图按钮
const changeVis = () => {
    //获取到日期选择器的dom
    datePick = document.getElementsByClassName("click_date")
    let picker = document.getElementById("picker")
    picker?.appendChild(datePick[0])
    calendar.destroy();//销毁原来的日历
    calOptions.initialDate = moment().format('YYYY-MM-DD')
    if (calOptions.initialView !== 'resourceTimelineWeek') {
        calOptions.initialView = 'resourceTimelineWeek'
        calOptions.height = 'auto'//周视图需要设置高度为auto
        calOptions.headerToolbar.left = "wPrevButton"
        calOptions.headerToolbar.right = "wNextButton"
        calOptions.headerToolbar.center = "title"
        let cal: any = document.getElementById('cal')
        calendar = new Calendar(cal, calOptions)
        calendar.render();//创建新视图的日历
    } else {
        calOptions.customButtons.titleButton.text = moment().format("M月,YYYY")
        calOptions.customButtons.mNextButton.text = moment().add(1, 'M').format("M月,YYYY") + " >"
        calOptions.customButtons.mPrevButton.text = "< " + moment().add(-1, 'M').format("M月,YYYY")
        calOptions.headerToolbar.left = "mPrevButton"
        calOptions.headerToolbar.right = "mNextButton"
        calOptions.headerToolbar.center = "titleButton"
        calOptions.initialView = 'dayGridMonth'
        delete calOptions.height//月视图不需要设置高度
        let cal: any = document.getElementById('cal')
        calendar = new Calendar(cal, calOptions)
        calendar.render();//创建新视图的日历
        //获取标题的父节点
        let parent = document.querySelector(".fc-titleButton-button")?.parentNode
        //在标题父节点中增加日期选择器
        parent?.appendChild(datePick[0])
    }
}

const dateChanage = () => {
    //获取到日期选择器的dom
    datePick = document.getElementsByClassName("click_date")
    let picker = document.getElementById("picker")
    picker?.appendChild(datePick[0])
    dateOpt.key = 1
    calendar.destroy();//销毁原来的日历
    calOptions.initialDate = moment(pickDate.value).format('YYYY-MM-DD')
    calOptions.customButtons.titleButton.text = moment(pickDate.value).format("M月,YYYY")
    calOptions.customButtons.mNextButton.text = moment(pickDate.value).add(1, 'M').format("M月,YYYY年") + " >"
    calOptions.customButtons.mPrevButton.text = "< " + moment(pickDate.value).add(-1, 'M').format("M月,YYYY年")
    let cal: any = document.getElementById('cal')
    calendar = new Calendar(cal, calOptions)
    calendar.render();//创建新的日历
    pickDate.value = ""
    //获取标题的父节点
    let parent = document.querySelector(".fc-titleButton-button")?.parentNode
    //在标题父节点中增加日期选择器
    parent?.appendChild(datePick[0])
}

const edit = () => {
    isEdit.value = !isEdit.value
}

</script>

<style lang="scss" scoped>
.cal-container {
    font-family: Microsoft YaHei;
    // background-color: skyblue;
    // height: 100vh;
    padding: 10px;
    position: relative;

    .change-button {
        padding: 0 27px;
        background-color: rgba(76, 116, 237, 0.8);
        border-radius: 2px;
        position: absolute;
        right: 10px;
        top: 10px;
        line-height: 26px;
        color: #ffffff;
    }

    .my-header {
        display: flex;
        justify-content: end;

        .dialong-button {
            margin-left: 22px;
            width: 16px;
            height: 16px;
        }
    }

    .dialog-contain {
        .item {
            display: flex;
            margin-bottom: 14px;

            .item-title {
                width: 70px;
                margin-right: 24px;
                color: #999999;
            }

            .item-detail {
                flex-grow: 1;
            }

            .number {
                display: flex;

                .number-item {
                    display: flex;
                    padding-right: 20px;

                    .number-photo {
                        width: 20px;
                        height: 20px;
                        margin-right: 8px;
                    }
                }
            }
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
    min-height: 60px !important;
}

:deep(.head_icon) {
    width: 30px;
}

:deep(.isResource) {
    background-color: white;
    min-height: 90px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

:deep(.fc-titleButton-button) {
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

:deep(.fc-timeline-slot-frame) {
    min-height: 60px;
    justify-content: center !important;
    font-family: Microsoft YaHei;
    font-size: 16px;
    color: #999999;
    font-weight: bolder;
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


:deep(.fc .fc-timeline-lane-frame) {
    min-height: 90px !important;
}

:deep(.fc-day-today .fc-timeline-slot-frame) {
    color: #4c74ed;
}
</style>