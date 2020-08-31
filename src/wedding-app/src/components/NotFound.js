import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
	root: {},
}));

const NotFound = (props) => {
	const classes = useStyle();

	return (
		<Grid container>
            <Grid item xs={12}>
			    <Typography>Страница не найдена</Typography>
			    <Typography>Проверьте корректность ссылки</Typography>
            </Grid>
		</Grid>
	);
};

export default NotFound;
