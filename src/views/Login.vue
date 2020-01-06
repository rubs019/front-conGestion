<template>
    <div class="login">
        <h1>Login</h1>
        <div id="alert" v-show="Form.status.error">
            <el-alert
                    :title="Form.status.text"
                    center
                    :closable="false"
                    type="error"
                    effect="dark"
            >
            </el-alert>
        </div>
        <el-form ref="form" :model="Form" label-width="120px" label-position="right">
            <el-form-item label="Login">
                <el-input
                        placeholder="Please input"
                        suffix-icon="el-icon-user"
                        v-model="Form.name"></el-input>
            </el-form-item>
            <el-form-item label="Password">
                <el-input placeholder="Please input" v-model="Form.password" show-password></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">Create</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
	import { TimeOffAPI } from "../services/TimeOffApi"

	export default {
		name: "login",
		mixins: [TimeOffAPI],
		data() {
			return {
				Form: {
					status: {
						text: "Une erreur s'est produite",
						error: false
					},
					name: "employee2",
					password: "employee2"
				}
			}
		},
		methods: {
			onSubmit: async function() {
				try {
					if (!this.Form.name || !this.Form.password) {
						this.Form.status.error = true
						return
					}
					console.log('TimeOffAPI', TimeOffAPI.data())
					const result = await this.auth(this.Form)
					if (result.status !== 200) throw new Error(result.statusText)
					const jsonResult = await result.json()
					this.setToken(jsonResult.token)
					await this.$router.push("/timeoff")
				} catch (err) {
					this.Form.status.error = true
					console.error(err)
				}
			}
		}
	}
</script>

<style scoped>
    #alert {
        margin: 10px 0;
    }
</style>
