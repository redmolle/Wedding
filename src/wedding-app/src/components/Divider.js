import React from "react";
import {
	makeStyles,
	Divider as MUIDivider,
	Box,
} from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	box: {
		display: "flex",
		flexDirection: "column",
		alignItems: "stretch",
		padding: 20,
	},
	divider: {
		width: "90%",
		maxWidth: 700,
	},
}));

const Divider = (props) => {
	const classes = useStyle();

	return (
        <div align='center'>
            <Box className={classes.box} />
            <MUIDivider className={classes.divider} variant='middle' />
            <Box className={classes.box} />
        </div>
	);
};

export default Divider;
