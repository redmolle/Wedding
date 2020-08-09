import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as Category from "../store/Category";
import * as MenuActions from "../store/Menu";
import {
	TableContainer,
	Table,
	TableBody,
	TableRow,
	TableCell,
	Checkbox,
	withStyles,
	Typography,
	TableHead,
	Grid,
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

const Menu = ({ classes, ...props }) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [selected, setSelected] = React.useState([]);

	const handleSelect = (menuId) => {
		const selectedIndex = selected.indexOf(menuId);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, menuId);
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
		props.chooseMeal(menuId);
	};

	const filterMenu = (categoryId) =>
		props.menu.filter((f) => f.item.categoryId === categoryId);

	const isSelected = (menuId) =>
		selected.indexOf(menuId) !== -1 ||
		props.menu.includes((f) => f.id === menuId);

	if (!isLoaded && props.menu && props.menu.length > 0) {
		props.getCategories();
		setSelected(
			props.menu.filter((f) => f.isChoosed === true).map((m) => m.id)
		);
		setIsLoaded(true);
	}

	return (
		<Grid container justify='center'>
			<Grid item xs={6} align='center'>
				{props.menu && props.menu.length > 0 && (
					<div className='Menu'>
						{props.categories
							.sort((a, b) => a.SortOrder > b.SortOrder)
							.map((category, category_index) => {
								const categoriedMenu = filterMenu(category.id);
								const numSelected = categoriedMenu.filter((f) =>
									isSelected(f.id)
								).length;
								const handleSelectAll = (event) => {
									let menuIdSet = categoriedMenu.map((m) => m.id);
									console.log(menuIdSet);
									let newSelected = [];
									if (event.target.checked) {
										newSelected = newSelected.concat(
											selected,
											menuIdSet.filter((f) => !isSelected(f))
										);
									} else {
										newSelected = selected.filter(
											(f) => menuIdSet.indexOf(f) === -1
										);
									}
									console.log(newSelected);

									setSelected(newSelected);
								};

								return (
									<TableContainer key={category.id}>
										<Table>
											<TableHead>
												<TableRow>
													<TableCell padding='checkbox'>
														<Checkbox
															checked={numSelected === categoriedMenu.length}
															onChange={handleSelectAll}
														/>
													</TableCell>
													<TableCell>{category.name}</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{categoriedMenu
													.sort((a, b) =>
														a.item.name > b.item.name
															? 1
															: b.item.name > a.item.name
															? -1
															: 0
													)
													.map((menuItem, menuItem_index) => {
														const isItemSelected = isSelected(menuItem.id);
														return (
															<TableRow
																hover
																onClick={(event) => handleSelect(menuItem.id)}
																role='checkbox'
																tabIndex={-1}
																key={menuItem.id}
																selected={isItemSelected}>
																<TableCell padding='checkbox'>
																	<Checkbox checked={isItemSelected} />
																</TableCell>
																<TableCell
																	component='th'
																	id={menuItem.id}
																	scope='row'
																	padding='none'>
																	{menuItem.item.name}
																</TableCell>
															</TableRow>
														);
													})}
											</TableBody>
										</Table>
									</TableContainer>
								);
							})}
					</div>
				)}
			</Grid>
		</Grid>
	);
};

const mapStateToProps = (state) => ({
	menu: state.guest.guest.menu,
	categories: state.category.categories,
});

const mapActionToProps = {
	getCategories: Category.actionCreators.getAll,
	chooseMeal: MenuActions.actionCreators.choose,
};

export default connect(
	mapStateToProps,
	mapActionToProps
)(withStyles(styles)(Menu));
