<template>
    <router-view v-slot="{ Component }">
        <keep-alive :include="['Menu']">
            <component :is="Component" />
        </keep-alive>
        <!-- <component :is="Component" v-if="!route.meta.cache" /> -->
    </router-view>
</template>
