import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as GuestActions from '../store/Guest';
import * as MenuActions from '../store/Menu';
import {
	TableContainer,
	Table,
	TableBody,
	TableRow,
	TableCell,
	Checkbox,
	makeStyles,
	TableHead,
	Grid,
} from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		margin: theme.spacing(1),
		width: "100%",
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		margin: theme.spacing(2),
		marginBottom: theme.spacing(2),
		color: theme.palette.text.secondary,
	},
	smMargin: {
		margin: theme.spacing(1),
	},
	tableHead: {
		fontSize: "1.75rem",
	},
	tableCell: {
		fontSize: "60pt",
	},
	title: {
		flex: "1 1 100%",
	},
}));

const Menu = (props) => {
	const classes = useStyle();
	const [selected, setSelected] = useState([]);
	const {
		meal
	} = props;
	const handleClick = (event, id) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}
		setSelected(newSelected);
	};

	const isSelected = (id) => selected.indexOf(id) !== -1;
	
	const choose = () => {
		props.chooseMeal(props.guest.id, selected);
	}

	useEffect(() => {
		props.getMeal(props.guest.id);
		props.getCategories();
		props.getDishes();
	}, []);

	useEffect(() => {
		setSelected(meal.map((m) => m.dishId));
	}, [meal]);

	useEffect(() => {

		const isNeedExec = () => {
			if (props.meal.length !== selected.length) {
				return true;
			}

			for (var i=0; i<selected.length; i++)
			{
				if (props.meal[i].dishId !== selected[i]) {
					return true;
				}
			}

			return false;
		}

		if (isNeedExec()) {
			choose();
		}
	}, [selected]);

	return (
		<Grid
			container
			// direction='column'
			justify='center'
			alignItems='center'
			spacing={2}>
			{props.categories.map((category, c_index) => {
				const filteredDishes =
					props.dishes.filter((f) => f.categoryId === category.id);

				const handleSelectAllClick = (event) => {
					let newSelected = [];
					if (event.target.checked) {
						newSelected = newSelected.concat(
							selected,
							filteredDishes.filter((f) => !isSelected(f.id)).map((m) => m.id)
						);
					} else {
						newSelected = selected.filter((f) =>
							!filteredDishes.map((m) => m.id).includes(f)
						);
					}
					setSelected(newSelected);
				};

				const numSelected = selected.filter((f) =>
					filteredDishes.map((m) => m.id).includes(f)
				).length;

				const rowCount = filteredDishes.length;

				return (
					<Grid item xs={6} sm={4} key={category.id}>
						<TableContainer>
							<Table className={classes.tableCell}>
								<TableHead>
									<TableRow className={classes.tableHead}>
										<TableCell padding='checkbox' >
											<Checkbox
												indeterminate={
													numSelected > 0 && numSelected < rowCount
												}
												checked={rowCount > 0 && numSelected === rowCount}
												onChange={handleSelectAllClick}
											/>
										</TableCell>
										<TableCell padding='none'>{category.name}</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{filteredDishes.map((dish, d_index) => {

										const isDishSelected = isSelected(dish.id);

										return (
											<TableRow
											className={classes.tableCell}
												hover
												onClick={(event) => handleClick(event, dish.id)}
												role='checkbox'
												aria-checked={isDishSelected}
												tabIndex={-1}
												key={dish.id}
												selected={isDishSelected}>
												<TableCell padding='checkbox'>
													<Checkbox checked={isDishSelected} />
												</TableCell>
												<TableCell component='th' scope='row' padding='none'>
													{dish.name}
												</TableCell>
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
				);
			})}
		</Grid>
	);
};

const mapStateToProps = (state) => ({
	meal: state.guest.meal,
	categories: state.menu.categories,
	dishes: state.menu.dishes,
	guest: state.guest.guest
});

const mapActionToProps = {
	getMeal: GuestActions.actionCreators.getMeal,
	chooseMeal: GuestActions.actionCreators.chooseMeal,
	getCategories: MenuActions.actionCreators.getCategories,
	getDishes: MenuActions.actionCreators.getDishes,
};

export default connect(mapStateToProps, mapActionToProps)(Menu);