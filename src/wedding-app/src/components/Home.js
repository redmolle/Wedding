import React, { useEffect } from "react";
import { Home } from "./WrongLink";
import { connect } from "react-redux";
import * as GuestActions from "../store/Guest";
import { Grid, Paper, withStyles } from "@material-ui/core";
import bg from "../background.png";
import Menu from "./Menu";
import Timer from "./Timer";
import InviteTitle from "./InviteTitle";
import ConfirmInvite from "./ConfirmInvite";
import NavigationMap from "./NavigationMap";

const styles = (theme) => ({
	root: {
		"& .MuiTableCell-head": {
			fontSize: "1.25rem",
		},
		".MuiTableHead-root": {
			width: "100%",
		},
		backgroundImage: `url(${bg})`,
		backgroundSize: "cover",
		backgroundPosition: "center center",
		backgroundRepeat: "no-repeat",
	},
});

const ZAGSPlaceMark = {
	geometry: [55.737322, 37.625191],
	properties: {
		hintContent: "Это ЗАГС",
	},
	modules: ["geoObject.addon.balloon", "geoObject.addon.hint"],
};

const RestaurantPlaceMark = {
	geometry: [55.711001, 37.795889],
	properties: {
		hintContent: "Это ресторан",
	},
	modules: ["geoObject.addon.balloon", "geoObject.addon.hint"],
};

const Home = ({ classes, ...props }) => {
	const guestId = props.match.params.guestId;

	props.getGuest(guestId);

	return (
		<Paper classes={classes} elevation={3}>
			<Grid container justify='center'>
				{props.guest && props.guest.id ? (
					<Grid container direction='column' justify='center'>
						<Grid item xs={12} align='center'>
							<InviteTitle />
						</Grid>
						<Grid item xs={12} align='center'>
							<ConfirmInvite />
						</Grid>
					</Grid>
				) : (
					<WrongLink />
				)}

				<Grid item xs={12}>
					<Timer eventDate={"2020-10-10"} />
				</Grid>

				<Grid item xs={12}>
					<Grid container justify='center'>
						<Grid item xs={6} align='center'>
							<NavigationMap placemark={ZAGSPlaceMark} />
						</Grid>
						<Grid item xs={6} align='center'>
							<NavigationMap placemark={RestaurantPlaceMark} />
						</Grid>
					</Grid>
				</Grid>

				<Grid item xs={12} align='center'>
					<Menu/>
				</Grid>
			</Grid>
		</Paper>
	);
};

const mapStateToProps = (state) => ({
	guest: state.guest.guest,
});

const mapActionToProps = {
	getGuest: GuestActions.actionCreators.get,
};

export default connect(
	mapStateToProps,
	mapActionToProps
)(withStyles(styles)(Home));
