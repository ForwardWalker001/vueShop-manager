<template>
    <el-container>
        <!-- 头部区 -->
        <el-header>
            <div>
                <img src="../assets/logo.png" alt="图标">
                <span>电商后台管理系统</span>
            </div>
            <el-button type="info" @click="loginOut">退出</el-button>
        </el-header>
        <el-container>
            <!-- 侧边区 -->
            <el-aside :width="isToggle ? '64px' : '200px'">
                <div class="toggle-btn" @click="toggleAside">|||</div>
                <el-menu background-color="#333744" text-color="#fff" active-text-color="#409eff" unique-opened
                :collapse="isToggle" :collapse-transition="false" :router="true" :default-active="activePath">
                    <!-- 一级菜单 -->
                    <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
                        <template slot="title">
                            <i :class="iconlist[item.id]"></i>
                            <span>{{ item.authName }}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id"
                        @click="saveNavState('/'+subItem.path)">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>{{ subItem.authName }}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 主体区 -->
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data () {
        return {
            menulist: [],
            iconlist: {
                125: 'iconfont icon-yonghu',
                103: 'iconfont icon-quanxian',
                101: 'iconfont icon-shangpin',
                102: 'iconfont icon-icon',
                145: 'iconfont icon-iconfontpaixingbang'
            },
            isToggle: false,
            activePath: ''
        }
    },
    created () {
        this.getMenulist()
        this.activePath = window.sessionStorage.getItem('activePath')
    },
    methods: {
        loginOut () {
            window.sessionStorage.clear()
            this.$router.push('/login')
        },
        // 点击收起/展开侧边栏
        toggleAside () {
            this.isToggle = !this.isToggle
        },
        saveNavState (activePath) {
            window.sessionStorage.setItem('activePath', activePath)
            this.activePath = activePath
        },
        async getMenulist () {
            const { data: res } = await this.$http.get('menus')
            if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
            this.menulist = res.data
        }
    }
}
</script>
<style lang="less" scoped>
.el-container {
    width: 100%;
    height: 100%;
}
.el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 0;
    color: #fff;
    font-size: 20px;
    div {
        display: flex;
        align-items: center;
        img {
        width: 60px;
        }
    }
}
.el-aside {
    background-color: #333744;
    .el-menu {
        border-right: 0px;
    }
}
.el-main {
    background-color: #eaedf1;
}
.iconfont {
    margin-right: 10px;
}
.toggle-btn {
    background-color: #4a5064;
    font-size: 10px;
    color: #ffffff;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>
