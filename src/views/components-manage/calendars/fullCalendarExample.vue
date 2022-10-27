<template>
    <el-scrollbar @scroll="scroll" always>
        <div class="cal-container" id="cal-container">
            <div style="height:30px;">
                <div class="change-button" @click="changeView()"> 切换视图</div>
            </div>
            <el-popover popper-class="cal-popover" :virtual-ref="buttonRef" :visible="isVisible" :show-arrow="false"
                :popper-options="popperOptions" width="620px" virtual-triggering>
                <div id="dialogBox" class="dialog-contain-style dialogBox">
                    <div class="my-header">
                        <img class="dialong-button" :src="images.img1" @click="editDialong">
                        <img class="dialong-button" :src="images.img2">
                        <img class="dialong-button" :src="images.img3" @click="closeDialong">
                    </div>
                    <div class="item" v-for="(data, key) in dialongData" :key="key">
                        <div class="item-title">
                            {{ data.title }}
                        </div>
                        <div class="item-detail" v-if="typeof (data.detail) == 'string' && !isEdit">
                            {{ data.detail }}
                        </div>
                        <div class="item-detail" v-else-if="typeof (data.detail) == 'string' && isEdit">
                            <el-input v-model="data.detail" />
                        </div>
                        <div class="member" v-else>
                            <div class="member-item" v-for="(data2, key2) in data.detail" :key="key2">
                                <div class="member-photo" />
                                <div>{{ data2.name }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-popover>
            <el-button ref="buttonRef" style="height:0;visibility:hidden" />
            <div class="card" id="cal" />
            <div id="picker" style="visibility: hidden;">
                <el-date-picker class="click_date" v-model="pickedDate" type="date" placeholder="请选择日期"
                    @change="clickDate()" />
            </div>
        </div>
    </el-scrollbar>
</template>
<script setup lang="ts">

import '@fullcalendar/core/vdom'// 解决插件在顶级库前加载的报错
import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid';
import ResourceTimeLine from '@fullcalendar/resource-timeline'
import interactionPlugin from '@fullcalendar/interaction'

const buttonRef = ref()
let popperOptions = ref()
let isVisible = ref(false)
let pickedDate = ref()
let isEdit = ref(false)
let dateChooser: any //日期选择器
let calendar: any //日历的实例
let cal: any //日历的div
let scrollTop = 0
const images = {
    img1: new URL(`../../../assets/calendar-icon/edit.png`, import.meta.url).href,
    img2: new URL(`../../../assets/calendar-icon/delete.png`, import.meta.url).href,
    img3: new URL(`../../../assets/calendar-icon/close.png`, import.meta.url).href,
}
//事件
let events = [
    {
        id: '1',
        resourceId: '1',//对应资源id
        title: '50h 任务1',
        start: '2022-08-28',
        end: '2022-09-01',
        backgroundColor: "#216e394d",
        textColor: "#216e39"
    },
    {
        id: '2',
        resourceId: '2',
        title: '50h 任务2',
        start: '2022-09-04',
        end: '2022-09-07',
        backgroundColor: "#40c4634d",
        textColor: "#40c463"
    },
    {
        id: '3',
        resourceId: '3',
        title: '50h 任务3',
        start: '2022-09-11',
        end: '2022-09-16',
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
        end: '2022-10-11',
    },
    {
        id: '6',
        resourceId: '5',
        title: '0h 任务6 ',
        start: '2022-09-26',
        end: '2022-10-01',
        backgroundColor: "#40c4634d",
        textColor: "#40c463",
    },
    {
        id: '6',
        resourceId: '5',
        title: '0h 任务6 ',
        start: '2022-09-29',
        end: '2022-10-02',
        backgroundColor: "#40c4634d",
        textColor: "#40c463",
    },
    {
        id: '1',
        resourceId: '1',
        title: '0h 任务4',
        start: '2022-10-01',
        end: '2022-10-07',
        backgroundColor: "#ff3a3a4d",
        textColor: "#ff3a3a"
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
        id: '1',
        resourceId: '2',//对应资源id
        title: '50h 任务7',
        start: '2022-10-29',
        end: '2022-11-01',
        backgroundColor: "#216e394d",
        textColor: "#216e39"
    },
]
//左侧资源
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
    },
]
//弹窗数据
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
//获取日期是当月的第几周
const getMonthWeek = (a: any, b: any, c: any) => {
    var date = new Date(a, parseInt(b) - 1, c),
        w = date.getDay(),
        d = date.getDate();
    if (w == 0) {
        w = 7;
    }
    var config = {
        getMonth: date.getMonth() + 1,
        getYear: date.getFullYear(),
        getWeek: Math.ceil((d + 6 - w) / 7),
    }
    return config
}
//获取今天是当月的第几周
let todayDate = getMonthWeek(moment().format('YYYY'), moment().format('M'), moment().format('D'));
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

