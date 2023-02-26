<template>
    <div class="notifications">
        <h1>NOTIFICATIONS</h1>
        <table>
            <tr>
                <th></th>
            </tr>
            <tr v-for="approval in approvals" :key="approval">
                <router-link :to="{name: 'notifications'}" v-if="!isEmpty()">
                    <td>ALERT!! {{approval.status}} {{approval.process}}</td>
                </router-link>

                <td v-else>{{approval.status}} {{approval.process}}</td>
            </tr>
        </table>
    </div>
    <notification-info :approval-process="approvals.processName" />
</template>

<script>
import Parse from 'parse';
export default {
    name: 'ApprovalTable',
    data() {
        return {
            approvals: [],
        }
    },
    methods: {
        isEmpty() {
            if (this.approvals === null) {
                return true;
            } else {
                return false;
            }
        }
    },
    mounted: async function () {
        try {
            const currentUser = Parse.User.current();

            const Workflow_Initiation_History = new Parse.Object.extend("WorkflowInitiationHistory")
            const approver = new Parse.Query(Workflow_Initiation_History);
            approver.equalTo("approvers.approver", currentUser.getEmail());

            var count = await approver.count();
            const approverResults = await approver.find();
            if (count !== 0) {
                for (let i = 0; i < count; i++) {
                    this.approvals.push({
                        id: approverResults[i].id,
                        initiated: approverResults[i].get("userID"),
                        date: approverResults[i].createdAt.toLocaleDateString(),
                        process: approverResults[i].get("processName"),
                        description: approverResults[i].get("description"),
                        status: approverResults[i].get("status"),
                    })
                }
            } else {
                this.approvals.push({
                    id: null,
                    initiated: "No user",
                    date: "No Date",
                    process: "Entry",
                    status: "No",
                })
            }
        } catch (error) {
            //alert("YAHOO "+error.message)
            console.log(error.message)
        }
    }
}
</script>

<style scoped>
td {
    border: 0;
    color: black;
}

td:hover {
    color: grey;
}

a {
    text-decoration: none;

}
</style>

<!-- td
//float: left;
//margin-left: 300px; -->