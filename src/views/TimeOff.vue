<template>
    <div class="timeoff">
        <div class="header">
            <el-button type="info" icon="el-icon-back" circle class="back-btn" v-on:click="back"></el-button>
            <h1>TimeOff</h1>
        </div>
        <div class="">
            <h2>Current balance on XX/XX/20XX</h2>
        </div>
        <el-table
                :data="TimeOffs"
                style="width: 100%">
            <el-table-column
                    prop="username"
                    label="Username">
            </el-table-column>
            <el-table-column
                    prop="timeoff.allotment"
                    label="Allotment">
            </el-table-column>
            <el-table-column
                    prop="timeoff.carried"
                    label="Carried">
            </el-table-column>
            <el-table-column
                    prop="timeoff.taken"
                    label="Taken">
            </el-table-column>
            <el-table-column
                    prop="timeoff.planned"
                    label="Planned">
            </el-table-column>
            <el-table-column
                    prop="timeoff.current_balance"
                    label="Current Balance">
            </el-table-column>
        </el-table>
        <div class="">
            <h2>Events</h2>
        </div>
        <el-table
                :data="Events"
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="Date">
            </el-table-column>
            <el-table-column
                    prop="from"
                    label="From">
            </el-table-column>
            <el-table-column
                    prop="to"
                    label="To">
            </el-table-column>
            <el-table-column
                    prop="days"
                    label="Days">
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="Events"
                    width="180">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
	import { TimeOffAPI } from "../services/TimeOffApi"

	export default {
		name: "timeoff",
		mixins: [TimeOffAPI],
		data() {
			return {
				apiService: null,
				TimeOffs: [{
					username: "employee1",
					timeoff: {
						allotment: 20,
						carried: 3,
						taken: 0,
						planned: 3,
						current_balance: 20
					}
				}],
				Events: [{
					date: "01/01/2020",
					from: "02/01/2020",
					to: "05/01/2020",
					days: 4,
					type: "New request"
				}, {
					date: "01/01/2020",
					from: "02/01/2020",
					to: "05/01/2020",
					days: 4,
					type: "New request"
				}, {
					date: "01/01/2020",
					from: "02/01/2020",
					to: "05/01/2020",
					days: 4,
					type: "New request"
				}]
			}
		},
		methods: {
			back: function() {
				this.$router.back()
			},
			currentBalance: async function() {
				try {
					const currentBalance = await this.getCurrentBalance()
					console.log("currentBalance", currentBalance)
				} catch (err) {
					console.error(err)
				}
			}
		},
		mounted() {
			console.log("TimeOffAPI", TimeOffAPI.data())
			this.currentBalance()
		}
	}
</script>

<style scoped>
    .back-btn {
        float: left;
    }
</style>
