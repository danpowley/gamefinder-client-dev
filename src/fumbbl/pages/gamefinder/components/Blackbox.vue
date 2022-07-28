<template>
    <div class="basicbox" v-if="blackbox !== null">
        <div class="header blackboxheader">Blackbox<span class="blackboxstatus">{{ blackbox.status }}</span></div>
        <div class="content" id="blackboxwrapper">
            <div class="blackboxpaused" v-if="blackbox.status === 'PAUSED'">
                <div class="pausedtop">
                    Time remaining.
                </div>
                <div class="pausedtimerwrapper"><div class="pausedtimer" :style="{ width: (100 * blackbox.secondsRemaining / blackbox.config.pauseDuration) + '%', left: (50 - 50 * blackbox.secondsRemaining / blackbox.config.pauseDuration) + '%'}"></div></div>
                <div class="pausedbottom">
                    {{ Math.ceil(blackbox.secondsRemaining/60) }} minutes.
                </div>
            </div>
            <div class="blackboxactive" v-if="blackbox.status === 'ACTIVE'">
                <div class="pausedtop">
                    {{ blackbox.coachCount }} coaches activated ({{ Math.ceil(blackbox.secondsRemaining/60) }} minutes left)
                </div>
                <div class="pausedtimerwrapper"><div class="pausedtimer" :style="{ width: (100 * blackbox.secondsRemaining / blackbox.config.activeDuration) + '%', left: (50 - 50 * blackbox.secondsRemaining / blackbox.config.activeDuration) + '%'}"></div></div>
                <div class="pausedbottom">
                    <div class="activationcontrols" v-if="hasBlackboxTeamsActivated">
                        <div>{{ userActivated ? 'Activated' : 'Not activated' }}</div>
                        <div v-if="!pleaseWait">
                            <button v-if="userActivated" type="checkbox" @click="handleDeactivation">Deactivate</button>
                            <button v-if="!userActivated" type="checkbox" @click="handleActivation">Activate</button>
                        </div>
                        <div v-else>
                            Please wait
                        </div>
                    </div>
                    <div v-else>
                        To join Blackbox, you must activate at least one Competitive division team.
                    </div>
                </div>
            </div>
            <div>
                Previous: <a href="#" @click.prevent="openModal('BLACKBOX_PREVIOUS_DRAW')">view</a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component';
import { Blackbox, BlackboxMatch } from "../include/Interfaces";

@Component({
    props: {
        hasBlackboxTeamsActivated: {
            type: Boolean,
            required: true,
        },
        blackbox: {
            validator: function (blackbox) {
                return typeof blackbox === 'object' || blackbox === null;
            }
        }
    },
    watch: {
        blackbox: function () {
            // @ts-ignore: Property 'pleaseWait' does not exist on type 'Vue'.
            return this.pleaseWait = false;
        }
    },
})
export default class BlackboxComponent extends Vue {
    public pleaseWait: boolean = false;

    public openModal(name: string) {
        this.$emit('open-modal', name, {});
    }

    public get userActivated(): boolean {
        return this.$props.blackbox.userActivated;
    }

    public handleActivation() {
        this.pleaseWait = true;
        this.$emit('blackbox-activation', true);
    }

    public handleDeactivation() {
        this.pleaseWait = true;
        this.$emit('blackbox-activation', false);
    }
}
</script>