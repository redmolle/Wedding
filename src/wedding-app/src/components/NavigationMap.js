import React from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { withStyles } from "@material-ui/core";

const styles = (theme) => ({
	root: {
		width: 100000,
		hight: 320,
	},
});

const mapState = {
	center: [55.751574, 37.573856],
	zoom: 9,
	width: "100%",
	hight: "100%",
};

const NavigationMap = ({ classes, ...props }) => {
	const { placemark } = props;

	return (
		<YMaps>
			<Map
        state={mapState}
        // instanceRef={ref => (this.map = ref)}
        // height="100%"
        // width="100%"
        >
				<Placemark {...placemark} />
			</Map>
		</YMaps>
	);
};

export default withStyles(styles)(NavigationMap);
