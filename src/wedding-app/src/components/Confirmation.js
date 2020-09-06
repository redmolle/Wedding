import React from "react";
import {
	makeStyles,
	ButtonGroup,
	Button,
} from "@material-ui/core";

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

	const {
		isInviteConfirmed,
		isCanBeInZAGS,
		isZAGSConfirmed,
		onInvite,
		onZAGSInvite,
	} = props

	return (
		<ButtonGroup variant='contained' orientation='vertical'>
			<Button
				className={classes.smMargin}
				color={isInviteConfirmed ? "secondary" : "primary"}
				onClick={onInvite}>
				{!isInviteConfirmed ? (
					<div>Принять приглашение</div>
				) : (
					<div>Планы поменялись</div>
				)}
			</Button>

			{isCanBeInZAGS && (
				<Button
					className={classes.smMargin}
					color={isZAGSConfirmed ? "secondary" : "primary"}
					disabled={!isInviteConfirmed}
					onClick={onZAGSInvite}>
					{!isZAGSConfirmed ? (
						<div>Принять приглашение в ЗАГС</div>
					) : (
						<div>Планы насчет ЗАГСа поменялись</div>
					)}
				</Button>
			)}
		</ButtonGroup>
	);
};

export default Confirmation;
