<template>
    <div v-if="paused" class="stateupdatespausedouter">
        <div class="stateupdatespausedinner">
            <div class="settingstitle">Gamefinder session paused</div>
            <div>
                <p>Your gamefinder session has paused due to inactivity. Please click continue to resume your session.</p>
                <button @click.prevent="continueSession">Continue</button>
                <a href="https://fumbbl.com" style="margin-left: 20px;">End session</a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component';

@Component({
    props: {
        paused: {
            type: Boolean,
            required: true
        }
    }
})
export default class StateUpdatesPausedComponent extends Vue {
    public continueSession() {
        this.$emit('continue-session');
    }
}
</script>