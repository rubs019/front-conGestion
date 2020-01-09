<template>
    <div id="app">
        <el-row :gutter="20">
            <el-col :span="18" :offset="3">
                <router-view/>
            </el-col>
        </el-row>
        <div>

        </div>
    </div>
</template>

<script>

	export default {
		name: "app"
	}
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
