<template>
    <table>
        <tr>
            <th>Process Name</th>
            <th>File Attachment</th>
            <th>Workflow Type</th>
            <th>Date Created</th>
            <th>Progress</th>
            <th>Status</th>
        </tr>
        <tr v-for="workflowTable in workflowTables" :key="workflowTable">
            <td>{{ workflowTable.processName }}</td>
            <td>{{ workflowTable.fileName }}</td>
            <td>{{ workflowTable.workflowType }}</td>
            <td>{{ workflowTable.dateCreated }}</td>
            <td>{{ workflowTable.progress }}</td>
            <td>{{ workflowTable.status }}</td>
        </tr>
    </table>
</template>

<script>
    import Parse from 'parse'
    export default {
        name: 'WorkflowTable',
        data() {
            return {
                workflowTables: [],
                isEmpty: false,
            }
        },
        methods: {
            async showResults() {

            },
        },
        mounted: async function () {
            try {
                const Workflow_Initiation_History = new Parse.Object.extend("WorkflowInitiationHistory")
                const userQuery = new Parse.Query(Workflow_Initiation_History);
                const currentUser = Parse.User.current().id;
                userQuery.descending("createdAt");
                //console.log(currentUser)
                userQuery.equalTo("userID", currentUser);
                var numResults = await userQuery.count();
                const queryResults = await userQuery.find()

                for (let i = 0; i < numResults; i++) {
                    this.workflowTables.push({
                        id: queryResults[i].id,
                        processName: queryResults[i].get("processName"),
                        fileName: queryResults[i].get("workflow_files").name().substring(queryResults[i].get("workflow_files").name().indexOf("_") + 1, ),
                        workflowType: queryResults[i].get("workflowType"),
                        dateCreated: queryResults[i].createdAt.toLocaleDateString(),
                        status: queryResults[i].get("status"),
                    })
                }
            } catch (error) {
                alert("Hello, " + error.message)
                this.$router.push({
                    name: 'home'
                })
            }
        }
    }
</script>

<style>
    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    td,
    th {
        border: 1px solid #dddddd;
        text-align: center;
        padding: 8px;
    }

    tr:nth-child(even) {
        background-color: #dddddd;
    }
</style>
