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
                        <div>{{ blackbox.userActivated ? 'Activated' : 'Not activated' }}</div>
                        <div>
                            <input v-model="blackbox.userActivated" type="checkbox" @change="handleActivation">
                        </div>
                    </div>
                    <div v-else>
                        To join Blackbox, you must activate at least one Competitive division team.
                    </div>
                </div>
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
        }
    }
})
export default class BlackboxComponent extends Vue {
    public blackbox: Blackbox | null = null;

    public mounted() {
        this.blackbox = {
            userActivated: false,
            status: 'PAUSED',
            secondsRemaining: 5,
            coachCount: 0,
            previous: {
                userMatch: null,
                time: 9000000000,
                matches: [],
            },
            config: {
                pauseDuration: 10,
                activeDuration: 45,
            }
        };
        setInterval(this.fakeUpdateBlackboxStatus, 1000);
    }

    private fakeUpdateBlackboxStatus() {
        if (this.blackbox.status === 'PAUSED') {
            if (this.blackbox.secondsRemaining > 0) {
                this.blackbox.secondsRemaining = this.blackbox.secondsRemaining - 1;
                return;
            }
        }
        if (this.blackbox.status === 'PAUSED' && this.blackbox.secondsRemaining === 0) {
            this.blackbox.status = 'ACTIVE';
            this.blackbox.secondsRemaining = 45;
            return;
        }
        if (this.blackbox.status === 'ACTIVE') {
            if (this.blackbox.secondsRemaining > 0) {
                this.blackbox.secondsRemaining = this.blackbox.secondsRemaining - 1;
                return;
            }
        }
        if (this.blackbox.status === 'ACTIVE' && this.blackbox.secondsRemaining === 0) {

            if (this.blackbox.userActivated === true) {
                const match: BlackboxMatch = {
                    home: {
                        name: 'Example oi Team 1',
                        coach: {
                            name: 'Coach X'
                        },
                        tv: 1000000,
                        roster: {
                            name: 'Orc'
                        },
                    },
                    away: {
                        name: 'Example oi Team 2',
                        coach: {
                            name: 'Coach Y',
                        },
                        tv: 1000000,
                        roster: {
                            name: 'Human',
                        },
                    },
                }
                this.$emit('blackbox-match-scheduled', match);
            }


            this.blackbox.status = 'PAUSED';
            this.blackbox.secondsRemaining = 10;
            this.blackbox.userActivated = false;
            this.handleActivation();
            return;
        }
    }

    public handleActivation() {
        this.$emit('blackbox-activation', this.blackbox.userActivated);
    }
}
</script>