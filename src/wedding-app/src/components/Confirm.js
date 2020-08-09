import React from "react";
import { connect } from "react-redux";
import * as GuestActions from "../store/Guest";
import { Grid, withStyles, Button, ButtonGroup } from "@material-ui/core";

const styles = (theme) => ({});

const Confirm = ({ classes, ...props }) => {
	const handleClickConfirmInvite = (isConfirmed) => {
		if (isConfirmed) {
			props.confirmInvite(props.guest.id);
		} else {
			props.refuseInvite(props.guest.id);
		}
		props.guest.isConfirmed = isConfirmed;
	};

	const handleClickConfirmZAGS = (isConfirmed) => {
		if (isConfirmed) {
			props.confirmZAGS(props.guest.id);
		} else {
			props.refuseZAGS(props.guest.id);
		}
		props.guest.isConfirmedZAGS = isConfirmed;
	};

	return (
		<Grid container justify='center'>
			<Grid item xs={6} align='center'>
			<ButtonGroup orientation='vertical' color='primary'>
				<Button
					variant='contained'
					color={"primary"}
					className={classes.smMargin}
					onClick={() => handleClickConfirmInvite(true)}
					disabled={!props.guest.isConfirmed}>
					Я приду!
				</Button>
				<Button
					variant='contained'
					color={"inherit"}
					className={classes.smMargin}
					onClick={() => handleClickConfirmInvite(false)}
					disabled={props.guest.isConfirmed}>
					Я не приду!
				</Button>
			</ButtonGroup>
			</Grid>
			{props.guest.isCanBeInZAGS && props.guest.isConfirmed && (
				<Grid item xs={6} align='center'>
				<ButtonGroup orientation='vertical' color='primary'>
					<Button
						variant='contained'
						color={"primary"}
						className={classes.smMargin}
						onClick={() => handleClickConfirmZAGS(true)}
						disabled={props.guest.isConfirmed && !props.guest.isConfirmedZAGS}>
						Я хочу попасть в ЗАГС!
					</Button>
					<Button
						variant='contained'
						color={"inherit"}
						className={classes.smMargin}
						onClick={() => handleClickConfirmZAGS(false)}
						disabled={props.guest.isConfirmed && props.guest.isConfirmedZAGS}>
						Я не пойду в ЗАГС!
					</Button>
				</ButtonGroup>
				</Grid>
			)}
		</Grid>
	);
};

const mapStateToProps = (state) => ({
	guest: state.guest.guest,
});

const mapActionToProps = {
	confirmInvite: GuestActions.actionCreators.confirmInvite,
	refuseInvite: GuestActions.actionCreators.refuseInvite,
	confirmZAGS: GuestActions.actionCreators.confirmZAGS,
	refuseZAGS: GuestActions.actionCreators.refuseZAGS,
};

export default connect(
	mapStateToProps,
	mapActionToProps
)(withStyles(styles)(Confirm));
