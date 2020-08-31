import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as GuestActions from "../store/Guest";
import * as MealActions from "../store/Meal";
import {
	Grid,
	Paper,
	withStyles,
	makeStyles,
	Typography,
	ButtonGroup,
	Button,
	Box,
} from "@material-ui/core";
import bg from "../background.png";
import NotFound from "./NotFound";
import Divider from "./Divider";
import Timer from "./Timer";
import Menu from "./Menu";
import NavigationMap from "./NavigationMap";
import { YMaps, Placemark, Map } from "react-yandex-maps";
import Confirmation from "./Confirmation";

const useStyle = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flex: "1 1 100%",
	},
}));

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

const Invite = (props) => {
	const classes = useStyle();

	return (
		<div className={classes.root}>
			<Grid
				container
				direction='column'
				justify='center'
				alignItems='center'
				spacing={10}>
				<Grid item xs={12}>
					<Typography>{props.guest.name}</Typography>
					<Typography>{props.guest.message}</Typography>
				</Grid>

				<Grid item xs={12}>
					<Confirmation />
				</Grid>

				<Grid item xs={12}>
					<Timer eventDate='2020-10-10' />
				</Grid>

				<Grid item xs={12}>
					<Typography
						className={classes.title}
						variant='h6'
						id='mapTitle'
						component='div'>
						ЗАГС
					</Typography>
					<NavigationMap placemark={ZAGSPlaceMark} />
				</Grid>

				<Grid item xs={12}>
					<Typography
						className={classes.title}
						variant='h6'
						id='mapTitle'
						component='div'>
						Ресторан
					</Typography>
					<NavigationMap placemark={RestaurantPlaceMark} />
				</Grid>

				<Grid item xs={12}>
					<Menu />
				</Grid>
			</Grid>
		</div>
	);
	// return (
	//     <Grid container>
	//         <Grid item xs={12}>
	//             <Typography>{guest.name}</Typography>
	//         </Grid>
	//         <Grid item xs={12}>
	//             <Divider />
	//         </Grid>
	//         <Grid item xs={12}>
	//             <Timer />
	//         </Grid>
	//         <Grid item xs={12}>
	//             <Divider />
	//         </Grid>
	//         <Grid item xs={12}>
	//             <Menu
	//                 menu={guest.menu}
	//             />
	//         </Grid>
	//     </Grid>
	// );
};

const mapStateToProps = (state) => ({
	guest: state.guest.data,
});

const mapActionToProps = {
	confirmInvite: GuestActions.actionCreators.confirmInvite,
	refuseInvite: GuestActions.actionCreators.refuseInvite,
	confirmZAGS: GuestActions.actionCreators.confirmZAGS,
	refuseZAGS: GuestActions.actionCreators.refuseZAGS,
};

export default connect(mapStateToProps, mapActionToProps)(Invite);
