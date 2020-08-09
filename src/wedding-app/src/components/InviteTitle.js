import React from "react";
import { withStyles, Typography } from "@material-ui/core";
import { connect } from "react-redux";

const styles = (theme) => ({
	root: {
		"& .MuiTableCell-head": {
			fontSize: "1.25rem",
		},
		".MuiTableHead-root": {
			width: "100%",
		}
	},
});

const InviteTitle = ({ classes, ...props }) => {
	return (
        <Typography variant="h4" gutterBottom>
            {props.guest.name}
        </Typography>
	);
};

const mapStateToProps = (state) => ({
	guest: state.guest.guest,
});

const mapActionToProps = {
};

export default connect(
	mapStateToProps,
	mapActionToProps
)(withStyles(styles)(InviteTitle));
