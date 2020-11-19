// * -- libraries imports
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// * -- my own imports
// ---- components
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import MainHeader from '../MainHeader/MainHeader';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

// ---- styles
import classes from './MainNavigation.module.scss';

const MainNavigation = (props) => {
	return (
		<MainHeader>
			<Logo navigation />
			<Link
				to={props.mainPageAddress}
				className={classes.MainHeader__Title}
			>
				full authentication
			</Link>
			<NavigationItems desktopView={props.navigationItemsDesktopView} />
			<DrawerToggle
				onClick={props.drawerToggleClick}
				transform={props.sideDrawerIsVisible}
			/>
		</MainHeader>
	);
};

// * -- prop types
MainNavigation.propTypes = {
	/** url redirection address */
	to: PropTypes.string,
	/** onClick handler */
	onClick: PropTypes.func,
	/** toggle side drawer */
	transform: PropTypes.bool,
	/** toggle desktop view */
	desktopView: PropTypes.bool,
};
export default MainNavigation;
