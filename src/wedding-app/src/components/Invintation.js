import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@material-ui/icons/CheckBoxOutlineBlankOutlined";

import React, { useState, useEffect } from "react";
import { Home } from "./Home";
import { connect } from "react-redux";
import * as Guest from "../store/Guest";
import * as Category from "../store/Category";
import * as Menu from "../store/Menu";
import { useToasts } from "react-toast-notifications";
import {
	Grid,
	Paper,
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Checkbox,
	withStyles,
	ButtonGroup,
	Button,
	FormLabel,
	Box,
	Divider,
	Tooltip,
	IconButton,
} from "@material-ui/core";

const styles = (theme) => ({
	root: {
		"& .MuiTableCell-head": {
			fontSize: "1.25rem",
		},
		".MuiTableHead-root": {
			width: "100%",
		},
	},
});

const Invintation = ({ classes, ...props }) => {
	const guestId = props.match.params.guestId;
	const [selectedMenus, setSelectedMenus] = useState([]);
	const [isGuestLoaded, setIsGuestLoaded] = useState(false);
	const [isMenuLoaded, setIsMenuLoaded] = useState(false);
	const { addToast } = useToasts();

	const renderConfirmInvite = () => {
		const handleClick = (event) => {
			props.confirmInvite(props.guest.id)
			props.guest.isConfirmed = true;
		}

		return (
			<Button
				variant='contained'
				color={!props.guest.isConfirmed ? 'primary' : 'inherit'}
				className={classes.smMargin}
				onClick={handleClick}
				disabled={props.guest.isConfirmed}>
				Я приду!
			</Button>
		);
	};

	const renderConfirmZAGS = () => {
		const handleClick = (event) => {
			props.confirmZAGS(props.guest.id)
			props.guest.isConfirmedZAGS = true;
		}

		if (props.guest.isCanBeInZAGS){
		return (
			<Button
				variant='contained'
				color={!props.guest.isConfirmedZAGS ? 'primary' : 'inherit'}
				className={classes.smMargin}
				onClick={handleClick}
				disabled={!props.guest.isConfirmed || props.guest.isConfirmedZAGS}>
				Я хочу в ЗАГС!
			</Button>
		);
		}
	};

	const renderMenu = () => {
		const handleSelect = (event, menuId) => {
			const selectedIndex = selectedMenus.indexOf(menuId);
			let newSelected = [];
			if (selectedIndex === -1) {
				newSelected = newSelected.concat(selectedMenus, menuId);
			} else if (selectedIndex === 0) {
				newSelected = newSelected.concat(selectedMenus.slice(1));
			} else if (selectedIndex === selectedMenus.length - 1) {
				newSelected = newSelected.concat(selectedMenus.slice(0, -1));
			} else if (selectedIndex > 0) {
				newSelected = newSelected.concat(
					selectedMenus.slice(0, selectedIndex),
					selectedMenus.slice(selectedIndex + 1)
				);
			}

			setSelectedMenus(newSelected);
			props.chooseMeal(menuId);
		};

		const isMenuSelected = (id) => {
			return selectedMenus && selectedMenus.indexOf(id) !== -1;
		};

		props.getCategories();

		if (isMenuLoaded && props.categories && props.categories.length > 0) {
			return (
				<TableContainer>
					{props.categories.sort((a, b) => a.sortOrder - b.sortOrder).map((category, cindex) => (
						<div key={cindex}>
							<h3>{category.name}</h3>
							<Table stickyHeader classes={classes}>
								<TableBody>
									{props.guest.menu
										.filter((m) => m.item.categoryId === category.id)
										.sort((a,b) => (a.item.name > b.item.name) ? 1 : (b.item.name > a.item.name) ? -1 : 0)
										.map((row, rindex) => {
											return (
												<TableRow key={rindex}>
													<TableCell>{row.item.name}</TableCell>
													<TableCell
														padding='checkbox'
														onClick={(event) => handleSelect(event, row.id)}>
														<Checkbox checked={isMenuSelected(row.id)} />
													</TableCell>
												</TableRow>
											);
										})}
								</TableBody>
							</Table>
						</div>
					))}
				</TableContainer>
			);
		}
	};

	const renderInvite = () => {
		return (
			<Grid container justify='center'>
				<Grid item xs={10}>
					<h1 align='center'>{props.guest.name}!</h1>
				</Grid>
				<Grid item xs={10} align='center'>
					{renderConfirmInvite()}
				</Grid>
				<Grid item xs={10} align='center'>
					{renderConfirmZAGS()}
				</Grid>
			</Grid>
		);
	};

	const render = () => {
		if (props.guest && props.guest.id) {
			return (
				<Paper classes={classes} elevation={3}>
					<Grid container justify='center'>
						<Grid item xs={10}>
							{renderInvite()}
						</Grid>
						<Grid item xs={10}>
							{renderMenu()}
						</Grid>
					</Grid>
				</Paper>
			);
		}

		return <Home />;
	};

	useEffect(() => {
		if (!isGuestLoaded) {
			props.getGuest(guestId);
			setIsGuestLoaded(true);
		}
		if (
			isGuestLoaded &&
			!isMenuLoaded &&
			props.guest &&
			props.guest.menu &&
			props.guest.menu.length > 0
		) {
			setSelectedMenus(
				props.guest.menu.filter((f) => f.isChoosed === true).map((m) => m.id)
			);
			setIsMenuLoaded(true);
		}
	});

	return <React.Fragment>{render()}</React.Fragment>;
};

const mapStateToProps = (state) => ({
	guest: state.guest.guest,
	categories: state.category.categories,
});

const mapActionToProps = {
	getGuest: Guest.actionCreators.get,
	confirmInvite: Guest.actionCreators.confirmInvite,
	confirmZAGS: Guest.actionCreators.confirmZAGS,
	getCategories: Category.actionCreators.getAll,
	chooseMeal: Menu.actionCreators.choose,
};

export default connect(
	mapStateToProps,
	mapActionToProps
)(withStyles(styles)(Invintation));
