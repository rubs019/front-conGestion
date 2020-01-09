<template>
    <div class="timeoff">
        <div class="header">
            <el-button type="info" icon="el-icon-back" circle class="back-btn" v-on:click="back"></el-button>
            <h1>TimeOff</h1>
        </div>
        <div>
            <span class="title">Current balance on {{ currentDate }}</span>
            <el-button type="info" plain v-on:click="$alert(token.value)">Token</el-button>
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
                    width="180"
                    label="Current Balance">
            </el-table-column>
        </el-table>
        <div>
            <span class="title">Events</span>
            <el-button type="primary" icon="el-icon-refresh" circle :loading="eventLoading"
                       v-on:click="refreshEvents"></el-button>
        </div>
        <el-table
                :data="computedEvents"
                style="width: 100%">
            <el-table-column
                    prop="requestId"
                    label="ID">
            </el-table-column>
            <el-table-column
                    prop="date"
                    label="Date">
            </el-table-column>
            <el-table-column
                    label="From">
                <template slot-scope="scope">
                    {{ scope.row.from }}
                </template>
            </el-table-column>
            <el-table-column
                    label="To">
                <template slot-scope="scope">
                    {{ scope.row.to }}
                </template>
            </el-table-column>
            <el-table-column
                    prop="days"
                    label="Days">
                <template slot-scope="scope">
                    {{ scope.row.totalDays }}
                </template>
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
	import moment from "moment-timezone"
	import { Token, User } from "../services/storage"

    const myMoment = moment.tz("Europe/Paris").format('DD/MM/YYYY')

	export default {
		name: "timeoff",
		mixins: [TimeOffAPI],
		data() {
			return {
				currentDate: myMoment,
				apiService: null,
				eventLoading: null,
              token: Token,
				TimeOffs: [{
					username: null,
					timeoff: {
						allotment: null,
						carried: null,
						taken: null,
						planned: null,
						current_balance: null
					}
				}],
				realEvents: []
			}
		},
		methods: {
			back: function() {
				this.$router.back()
			},
			currentBalance: async function() {
				try {
					const currentBalance = await this.getCurrentBalance(User.username)
					const body = await currentBalance.json()
					this.TimeOffs = [{
						username: User.username,
						timeoff: {
							allotment: body.attribueTimeOff,
							carried: body.lastYearTimeOff,
							taken: body.takenToDateTimeOff,
							planned: body.plannedTimeOff,
							current_balance: body.currentBalance
						}
					}]
				} catch (err) {
					console.error(err)
					this.$message.error(err)
					await this.$router.push("/")
				}
			},
			refreshEvents: async function() {
				this.allEvents()
			},
			allEvents: async function() {
				this.eventLoading = true
				try {
					const that = this
					this.realEvents = []
					setTimeout(async function() {
						const events = await that.getEvents(User.username)
						that.realEvents = await events.json()
						that.eventLoading = false
					}, 1500)

				} catch (err) {
					console.error(err)
					this.eventLoading = false
				}
			}
		},
		mounted() {
			this.currentBalance()
			this.allEvents()
		},
		computed: {
			computedEvents: function() {
				return this.realEvents.map(event => {
					const from = moment(event.fields[0].start.date)
					const to = moment(event.fields[0].end.date)
					return {
						requestId: event.fields[0].requestId,
						date: "01/01/2020",
						from: from.format('DD/MM/YYYY'),
						to: to.format('DD/MM/YYYY'),
						type: event.case,
						totalDays: to.diff(from, "days")
					}
				})
			}
		}
	}
</script>

<style scoped>
    .back-btn {
        float: left;
    }

    #refreshEvents {
        cursor: pointer;
    }

    span.title {
        display: inline-block;
        font-size: 1.5em;
        margin-block-start: 0.83em;
        margin-block-end: 0.83em;
        margin-inline-start: 0;
        margin-inline-end: 0;
        margin-right: 16px;
        font-weight: bold;
    }

    pre code {
        background-color: #eee;
        border: 1px solid #999;
        display: block;
        padding: 20px;
    }
</style>
