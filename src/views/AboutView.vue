<template>
	<div class="about">
		<h1>Visit us here!</h1>
		<GoogleMap ref="mapRef" :api-key="mapApiKey" style="width: 100%; height: 500px" :center="markers[2]"
			:zoom="15">
			<Marker v-for="m in markers" :options="{ position: m }" />
			<CustomControl position="BOTTOM_CENTER">
				<button class="custom-btn" @click="panTo(0)">Grand Canyon, Arizona</button>
				<button class="custom-btn" @click="panTo(1)">Reykjavik, Iceland</button>
				<button class="custom-btn" @click="panTo(2)">Tiruvannamalai, India</button>
			</CustomControl>
		</GoogleMap>
	</div>
</template>

<script>
import { GoogleMap, Marker, CustomControl } from "vue3-google-map";
export default {
	computed: {
		mapApiKey(){
			return import.meta.env.VITE_APP_API_KEY
		}
	},
	
	components: { GoogleMap, Marker, CustomControl },
	data() {
		return {
			markers: [

				{ lat: 36.056595, lng: -112.125092 },
				{ lat: 64.128288, lng: -21.827774 },
				{ lat: 12.228628, lng: 79.066544 },
			],
			barnches: ['Grand Canyon', 'Reykjavik', 'Tiruvannamalai']
		}
	},
	methods:{
		panTo(idx){
			console.log('this.$refs:', this.$refs.mapRef.map)
			this.$refs.mapRef.map.panTo(this.markers[idx])
		}
	}
}
</script>