onMounted(() => {
    cal = document.getElementById('cal')
    calendar = new Calendar(cal, calOptions)
    calendar.render();
    //获取日期选择器
    dateChooser = document.getElementsByClassName("click_date")
    //获取标题的父节点
    let parent = document.querySelector(".fc-mtitleButton-button")?.parentNode
    //在标题父节点中增加日期选择器
    parent?.appendChild(dateChooser[0])
})
onBeforeUnmount(() => {
    document.removeEventListener('click', onClick, true)
})
onDeactivated(() => {
    document.removeEventListener('click', onClick, true)
})
//判断点击是否在弹窗内
const onClick = (event: any) => {
    if (event.target.closest(".cal-popover")) {
        // 点击弹窗内
        return

    } else {
        closeDialong()
        document.removeEventListener('click', onClick, true)
    }
}

//自定义按钮
let myButtons = {
    mPrevButton: {
        text: "< " + alaboToChinese(moment().add(-1, 'M').format("M")) + moment().format('月,YYYY'),
        click: function () {
            clickButton('month', 'prev')
        }
    },
    mNextButton: {
        text: alaboToChinese(moment().add(1, 'M').format("M")) + moment().format('月,YYYY') + " >",
        click: function () {
            clickButton('month', 'next')
        }
    },
    mtitleButton: {
        text: alaboToChinese(moment().format("M")) + moment().format('月,YYYY')
    },
    wPrevButton: {
        text: "< 上一周",
        click: function () {
            clickButton('week', 'prev')
        }
    },
    wNextButton: {
        text: "下一周 >",
        click: function () {
            clickButton('week', 'next')
        }
    },
    wtitleButton: {
        text: todayDate.getYear + "年" + alaboToChinese(todayDate.getMonth.toString()) + "月" + ",第" + alaboToChinese(todayDate.getWeek.toString()) + "周"
    }
}
//日历配置
let calOptions: any = {
    // dayMaxEventRows: 0,
    // eventMaxStack: 0,
    locale: 'zh-cn',
    initialView: 'dayGridMonth',//，默认月视图
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
        center: 'mtitleButton',
        right: 'mNextButton'
    },
    customButtons: myButtons,//自定义按钮
    schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',//隐藏版权提示
    //工作日，0-周日
    businessHours: {
        daysOfWeek: [1, 2, 3, 4, 5], // Monday - Friday
        startTime: '00:00:00',
        endTime: '24:00:00',
    },
    contentHeight: "auto",
    // aspectRatio: 2.4,//日历宽高比
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
        changeDaystyle(arg)
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
        img.innerHTML = '<div class="head_icon"/>'
        arg.el.children[0].children[0].appendChild(img)
    },
    //左侧资源列增加类名
    resourceLabelClassNames() {
        return ["isResource"]
    },
    //事件点击
    eventClick(arg: any) {
        clickEvent(arg)
    },
}
//日历中日期显示格式修改
const changeDaystyle = (arg: any) => {
    let date = moment(arg.date).format('DD')
    arg.dayNumberText = date//修改显示的日期格式
}
//事件点击
const clickEvent = (arg: any) => {
    document.addEventListener('click', onClick, true)
    isVisible.value = true
    //弹窗位置配置
    let eventPosition = arg.el.getBoundingClientRect()
    let x = arg.jsEvent.clientX
    let y = eventPosition.bottom - 168 + scrollTop
    let box = document.getElementById('cal-container')
    let boxY = box?.getBoundingClientRect().height
    if (boxY && y + 390 > boxY + scrollTop) {
        //如果弹窗超出日历高度+滚动高度的话，上移超出的高度
        y = y - (y + 390 - (boxY + scrollTop))
    }
    popperOptions.value = {
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [x, y],
                }
            }
        ]
    }

}
//切换视图按钮
const changeView = () => {
    closeDialong()
    //获取日期选择器
    dateChooser = document.getElementsByClassName("click_date")
    let picker = document.getElementById("picker")
    let year = moment().format('月,YYYY')
    picker?.appendChild(dateChooser[0])
    calendar.destroy();//销毁原来的日历
    pickedDate.value = ""
    calOptions.initialDate = moment().format('YYYY-MM-DD')
    //月视图换周视图
    if (calOptions.initialView == 'dayGridMonth') {
        calOptions.initialView = 'resourceTimelineWeek'
        calOptions.height = 'auto'//周视图需要设置高度为auto
        calOptions.headerToolbar.left = "wPrevButton"
        calOptions.headerToolbar.right = "wNextButton"
        calOptions.headerToolbar.center = "wtitleButton"
        calOptions.customButtons.wtitleButton.text = todayDate.getYear + "年" + alaboToChinese(todayDate.getMonth.toString()) + "月" + ",第" + alaboToChinese(todayDate.getWeek.toString()) + "周"
        calendar = new Calendar(cal, calOptions)
        calendar.render();//创建新视图的日历
        //获取标题的父节点
        let parent = document.querySelector(".fc-wtitleButton-button")?.parentNode
        //在标题父节点中增加日期选择器
        parent?.appendChild(dateChooser[0])
    }
    //周视图换月视图
    else {
        calOptions.initialView = 'dayGridMonth'
        calOptions.customButtons.mtitleButton.text = alaboToChinese(moment().format("M")) + year
        calOptions.customButtons.mNextButton.text = alaboToChinese(moment().add(1, 'M').format("M")) + year + " >"
        calOptions.customButtons.mPrevButton.text = "< " + alaboToChinese(moment().add(-1, 'M').format("M")) + year
        calOptions.headerToolbar.left = "mPrevButton"
        calOptions.headerToolbar.right = "mNextButton"
        calOptions.headerToolbar.center = "mtitleButton"
        delete calOptions.height//月视图不需要设置高度
        calendar = new Calendar(cal, calOptions)
        calendar.render();//创建新视图的日历
        //获取标题的父节点
        let parent = document.querySelector(".fc-mtitleButton-button")?.parentNode
        //在标题父节点中增加日期选择器
        parent?.appendChild(dateChooser[0])
    }
}
//日期选择框选择日期
const clickDate = () => {
    closeDialong()
    //获取日期选择器
    dateChooser = document.getElementsByClassName("click_date")
    let picker = document.getElementById("picker")
    picker?.appendChild(dateChooser[0])
    let calendarType = calendar.view.type
    let year = moment(pickedDate.value).format('月,YYYY')
    calendar.destroy();//销毁原来的日历
    calOptions.initialDate = moment(pickedDate.value).format('YYYY-MM-DD')
    calOptions.customButtons.mtitleButton.text = alaboToChinese(moment(pickedDate.value).format("M")) + year
    calOptions.customButtons.mNextButton.text = alaboToChinese(moment(pickedDate.value).add(1, 'M').format("M")) + year + " >"
    calOptions.customButtons.mPrevButton.text = "< " + alaboToChinese(moment(pickedDate.value).add(-1, 'M').format("M")) + year
    let date = getMonthWeek(moment(pickedDate.value).format("YYYY"), moment(pickedDate.value).format("M"), moment(pickedDate.value).format("D"))
    calOptions.customButtons.wtitleButton.text = date.getYear + "年" + alaboToChinese(date.getMonth.toString()) + "月" + ",第" + alaboToChinese(date.getWeek.toString()) + "周"
    calendar = new Calendar(cal, calOptions)
    calendar.render();//创建新的日历
    // pickedDate.value = ""
    if (calendarType == 'dayGridMonth') {
        //获取标题的父节点
        let parent = document.querySelector(".fc-mtitleButton-button")?.parentNode
        //在标题父节点中增加日期选择器
        parent?.appendChild(dateChooser[0])
    }
    else {
        //获取标题的父节点
        let parent = document.querySelector(".fc-wtitleButton-button")?.parentNode
        //在标题父节点中增加日期选择器
        parent?.appendChild(dateChooser[0])

    }
}
const editDialong = () => {
    isEdit.value = !isEdit.value
}
const closeDialong = () => {
    isVisible.value = false
}
const clickButton = (type: string, operation: string) => {
    closeDialong()
    //获取日期选择器
    dateChooser = document.getElementsByClassName("click_date")
    let picker = document.getElementById("picker")
    picker?.appendChild(dateChooser[0])
    calendar.destroy()
    let year = moment(calendar.currentData.currentDate).format("月,YYYY")
    pickedDate.value = ""//切换视图将日期选择器的时间清空
    //周视图按钮
    if (type == 'week') {
        let calNowDate = ""
        if (operation == 'prev') {
            calNowDate = moment(calendar.currentData.currentDate).add(-7, 'd').format('YYYY-MM-DD')
        }
        else {
            calNowDate = moment(calendar.currentData.currentDate).add(7, 'd').format('YYYY-MM-DD')
        }
        calOptions.initialDate = moment(calNowDate).format('YYYY-MM-DD')
        let date = getMonthWeek(moment(calNowDate).format("YYYY"), moment(calNowDate).format("M"), moment(calNowDate).format("D"))
        calOptions.customButtons.wtitleButton.text = date.getYear + "年" + alaboToChinese(date.getMonth.toString()) + "月" + ",第" + alaboToChinese(date.getWeek.toString()) + "周"
    }
    //月视图按钮
    else if (type == 'month') {
        if (operation == 'prev') {
            calOptions.initialDate = moment(calendar.currentData.currentDate).add(-1, 'M').format('YYYY-MM-DD')
            calOptions.customButtons.mNextButton.text = alaboToChinese(moment(calendar.currentData.currentDate).format("M")) + year + " >"
            calOptions.customButtons.mtitleButton.text = alaboToChinese(moment(calendar.currentData.currentDate).add(-1, 'M').format("M")) + year
            calOptions.customButtons.mPrevButton.text = "< " + alaboToChinese(moment(calendar.currentData.currentDate).add(-2, 'M').format("M")) + year
        }
        else {
            calOptions.initialDate = moment(calendar.currentData.currentDate).add(1, 'M').format('YYYY-MM-DD')
            calOptions.customButtons.mNextButton.text = alaboToChinese(moment(calendar.currentData.currentDate).add(2, 'M').format("M")) + year + " >"
            calOptions.customButtons.mtitleButton.text = alaboToChinese(moment(calendar.currentData.currentDate).add(1, 'M').format("M")) + year
            calOptions.customButtons.mPrevButton.text = "< " + alaboToChinese(moment(calendar.currentData.currentDate).format("M")) + year
        }
    }
    calendar = new Calendar(cal, calOptions)
    calendar.render();//创建新的日历
    if (type == 'month') {
        let parent = document.querySelector(".fc-mtitleButton-button")?.parentNode
        parent?.appendChild(dateChooser[0])
    } else {
        let parent = document.querySelector(".fc-wtitleButton-button")?.parentNode
        parent?.appendChild(dateChooser[0])
    }
}
let timer: any
//获取滚动高度
const scroll = (data: any) => {
    if (timer) {
        clearTimeout(timer)
    }
    timer = setTimeout(() => {
        scrollTop = data.scrollTop
    }, 100)
}
</script>

