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
    const {
        variant,
        bold
    } = props

	return (
		<Typography
            {...props}
			className={classes.title}
			variant={variant ? variant : 'h9'}
			id='mapTitle'
			component='div'>
            {bold ? (
                <b>{props.children}</b>
            ) : <div>{props.children}</div>}
		</Typography>
	);
};

export default Title;
