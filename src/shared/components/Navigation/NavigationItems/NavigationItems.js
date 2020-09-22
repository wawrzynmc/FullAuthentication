import React, { useContext } from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import { AuthContext } from '../../../context/auth-context';

import classes from './NavigationItems.module.scss';

const NavigationItems = (props) => {
	const auth = useContext(AuthContext);

	let attachedClasses = [classes.NavigationItems];

	if (props.desktopView) {
		attachedClasses.push(classes.Desktop);
	} else {
		attachedClasses.push(classes.Mobile);
	}

	return (
		<nav className={classes.Navigation}>
			<ul className={attachedClasses.join(' ')}>
				{/* NOT LOGGED IN */}
				{!auth.isLoggedIn && (
					<NavigationItem link="/auth/login" exact>
						Login
					</NavigationItem>
				)}
				{!auth.isLoggedIn && (
					<NavigationItem link="/auth/signup" exact>
						Signup
					</NavigationItem>
				)}

				{/* LOGGED IN */}
				{auth.isLoggedIn && (
					<NavigationItem link="/" exact>
						Main
					</NavigationItem>
				)}
				{auth.isLoggedIn && (
					<NavigationItem link="/protected/admin" exact>
						Protected Admin
					</NavigationItem>
				)}

				{auth.isLoggedIn && (
					<NavigationItem link="/protected/user" exact>
						Protected User
					</NavigationItem>
				)}
			</ul>
		</nav>
	);
};

export default NavigationItems;
