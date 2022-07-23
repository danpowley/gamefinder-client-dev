<template>
    <div class="basicbox" v-if="blackboxStatus !== null">
        <div class="header blackboxheader">Blackbox<span class="blackboxstatus">{{ blackboxStatus.status }}</span></div>
        <div class="content" id="blackboxwrapper">
            <div class="blackboxpaused" v-if="blackboxStatus.status === 'PAUSED'">
                <div class="pausedtop">
                    Time remaining.
                </div>
                <div class="pausedtimerwrapper"><div class="pausedtimer" :style="{ width: (100 * blackboxStatus.secondsUntilActive / blackboxStatus.secondsPausedLifetime) + '%', left: (50 - 50 * blackboxStatus.secondsUntilActive / blackboxStatus.secondsPausedLifetime) + '%'}"></div></div>
                <div class="pausedbottom">
                    {{ Math.ceil(blackboxStatus.secondsUntilActive/60) }} minutes.
                </div>
            </div>
            <div class="blackboxactive" v-if="blackboxStatus.status === 'ACTIVE'">
                <div class="pausedtop">
                    {{ blackboxStatus.activatedCoachCount }} coaches activated ({{ Math.ceil(blackboxStatus.secondsUntilDraw/60) }} minutes left)
                </div>
                <div class="pausedtimerwrapper"><div class="pausedtimer" :style="{ width: (100 * blackboxStatus.secondsUntilDraw / blackboxStatus.secondsActiveLifetime) + '%', left: (50 - 50 * blackboxStatus.secondsUntilDraw / blackboxStatus.secondsActiveLifetime) + '%'}"></div></div>
                <div class="pausedbottom">
                    <div class="activationcontrols" v-if="hasBlackboxTeamsActivated">
                        <div>{{ isActivated ? 'Activated' : 'Not activated' }}</div>
                        <div>
                            <input v-model="isActivated" type="checkbox" @change="handleActivation">
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

interface BlackboxStatus {
    secondsPausedLifetime: number,
    secondsActiveLifetime: number,
    status: 'ACTIVE' | 'PAUSED',
    secondsUntilActive: number | null,
    activatedCoachCount: number | null,
    secondsUntilDraw: number | null,
};

@Component({
    props: {
        hasBlackboxTeamsActivated: {
            type: Boolean,
            required: true,
        }
    }
})
export default class BlackboxComponent extends Vue {
    public blackboxStatus: BlackboxStatus | null = null;
    public isActivated: boolean = false;

    private fakeDurations = {pause: 10, draw: 45};

    public mounted() {
        this.blackboxStatus = {
            secondsPausedLifetime: this.fakeDurations.pause,
            secondsActiveLifetime: this.fakeDurations.draw,
            status: 'PAUSED',
            secondsUntilActive: this.fakeDurations.pause,
            activatedCoachCount: null,
            secondsUntilDraw: null,
        };
        setInterval(this.fakeUpdateBlackboxStatus, 1000);
    }

    private fakeUpdateBlackboxStatus() {
        if (this.blackboxStatus.status === 'PAUSED') {
            if (this.blackboxStatus.secondsUntilActive > 0) {
                this.blackboxStatus.secondsUntilActive = this.blackboxStatus.secondsUntilActive - 1;
                return;
            }
        }
        if (this.blackboxStatus.status === 'PAUSED' && this.blackboxStatus.secondsUntilActive === 0) {
            this.blackboxStatus.status = 'ACTIVE';
            this.blackboxStatus.activatedCoachCount = 0;
            this.blackboxStatus.secondsUntilDraw = this.fakeDurations.draw;
            this.blackboxStatus.secondsUntilActive = null;
            return;
        }
        if (this.blackboxStatus.status === 'ACTIVE') {
            if (this.blackboxStatus.secondsUntilDraw > 0) {
                this.blackboxStatus.secondsUntilDraw = this.blackboxStatus.secondsUntilDraw - 1;
                this.blackboxStatus.activatedCoachCount += Math.random() > 0.7 ? 1 : 0;
                return;
            }
        }
        if (this.blackboxStatus.status === 'ACTIVE' && this.blackboxStatus.secondsUntilDraw === 0) {

            if (this.isActivated === true) {
                const home = {
                    name: 'Example Team 1',
                    coach: {name: 'Coach X'},
                    tv: 1000000,
                    roster: {name: 'Orc'},
                };
                const away = {
                    name: 'Example Team 2',
                    coach: {name: 'Coach Y'},
                    tv: 1000000,
                    roster: {name: 'Human'},
                };
                this.$emit('blackbox-match-scheduled', home, away);
            }


            this.blackboxStatus.status = 'PAUSED';
            this.blackboxStatus.secondsUntilActive = this.fakeDurations.pause;
            this.blackboxStatus.secondsUntilDraw = null;
            this.isActivated = false;
            this.handleActivation();
            return;
        }
    }

    public handleActivation() {
        this.$emit('blackbox-activation', this.isActivated);
    }
}
</script>