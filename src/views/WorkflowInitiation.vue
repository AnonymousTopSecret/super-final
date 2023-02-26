<template>
<div v-if="showModal">
    <WorkflowForm @close="toggleModal" />
</div>
<button @click="toggleModal">Initiate Workflow</button>
</template>

<script>
import WorkflowForm from '../components/WorkflowForm'
export default {
    data() {
        return {
            showModal: false,
        }
    },
    components: {
        WorkflowForm
    },
    methods: {
        toggleModal() {
            this.showModal = !this.showModal
        },
    },
}
</script>

<style></style>
