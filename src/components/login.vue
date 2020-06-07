<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区 -->
            <div class="avart_box">
                <img src="../assets/logo.png"/>
            </div>
            <!-- 表单区 -->
            <el-form label-width="0px" ref="loginFormRef" :rules="loginFormRules" :model="loginForm" class="login_form">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid">
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="loginForm.password" prefix-icon="iconfont icon-mima"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            loginForm: { username: 'admin', password: '123456' },
            //  表单验证规则对象
            loginFormRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入用户密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        // 点击重置按钮，重置表单
        resetForm () {
            this.$refs.loginFormRef.resetFields()
            // console.log(this.$refs)
        },
        login () {
            this.$refs.loginFormRef.validate(async (valid) => {
                if (valid) {
                    // 解构，把结果中的 data 属性给 res
                    const { data: res } = await this.$http.post('login', this.loginForm)
                    if (res.meta.status !== 200) return this.$message.error('登录失败')
                    this.$message.success('登录成功')
                    // console.log('登录成功')
                    console.log(res)
                    // 将 token 保存到客户端的sessionstorage 中
                    window.sessionStorage.setItem('token', res.data.token)
                    this.$router.push('/home')
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.login_container {
    background-color: #2b4b6b;
    height: 100%;
    // 也可以让 login_box 居中
    // display: flex;
    // justify-content: center;
    // align-items: center;
}
.login_box {
    width: 450px;
    height: 300px;
    background-color: #ffffff;
    border-radius: 3px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50% ,-50%);

    .avart_box {
        width: 130px;
        height: 130px;
        background-color: #fff;
        border: 1px solid #eeeeee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eeeeee;

        }
    }
}
.login_form {
    position: absolute;
    width: 100%;
    bottom: 0px;
    padding: 20px;
    box-sizing: border-box;
}
.btns {
    display: flex;
    justify-content: flex-end;
}
</style>
