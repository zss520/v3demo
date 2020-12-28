<!--
    User: BlackSir
    Date: 2020/12/1
    Time: 15:00
    PACKAGE_NAME:
    PROJECT_NAME: v3demo
-->

<template>
    <div id='home'>
        {{title}}
    </div>
    <span>{{title}}</span>
</template>

<script>
import { ref } from 'vue'
export default {
    setup() {
        const title = ref('home')
        return{
            title
        }
    }
}
</script>
