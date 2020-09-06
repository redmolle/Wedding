import React from "react";
import { Grid, Typography } from "@material-ui/core";

const NotFound = (props) => {
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
