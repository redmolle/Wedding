import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as GuestActions from "../store/Guest";
import { Paper, makeStyles } from "@material-ui/core";
import NotFound from "./NotFound";
import Invite from "./Invite";

const useStyle = makeStyles((theme) => ({
    
    root: {
		backgroundImage: `url(../background.png)`,
		backgroundSize: "cover",
		backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        height: 1200,
        overflow: "auto",
        width:'100%',
        
	},
}));

const Home = (props) => {
	const classes = useStyle();

	useEffect(() => {
		props.getGuest(props.match.params.guestId);
    }, []);
    
	return (
		<Paper className={classes.root}>
			{props.guest && props.guest.id ? <Invite /> : <NotFound />}
		</Paper>
	);
};

const mapStateToProps = (state) => ({
	guest: state.guest.guest,
});

const mapActionToProps = {
	getGuest: GuestActions.actionCreators.get,
};

export default connect(mapStateToProps, mapActionToProps)(Home);
