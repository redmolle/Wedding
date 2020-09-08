import React from "react";
import { Grid } from "@material-ui/core";
import Title from  './Title'

const NotFound = (props) => {
	return (
		<Grid container>
            <Grid item xs={12}>
			    <Title align='center'>Страница не найдена</Title>
			    <Title align='center'>Проверьте корректность ссылки</Title>
            </Grid>
		</Grid>
	);
};

export default NotFound;
