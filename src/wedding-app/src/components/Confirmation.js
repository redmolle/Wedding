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

const useStyle = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flex: "1 1 100%",
	},
}));

const Confirmation = (props) => {
	const classes = useStyle();
	const handleInvite = (event) => {
		if (!props.guest.isConfirmedInvite) {
			props.confirmInvite(props.guest.id);
		} else {
			props.refuseInvite(props.guest.id);
		}
	};
	const handleInviteZags = (event) => {
		if (!props.guest.isConfirmedZAGS) {
			props.confirmZAGS(props.guest.id);
		} else {
			props.refuseZAGS(props.guest.id);
		}
	};

	return (
		<ButtonGroup variant='contained' orientation='vertical'>
			<Button
				className={classes.smMargin}
				color={props.guest.isConfirmedInvite ? "secondary" : "primary"}
				onClick={(event) =>
					handleInvite(event, !props.guest.isConfirmedInvite)
				}>
				{!props.guest.isConfirmedInvite ? (
					<div>Принять приглашение</div>
				) : (
					<div>Планы поменялись</div>
				)}
			</Button>

			{props.guest.isCanBeInZAGS && (
				<Button
					className={classes.smMargin}
					color={props.guest.isConfirmedZAGS ? "secondary" : "primary"}
					disabled={!props.guest.isConfirmedInvite}
					onClick={(event) =>
						handleInviteZags(event, !props.guest.isConfirmedZAGS)
					}>
					{!props.guest.isConfirmedZAGS ? (
						<div>Принять приглашение в ЗАГС</div>
					) : (
						<div>Планы насчет ЗАГСа поменялись</div>
					)}
				</Button>
			)}
		</ButtonGroup>
	);
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

export default connect(mapStateToProps, mapActionToProps)(Confirmation);
