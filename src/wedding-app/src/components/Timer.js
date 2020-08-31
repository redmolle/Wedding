import React, { useState, useEffect } from "react";
import {
	Grid,
	Typography,
	Box,
	CircularProgress,
	makeStyles,
} from "@material-ui/core";
import PropTypes from "prop-types";

const useStyle = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	progressBox: {
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		position: "absolute",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
}));

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
				label: "Дней",
				left: calcDiff.days,
				progress: 100 - (calcDiff.days * 100) / daysInYear,
			},
			hours: {
				label: "Часов",
				left: calcDiff.hours,
				progress: 100 - (calcDiff.hours * 100) / 24,
			},
			minutes: {
				label: "Минут",
				left: calcDiff.minutes,
				progress: 100 - (calcDiff.minutes * 100) / 60,
			},
			seconds: {
				label: "Секунд",
				left: calcDiff.seconds,
				progress: 100 - (calcDiff.seconds * 100) / 60,
			},
		};
	}

	return timeLeft;
};

const Timer = (props) => {
	const classes = useStyle();
	const { eventDate } = props;

	const refreshTime = () => calculateTimeLeft(eventDate);

	const [timeLeft, setTimeLeft] = useState(refreshTime());

	const isSuccess = !Object.keys(timeLeft).length;

	useEffect(() => {
		setTimeout(() => {
			setTimeLeft(refreshTime());
		}, 1000);
	});

	if (isSuccess) {
		return <Typography>Торжество уже началось!</Typography>;
	}

	return (
		<Grid
			container
			direction='row'
			justify='center'
			alignItems='center'
			spacing={2}>
			{Object.keys(timeLeft).map((interval) => (
				<Grid item xs={3} key={timeLeft[interval].label}>
					<Typography align='center'>{timeLeft[interval].label}</Typography>
					<Box position='relative' display='inline-flex'>
						<CircularProgress
							variant='static'
							size={100}
							value={isSuccess ? 100 : timeLeft[interval].progress}
						/>
						<Box className={classes.progressBox}>
							<Typography>{timeLeft[interval].left}</Typography>
						</Box>
					</Box>
				</Grid>
			))}
		</Grid>
	);
};

Timer.propTypes = {
	eventDate: PropTypes.string.isRequired,
};

Timer.defaultProps = {
	eventDate: "2020-10-10",
};

export default Timer;
