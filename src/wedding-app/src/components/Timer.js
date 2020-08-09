import React, { useState, useEffect } from "react";
import {
	withStyles,
	Grid,
	Typography,
	Box,
	CircularProgress,
} from "@material-ui/core";

const styles = (theme) => ({
	root: {
		display: "flex",
		"& > * + *": {
			marginLeft: theme.spacing(2),
		},
	},
});

const calculateTimeLeft = (dateTo) => {
	const intervalDifference = (diffMs) => {
		return {
			days: Math.floor(diffMs / (1000 * 60 * 60 * 24)),
			hours: Math.floor((diffMs / (1000 * 60 * 60)) % 24),
			minutes: Math.floor((diffMs / (1000 * 60)) % 60),
			seconds: Math.floor((diffMs / 1000) % 60),
		};
	};

	let destinationDate = new Date(dateTo);
	const differenceMs = destinationDate - +new Date();
	const daysInYear = intervalDifference(
		destinationDate - +new Date(destinationDate.getFullYear(), 1, 1)
	).days;
	let timeLeft = {};
	const calcDiff = intervalDifference(differenceMs);

	if (differenceMs > 0) {
		timeLeft = {
			days: {
				label: "дней",
				left: calcDiff.days,
				progress: 100 - (calcDiff.days * 100) / daysInYear,
			},
			hours: {
				label: "часов",
				left: calcDiff.hours,
				progress: 100 - (calcDiff.hours * 100) / 24,
			},
			minutes: {
				label: "минут",
				left: calcDiff.minutes,
				progress: 100 - (calcDiff.minutes * 100) / 60,
			},
			seconds: {
				label: "секунд",
				left: calcDiff.seconds,
				progress: 100 - (calcDiff.seconds * 100) / 60,
			},
		};
	}

	return timeLeft;
};

const Timer = ({ classes, ...props }) => {
	const { eventDate } = props;

	const refreshTime = () => calculateTimeLeft(eventDate);

	const [timeLeft, setTimeLeft] = useState(refreshTime());

	const isSuccess = !Object.keys(timeLeft).length;

	useEffect(() => {
		setTimeout(() => {
			setTimeLeft(refreshTime());
		}, 1000);
	});

	return (
		<div className='Timer'>
			<Grid
				container
				justify='center'
				spacing={3}
				direction='row'
				alignItems='center'>
				{isSuccess && (
					<Grid item xs={12} align='center'>
						<Typography variant='h4' gutterBottom>
							Торжество уже началось!
						</Typography>
					</Grid>
				)}
				{Object.keys(timeLeft).map((interval) => (
					<Grid item xs={6} sm={2}>
						<Box position='relative' display='inline-flex'>
							<CircularProgress
								variant='static'
								size={100}
								value={isSuccess ? 100 : timeLeft[interval].progress}
							/>
							<Box
								top={0}
								left={0}
								bottom={0}
								right={0}
								position='absolute'
								display='flex'
								alignItems='center'
								justifyContent='center'>
								<Typography
									variant='caption'
									component='div'
									color='textSecondary'
									align='center'>
									{isSuccess ? 0 : timeLeft[interval].left}
									<p />
									{timeLeft[interval].label}
								</Typography>
							</Box>
						</Box>
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default withStyles(styles)(Timer);
