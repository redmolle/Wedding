import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as CategoryActions from "../store/Category";
import * as DishActions from "../store/Dish";
import * as MealActions from "../store/Meal";
import {
	TableContainer,
	Table,
	TableBody,
	TableRow,
	TableCell,
	Checkbox,
	makeStyles,
	Typography,
	TableHead,
	Grid,
	withStyles,
	Paper,
	Box,
	ButtonGroup,
	Button,
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

const CategoriedMenu = (props) => {
	const classes = useStyle();
	const { category, dishes } = props;
	const [selected, setSelected] = React.useState([]);
	const numSelected = selected.length;
	const rowCount = dishes.length;
	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = dishes.map((n) => n.id);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

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

	return (
		<TableContainer>
			<Table
				className={classes.table}
				aria-labelledby='tableTitle'
				aria-label='enhanced table'>
				<TableHead>
					<TableRow>
						<TableCell padding='checkbox'>
							<Checkbox
								indeterminate={numSelected > 0 && numSelected < rowCount}
								checked={rowCount > 0 && numSelected === rowCount}
								onChange={handleSelectAllClick}
								inputProps={{ "aria-label": "select all desserts" }}
							/>
						</TableCell>
						<TableCell key={"name"} align={"left"} padding={"none"}>
							{category.name}
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{dishes
						.sort((a, b) => {
							return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
						})
						.map((row, index) => {
							const isDishSelected = isSelected(row.id);
							return (
								<TableRow
									hover
									onClick={(event) => handleClick(event, row.id)}
									role='checkbox'
									aria-checked={isDishSelected}
									tabIndex={-1}
									key={row.id}
									selected={isDishSelected}>
									<TableCell padding='checkbox'>
										<Checkbox checked={isDishSelected} />
									</TableCell>
									<TableCell component='th' scope='row' padding='none'>
										{row.name}
									</TableCell>
								</TableRow>
							);
						})}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

const Menu = (props) => {
	const classes = useStyle();
	const [selected, setSelected] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const handleSubmit = (event) => {
		event.preventDefault();
	};

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

	useEffect(() => {
		setIsLoading(true);
		props.getCategories();
		props.getDishes();
		props.getMeals(props.guest.id);
		if (props.meals && props.meals.list && props.meals.list.length > 0) {
			setSelected(props.meals.list.map((m) => m.dishId));
		}
		setIsLoading(false);
	}, [props.guest.id]);

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
	categories: state.category.list,
	meals: state.meal.list,
	dishes: state.dish.list,
	guest: state.guest.data,
});

const mapActionToProps = {
	getCategories: CategoryActions.actionCreators.getAll,
	getDishes: DishActions.actionCreators.getAll,
	chooseMeal: MealActions.actionCreators.choose,
	getMeals: MealActions.actionCreators.getByGuest,
};

export default connect(mapStateToProps, mapActionToProps)(Menu);
