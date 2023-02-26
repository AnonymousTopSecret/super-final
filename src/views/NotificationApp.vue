<template>
    
    <h1>Do you want to ..</h1>

    <div class="approval">
        <div v-for="approval in approvals" :key="approval">
            <p>Initiated by: {{ approval.initiated }}</p>
            <p>Workflow Created: {{ approval.date }}</p>
            <p>Workflow for: {{ approval.process }}</p>
            <p>Description {{ approval.description }}</p>
            <p>Attached Files: {{ approval.fileAttached }}</p>

        </div>
    </div>
    <div class="decide">
        <div class="buttons" v-for="verdict in verdicts" :key="verdict.id">
            <button class="deci" @click.once="approverDecide(verdict, id)">{{ verdict.deci }}</button>
        </div>

        <div v-if="decision">
            <input type="hidden" v-model="decision">
        </div>
    </div>
    <button class="back" type="button" @click="back()">BACK</button>
</template>


<script>
    //import ApprovalTable from '../components/ApprovalTable.vue'
    import Parse from 'parse'
    export default {
        name: 'NotificationApp',
        //components: {ApprovalTable},
        //props: ['approvalprocess'],
        data() {
            return {
                verdicts: [{ id: 'approve', deci: 'Approve' }, { id: 'disapprove', deci: 'Disapprove' }],
                decision: '',
                approvals: [],
            }
        },
        methods: {
            back() {
                this.$router.go(-1)
            },
            approverDecide(verdict) {
                this.decision = verdict.deci
                //console.log(this.decision)
                //const newQuery = new Parse.Query("WorkflowInitiationHistory");
                //approver.equalTo("approvers.approver", currentUser.getEmail());	


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
                            fileAttached: approverResults[i].get("workflow_files").name().substring(approverResults[i].get("workflow_files").name().indexOf("_") + 1,),
                        })
                    }
                }
                else {
                    this.approvals.push({
                        id: null,
                        initiated: "No user",
                        date: "No Date",
                        process: "Entry",
                        status: "No",
                    })
                }
            }
            catch (error) {
                //alert("YAHOO "+error.message)
                console.log(error.message)
            }
        }

    }
</script>

<style>
    .approval {
        margin-right: 30px;
    }

    .approve {
        background-color: #4caf50;
        border: none;
        margin-right: 15px;
    }

    a {
        text-decoration: none;
        color: black;
    }

    .disapprove {
        background-color: #f44336;
        border: none;
    }

    .buttons {
        color: red;
        display: inline-block;
        margin-right: 30px;
        margin-left: 30px;
    }

    .buttons .deci {
        background: black;
        border: 0;
        padding: 10px 20px;
        margin-top: 20px;
        color: white;
        border-radius: 20px;
    }

    .deci:hover {
        background-color: green;
        padding: 20px 40px;
    }

    .back {
        background-color: black;

    }

    button.back {
        background: red;
        border: 0;
        padding: 10px 30px;
        margin-top: 50px;
        color: white;
        border-radius: 10px;
    }

    .back:hover {
        background-color: grey;
        color: black;
    }
</style>

<!-- {
    background: #0b6dff;
    border: 0;
    padding: 10px 20px;
    margin-top: 20px;
    color: white;
    border-radius: 20px;
} -->