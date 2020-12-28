<template>
    <!--<Layout></Layout>-->
    <router-view></router-view>
</template>

<script>
// import Layout from './components/layout/layout'

export default {
    name: 'App',
    components: {
        // Layout
    },
    setup() {

    }
}
</script>

<style>
    html,body{
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
    }
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #fff;
        height: 100%;
    }

</style>
