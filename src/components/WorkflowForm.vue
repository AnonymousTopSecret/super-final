<template>
    <div class="background">

        <form @submit.prevent="initiateWorkflow" method="post">
            <h2>Workflow Initiation Form</h2>
            <label>Workflow For: </label>
            <input type="text" required v-model="processName">
            <br>
            <label>Description: </label>
            <br>
            <textarea required v-model="description" rows="4" cols="45" />
            <br>

            <label>Workflow Type: </label>

            <select v-model="workflowType">
                <option value="hierarchical">Hierarchical</option>
                <option value="broadcast">Broadcast</option>
                <option value="hybrid">Hybrid</option>
            </select>

            <label>Upload Documents</label>
            <input type="file" id="pdfUpload" accept=".pdf" @change="getFileName" multiple required>

            <label>Approver</label>
            <div class="approver" v-for="(input, index) in approvers" :key="index">
                <div class="input"> <input type="email" v-model="input.approver" name="approver" placeholder="Add Approver">
                </div>
                <div class="buttonf">
                    <a @click.prevent="addEmail(approvers)" href="" class="add">Add</a>
                    <a @click.prevent="removeEmail(index, approvers)" href="" class="remove">Remove</a>
                </div>
            </div>
            <div class="submit">
                <button type="submit">Initiate Workflow</button>
            </div>

            <div class="cancel">
                <button type="button" v-if="!empty" @click="close()">Close</button>
                <button type="button" v-else @click="close">Cancel Workflow</button>
            </div>
        </form>
    </div>
</template>

<script>
    import emailjs from '@emailjs/browser';
    import Parse from 'parse'
    import $ from 'jquery'
    //import ApprovalPage from '../views/ApprovalPage.vue'
    export default {
        name: 'WorkflowForm',
        //components:{ApprovalPage},
        data() {
            return {

                processName: "",
                description: "",
                workflowType: "",
                approvers: [{
                    approver: ''
                }],
                selectedFile: '',
                status: "Pending",
                empty: false,

                workflow: [{
                    processName: "",
                    description: "",
                    workflowType: "",
                    approvers: [{
                        approver: ''
                    }],
                    selectedFile: '',
                    status: "Pending",
                },

                ]
            }
        },
        methods: {
            getFileName(event) {
                var filename = event.target.files[0];
                this.selectedFile = filename.name;
                console.log(this.selectedFile)
            },
            close() {
                this.$emit('close')
            },
            initiateWorkflow() {
                const currentUser = Parse.User.current()
                const userID = currentUser.id

                if (currentUser != null) {
                    const Workflow = Parse.Object.extend("WorkflowInitiationHistory")
                    const workflow = new Workflow();

                    const userUploadControl = $("#pdfUpload")[0];
                    const userFile = userUploadControl.files[0];
                    const name = this.selectedFile
                    const parseFile = new Parse.File(name, userFile);

                    if (userUploadControl.files === 0) {
                        alert("Please upload you document");
                    }
                    workflow.set("userInitiated", currentUser)
                    workflow.set("userID", userID)
                    workflow.set("processName", this.processName)
                    workflow.set("description", this.description)
                    workflow.set("workflowType", this.workflowType)
                    workflow.set("approvers", this.approvers)
                    workflow.set("workflow_files", parseFile)
                    workflow.set("status", this.status)

                    workflow.save()
                        .then((workflow) => {
                            alert(workflow.id + " Workflow Succesfully Created")
                            document.location.reload()
                        })
                } else {
                    this.$router.push({
                        name: 'home'
                    })
                    alert("Please Login First!")
                }
            },
            async sendUser() {

            },

            sendEmail(e) {
                try {
                    emailjs.sendForm('service_py1xrp7', 'template_i1f9bab', e.target,
                        'rYmbuP-IpIA-mPmbQ', {
                        name: this.name,
                        email: this.email,
                        message: this.message
                    })

                } catch (error) {
                    console.log({
                        error
                    })
                }
                //Reset form field
                this.name = ''
                this.email = ''
                this.message = ''
            },
            addEmail(approvers) {
                approvers.push({});
            },
            removeEmail(index, approvers) {
                approvers.splice(index, 1);
            },

        },
    }
</script>

<style scoped>
    .buttonf {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .add {
        background: #0b6dff;
        padding: 5px 10px;
        color: white;
        border-radius: 20px;
    }

    .remove {
        background: crimson;
        padding: 5px 10px;
        color: white;
        border-radius: 20px;
    }

    .background {
        margin-top: -110px;
        position: sticky;
        background: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
    }

    .cancel {
        text-align: center;
    }

    .cancel button {
        margin-top: 30px;
        margin-bottom: 20px;
        background: crimson;
    }

    h2 {
        color: black;
        font-family: "Lucida Console", "Courier New", monospace;
        text-align: center;
    }

    a {
        margin: 10px;
        margin-left: 0px;
    }

    textarea {
        border: 1px solid black;
    }

    form {
        max-width: 420px;
        margin: 30px auto;
        background: white;
        text-align: left;
        padding: 40px;
        border-radius: 10px;
        border: 2px solid grey;
        margin-bottom: -22px;
        margin-top: 0;
    }

    label {
        color: black;
        display: inline-block;
        margin: 25px 0 15px;
        font-size: 0.65em;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: bold;
    }

    input,
    select {
        display: block;
        padding: 10px 6px;
        width: 100%;
        box-sizing: border-box;
        border: none;
        border: 1px solid black;
        color: black;
    }

    button {
        background: #0b6dff;
        border: 0;
        padding: 10px 20px;
        margin-top: 20px;
        color: white;
        border-radius: 20px;
    }

    .submit {
        text-align: center;
    }

    text {
        color: crimson;
        font-weight: bold;
        font-size: 1.2em;
        text-decoration-line: underline;
    }

    .pill {
        display: table;
        margin: 20px 10px 0 0;
        padding: 6px 12px;
        background: #eee;
        border-radius: 20px;
        font-size: 12px;
        letter-spacing: 1px;
        font-weight: bold;
        color: #777;
        cursor: pointer;
    }
</style>
