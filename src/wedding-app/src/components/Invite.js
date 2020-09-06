import React from "react";
import { connect } from "react-redux";
import * as GuestActions from "../store/Guest";
import {
	Grid,
	makeStyles,
	Typography,
	TableContainer,
	Table,
	TableBody,
	TableRow,
	TableCell,
} from "@material-ui/core";
import Timer from "./Timer";
import Menu from "./Menu";
import NavigationMap from "./NavigationMap";
import Confirmation from "./Confirmation";
import Timing from "./Timing";
import Title from "./Title";

const useStyle = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
}));

const ZAGSPlaceMark = {
	geometry: [55.737322, 37.625191],
	properties: {
		hintContent: "Это ЗАГС",
	},
	modules: ["geoObject.addon.balloon", "geoObject.addon.hint"],
};

const RestaurantPlaceMark = {
	geometry: [55.711001, 37.795889],
	properties: {
		hintContent: "Это ресторан",
	},
	modules: ["geoObject.addon.balloon", "geoObject.addon.hint"],
};

const Invite = (props) => {
	const classes = useStyle();

	const handleInvite = () => {
		if (!props.guest.isConfirmedInvite) {
			props.confirmInvite(props.guest.id);
		} else {
			handleInviteZags();
			props.refuseInvite(props.guest.id);
		}
	};
	const handleInviteZags = () => {
		if (!props.guest.isConfirmedZAGS) {
			props.confirmZAGS(props.guest.id);
		} else {
			props.refuseZAGS(props.guest.id);
		}
	};

	return (
		<div className={classes.root}>
			<Grid
				container
				direction='column'
				justify='center'
				alignItems='center'
				spacing={10}>
				<Grid item xs={12}>
					<Title align='center'>{props.guest.name}!</Title>
					<Title align='center'>{props.guest.message}</Title>
					<Title align='center'>
						Совсем скоро, в жизни двух любящих друг друга людей произойдет одно
						из самых важных событий, свидетелями которого мы просим вас быть и
						разделить радость этого дня вместе с нами.
					</Title>
				</Grid>

				<Grid item xs={12}>
					<Confirmation
						isInviteConfirmed={props.guest.isConfirmedInvite}
						isCanBeInZAGS={props.guest.isCanBeInZAGS}
						isZAGSConfirmed={props.guest.isConfirmedZAGS}
						onInvite={(event) => handleInvite()}
						onZAGSInvite={(event) => handleInviteZags()}
					/>
				</Grid>

				<Grid item xs={12}>
					<Timer eventDate='2020-10-10' />
				</Grid>

				<Grid item xs={12}>
					<Timing />
				</Grid>

				<Grid item xs={12}>
					<Title align='center'>
						* Дорогие гости! Нам бы очень хотелось пригласить всех в ЗАГС, но, к
						сожалению, до сих пор места регистрации браков ограничивают по
						количеству сопровождающих ввиду пандемии (ограничения также касаются
						прилегающей территории), поэтому не все смогут присутствовать. Вы
						можете сообщить о вашем желании присутствовать в ЗАГСе выше. Также
						существуют дополнительные ограничения - на всей территории площадки
						нельзя использовать: хлопушки, конфетти, воздержаться от посыпания
						лепестками роз, монетами, рисом, битья бокалов и т.п., запрещено
						распитие алкогольных напитков. К месту регистрации брака приезжать
						минут за 10, не более! На этом настаивали сотрудники ЗАГСа. Обращаем
						также Ваше внимание, что неизвестно, какие будут погодные условия, а
						зайти заранее в здание – нельзя. Поэтому просим одеваться
						соответствующе :) Тем, кто пожелает приехать на собственном
						автомобиле на территории площадки есть 2 парковочных места, а также
						рядом имеется городская парковка по ул. Малая Ордынка (нечетная ее
						сторона). Просим оповестить нас, чтобы мы могли рассчитать
						транспортировку.
					</Title>
				</Grid>

				<Grid item xs={12}>
					<Title>ЗАГС</Title>
					<NavigationMap placemark={ZAGSPlaceMark} />
				</Grid>

				<Grid item xs={12}>
					<Title>Ресторан</Title>
					<NavigationMap placemark={RestaurantPlaceMark} />
				</Grid>

				<Grid item xs={12}>
					<Menu />
				</Grid>
			</Grid>
		</div>
	);
};

const mapStateToProps = (state) => ({
	guest: state.guest.guest,
});

const mapActionToProps = {
	confirmInvite: GuestActions.actionCreators.confirmInvite,
	refuseInvite: GuestActions.actionCreators.refuseInvite,
	confirmZAGS: GuestActions.actionCreators.confirmZAGS,
	refuseZAGS: GuestActions.actionCreators.refuseZAGS,
};

export default connect(mapStateToProps, mapActionToProps)(Invite);