<template>
    <div class="base-group-table">
        <!-- 现在这里没用到自定义列，到时候想和框架的查询兼容，还需要等到时候修改 -->
        <fits-table-group ref="table" :config="config" />
    </div>
</template>

<script lang="ts" setup name="QualityControl">
import { reactive, ref, toRefs } from "vue";
import { FitsTableGroup } from '@/fits-components';
import { IFitsTableGroup, FitsTableGroupProps } from '@/fits-components/type'

const state = reactive<{ config: FitsTableGroupProps }>({
    config: new FitsTableGroupProps({
        headers: [
            { title: "年龄", field: "age" },
            { title: "性别", field: "sex" },
            { title: "姓名", field: "name" },
        ],
        ajax: {
            query: ({ form, page, cancelToken, isLoading, httpType }) => {
                console.log(form, httpType);
                let GroupTable: IFitsTableGroup[] = []
                let TableList: any[] = []
                let ItemCount = 0

                return new Promise(resolve => {
                    // 如果是接口请求，写以下代码即可
                    /**
                        getMedicalQualityList(Object.assign({}, queryForm.value, form), page, cancelToken, isLoading).then(res => {
                            if (res.RetCode === ResultEnum.SUCCESS) {
                                resolve({
                                    result: res.ReturnData
                                })
                            } else {
                                reject(res.Message)
                            }
                        })
                     */
                    if (httpType === "All") {
                        if (form.GroupCondition === "") {
                            TableList = [
                                { age: "18", sex: "男", name: "张三" },
                                { age: "60", sex: "女", name: "李四" },
                                { age: "99", sex: "男", name: "马五" },
                            ]
                            ItemCount = 3
                        } else if (form.GroupCondition === "sex") {
                            GroupTable = [
                                {
                                    ID: "1",
                                    NAME: "男",
                                    DataSource: {
                                        ItemCount: 2,
                                        GroupList: [{ age: "18", sex: "男", name: "张三" }, { age: "99", sex: "男", name: "马五" }]
                                    }
                                },
                                {
                                    ID: "2",
                                    NAME: "女",
                                    DataSource: { ItemCount: 1, GroupList: [{ age: "60", sex: "女", name: "李四" }] }
                                },
                            ]
                            ItemCount = 2
                        } else {
                            GroupTable = [
                                {
                                    ID: "1",
                                    NAME: "18",
                                    DataSource: {
                                        ItemCount: 2,
                                        GroupList: [{ age: "18", sex: "男", name: "张三" }, { age: "18", sex: "男", name: "张三2" }]
                                    }
                                },
                                { ID: "2", NAME: "20", DataSource: { ItemCount: 1, GroupList: [{ age: "20", sex: "女", name: "李四" }] } },
                                { ID: "3", NAME: "60", DataSource: { ItemCount: 1, GroupList: [{ age: "60", sex: "女", name: "李四22" }] } },
                            ]
                            ItemCount = 3
                        }
                        resolve({
                            result: {
                                GroupTable,
                                ItemCount,
                                TableList
                            }
                        })
                    }
                })
            }
        },
        groupConditions: {
            defaultChecked: "age",
            conditions: [
                { name: "按年龄", value: "age" },
                { name: "按性别", value: "sex" },
            ]
        },
    }),
})
const { config } = toRefs(state)
const table = ref()
</script>

<style lang="scss" scoped>
.base-group-table {
    height: 400px;
}
</style>