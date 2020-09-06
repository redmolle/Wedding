import React, { useState, useEffect } from "react";
import {
	Grid,
	Typography,
	Box,
	CircularProgress,
	makeStyles,
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@material-ui/core";

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
    
	tableCell: {
		fontSize: "60pt",
	},
}));

const Timing = (props) => {
	const classes = useStyle();

    const timing = [
		{
			time: '12:00',
			description: 'Сборы молодоженов'
		},
		{
			time: '17:20',
			description: 'Регистрация в ЗАГСе*'
		},
		{
			time: '18:30',
			description: 'Встреча в ресторане'
		},
		{
			time: '21:00',
			description: 'Танцуем, пьем, режем торт!'
        },
        {
			time: '23:00',
			description: 'Зажигаем бенгальские огни'
		}
	]

	return (
        <div className={classes.root}>
		<TableContainer>
            <Table>
                <TableBody>
                    {timing.map((t, index) => {
                        return (
                            <TableRow hover key={index} className={classes.tableCell}>
                                <TableCell>{t.time}</TableCell>
                                <TableCell>{t.description}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
	);
};

export default Timing;
