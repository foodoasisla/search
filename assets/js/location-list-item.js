'use strict';

Vue.component('location-list-item', {
	props: ['location'],
	template: `
    <li v-bind:class="[location.categoryCode, location.parentCategoryCode]">
        <a v-on:click="showLocationDetails" v-bind:href="locationURI" class="location-summary">
			<img v-bind:src="'/assets/images/home/' + location.categoryCode + '.svg'" width="100" alt="" />
			<h2>{{ location.name }}</h2>
            <p class="address">{{ location.address_1 }}<br />{{ location.address_2 }}</p>
            <p class="type">{{ location.category }}</p>
            <p v-if="isOpenNow" class="open">Open Now</p>
            <p class="distance"><span>{{ distance }}</span> <abbr title="miles">mi</abbr></p>
        </a>
    </li>
	`,
	methods: {
		showLocationDetails: function (e) {

			// If the user wants to open the link in a new window, let the browser handle it.
			if (e && (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey)) return;

			this.$emit('selected', this.location)

			e.preventDefault()
		}
	},
	computed: {
		distance: function () {
			return window.oasis.getDistanceForPresentation(this.location.distanceFromYou)
		},
		locationURI: function() {
			return this.location.uri + window.location.search
		},
 		isOpenNow: function () {
			for (let index = 0; index < this.location.hours.length; index++) {
				if (window.oasis.isOpenNow(this.location.hours[index])) {
					return true
				}
			}
			return false
		}
	}
})
