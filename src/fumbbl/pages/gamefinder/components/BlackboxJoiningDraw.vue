<template>
    <div class="blackboxjoiningdraw">
        <div v-if="isNewDraw">
            <a href="#" style="float: right;" @click.prevent="close">Return to Gamefinder</a>
        </div>

        <template v-if="!isNewDraw">
            <div class="nextdrawverysoon">
                <div style="text-align: center;">The Blackbox draw will take place very soon.</div>
                <div class="timerwrapper"><div class="timer" :style="{ width: (100 * secondsRemaining / 30) + '%', left: (50 - 50 * secondsRemaining / 30) + '%'}"></div></div>
            </div>
            <div class="previousroundsheader">Previous rounds</div>
        </template>
        <blackboxroundhistory
            :raw-round-history="rawRoundHistory"
            :is-new-draw="isNewDraw"></blackboxroundhistory>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component';
import BlackboxRoundHistoryComponent from "./BlackboxRoundHistory.vue";

@Component({
    components: {
        'blackboxroundhistory': BlackboxRoundHistoryComponent,
    },
    props: {
        rawRoundHistory: {
            type: Object,
            required: true,
        },
        secondsRemaining: {
            type: Number,
            required: true,
        },
    },
})
export default class BlackboxJoiningDrawComponent extends Vue {
    public isNewDraw: boolean = false;

    public mounted() {
        this.updateIsNewDraw();
        setInterval(this.updateIsNewDraw.bind(this), 1000);
    }

    public updateIsNewDraw() {
        // count it as a new draw if now is between the last update and 10 minutes later (the pause duration of Blackbox)
        const pauseDuration = 10*60*1000;
        this.isNewDraw = this.$props.rawRoundHistory.lastUpdated <= Date.now() && Date.now() <= this.$props.rawRoundHistory.lastUpdated + pauseDuration;
    }
    
    public close(): void {
        this.$emit('close');
    }
}
</script>