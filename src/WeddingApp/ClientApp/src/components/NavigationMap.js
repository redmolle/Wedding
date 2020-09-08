import React from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyle = makeStyles((theme) => ({
	root: {
		width: "100%",
		height: "100%",
		position: "relative",
	},
}));

const mapState = {
	center: [55.751574, 37.573856],
	zoom: 9,
};

const NavigationMap = (props) => {
	const { placemark } = props;
	const classes = useStyle();

	// const style = {
	// 	position: "absolute",
	// 	left: 0,
	// 	top: 0,
	// 	width: "100%",
	// 	height: "70%",
	// };

	return (
		<YMaps>
			<Map defaultState={mapState}>
				<Placemark {...placemark} />
			</Map>
		</YMaps>
	);
};

NavigationMap.propTypes = {
	placemark: PropTypes.shape({
		geometry: PropTypes.arrayOf(PropTypes.number),
	}),
};

NavigationMap.defaultProps = {
	placemark: {
		geometry: [55.737322, 37.625191],
	},
};

export default NavigationMap;
