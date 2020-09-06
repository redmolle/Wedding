import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
	title: {
		flex: "1 1 100%",
		align: "center",
		variant: "h6",
	},
}));

const Title = (props) => {
	const classes = useStyle();

	return (
		<Typography
            {...props}
			className={classes.title}
			variant='h6'
			id='mapTitle'
			component='div'>
			{props.children}
		</Typography>
	);
};

export default Title;
