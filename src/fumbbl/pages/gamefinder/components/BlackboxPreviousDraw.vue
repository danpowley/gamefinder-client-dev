<template>
    <div v-if="isOpen" class="blackboxpreviousdrawouter">
        <div class="blackboxpreviousdrawinner">
            <a href="#" class="closemodal" @click.prevent="close">&times;</a>
            <div>Draw at: {{ blackbox.previous.time }}</div>
            <hr>
            TODO: formatting!
            <hr>
            <div v-for="match in blackbox.previous.matches" :key="match.home.coach.name + match.away.coach.name">
                <div class="details">
                    <div class="homedetails">
                        <div class="name">
                            {{ match.home.name }}
                        </div>
                        <div class="coach">
                            {{ match.home.coach.name }}
                        </div>
                        <div class="desc">
                            TV {{ match.home.tv }} {{ match.home.roster.name }}
                        </div>
                    </div>
                    <strong>versus</strong>
                    <div class="awaydetails">
                        <div class="name">
                            {{ match.away.name }}
                        </div>
                        <div class="coach">
                            {{ match.away.coach.name }}
                        </div>
                        <div class="desc">
                            {{ match.away.roster.name }} TV {{ match.away.tv }}
                        </div>
                    </div>
                </div>
                <hr>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component';

@Component({
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
        blackbox: {
            validator: function (blackbox) {
                return typeof blackbox === 'object' || blackbox === null;
            }
        }
    },
})
export default class BlackboxPreviousDrawComponent extends Vue {
    public close() {
        this.$emit('close-modal');
    }
}
</script>