<style lang="scss" scoped>
.cal-container {
    font-family: Microsoft YaHei;
    // background-color: skyblue;
    height: 85vh;
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
        cursor: pointer;
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
    padding: 8px 21px;
    margin-bottom: 0px !important;
}

//周标题样式
:deep(.fc-col-header-cell-cushion) {
    font-size: 16px;
    font-family: Microsoft YaHei;
    color: #999999;
    font-weight: bolder;
    line-height: 46px;
    height: 46px;
    cursor: default;
}

//单元格日期样式
:deep(.fc-daygrid-day-number) {
    font-size: 16px;
    font-family: Microsoft YaHei;
    color: #999999;
    font-weight: bolder;
    margin: 8px;
    cursor: default;
}

:deep(.fc-timeline-slot-cushion) {
    cursor: default;
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
    border: 0px solid #dcdcdc80;
    border-left: 1px solid rgba(220, 220, 220, 0.5019607843);
    border-right: 1px solid rgba(220, 220, 220, 0.5019607843);
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
    height: 30px;
    margin-bottom: 9px;
    background: url(@/assets/calendar-icon/header.png) no-repeat;
    background-size: auto 100%;
}

:deep(.isResource) {
    background-color: white;
    min-height: 90px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

:deep(.fc-mtitleButton-button) {
    color: #000000 !important;
    cursor: default !important;
    font-size: 16px !important;
}

:deep(.fc-wtitleButton-button) {
    color: #000000 !important;
    cursor: default !important;
    font-size: 16px !important;
}

:deep(.fc-button) {
    padding: 0;
}

:deep(.fc-button-primary) {
    color: #999999 !important;
    font-weight: 600 !important;
    font-size: 14px !important;
    background-color: #2c3e5000 !important;
    border-color: #2c3e5000 !important;
}

:deep(.fc-button-primary:not(:disabled):active) {
    box-shadow: 0 0 0 0.2rem rgb(76 91 106 / 0%) !important;
}

:deep(.fc-button-primary:not(:disabled):hover) {
    background-color: #1e2b3700 !important;
    border-color: #1e2b3700 !important;
    color: #999999 !important;
    font-weight: 600 !important;
}

:deep(.fc .fc-button-primary:focus) {
    box-shadow: 0 0 0 0.2rem rgba(76, 77, 106, 0) !important;
    border-color: #1e2b3700 !important;
}

:deep(.fc-h-event) {
    display: flex !important;
}

:deep(.fc-theme-standard th) {
    min-height: 60px;
}

:deep(.fc-theme-standard td) {
    min-height: 90px;
}

:deep(.fc .fc-datagrid-header .fc-datagrid-cell-frame) {
    min-height: 50px !important;
}

:deep(.fc-datagrid-cell-frame) {
    display: flex;
    justify-content: center !important;
    min-height: 50px !important;
}

:deep(.fc-timeline-slot-frame) {
    min-height: 50px;
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

:deep(.fc-event-title) {
    padding-left: 10px;
}

:deep(.el-input__suffix-inner) {
    display: none;
}

:deep(.fc-daygrid-day-events) {
    min-height: 7em !important;
}

:deep(.popoverBox1) {
    position: absolute;
    z-index: 10;
    background-color: #ffffff;
    box-shadow: 0px 0px 20px 0px #bbbbbb;
}

:deep(.popoverBox2) {
    position: fixed;
    z-index: 10;
    background-color: #ffffff;
    box-shadow: 0px 0px 20px 0px #bbbbbb;
}

:deep(.fc-timeline-event-harness) {
    z-index: 9;
}

:deep(.fc-datagrid-cell-main) {
    font-size: 12px;
}
</style>
<style lang="scss">
.cal-popover {
    padding: 22px !important;

    .my-header {
        display: flex !important;
        justify-content: flex-end !important;
        padding-bottom: 15px !important;

        .dialong-button {
            width: 15px !important;
            margin-left: 36px !important;
            cursor: pointer;
        }
    }

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

        .member {
            display: flex;

            .member-item {
                display: flex;
                padding-right: 20px;

                .member-photo {
                    width: 20px;
                    height: 20px;
                    margin-right: 8px;
                    background: url(@/assets/calendar-icon/header.png) no-repeat;
                    background-size: auto 100%;
                }
            }
        }
    }
}
</style>