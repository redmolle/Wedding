import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as GuestActions from "../store/Guest";
import { Grid, Paper, makeStyles } from "@material-ui/core";
import bg from "../background.png";
import NotFound from "./NotFound";
import Invite from "./Invite";

const useStyle = makeStyles((theme) => ({
	paper: {
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
		backgroundRepeat: "no-repeat",
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
}))

const Home = (props) => {
    const classes = useStyle();
	
	const guestId = props.match.params.guestId;

    useEffect(() => {
            props.getGuest(guestId);
	}, [guestId]);

    return (
        <Paper className={classes.paper}>
            {props.guest && props.guest.id ? (
                <Invite />
            ) : (
                <NotFound/>
            )}
        </Paper>
    );
};

const mapStateToProps = (state) => ({
	guest: state.guest.data,
});

const mapActionToProps = {
	getGuest: GuestActions.actionCreators.get,
};

export default connect(
	mapStateToProps,
	mapActionToProps
)(Home);
