import React, { useContext, Suspense } from 'react';
import { useHistory } from 'react-router-dom';

import NavigationItem from './NavigationItem/NavigationItem';
import LanguageSelect from '../LanguageSelect/LanguageSelect';

import { AuthContext } from '../../../context/auth-context';

import classes from './NavigationItems.module.scss';

const NavigationItems = (props) => {
	const auth = useContext(AuthContext);
	let history = useHistory();
	const loggedIn = auth.isLoggedIn;
	const loggedInUser = loggedIn && auth.userRole === 'user';
	const loggedInAdmin = loggedIn && auth.userRole === 'admin';

	let attachedClasses = [classes.Navigation__Items];

	if (props.desktopView) {
		attachedClasses.push(classes.Navigation_desktop);
	} else {
		attachedClasses.push(classes.Navigation_mobile);
	}

	const logoutHandler = (event) => {
		auth.logout();
		props.closeSideDrawer();
		history.push({
			pathname: '/auth',
			search: '?action=signin',
		});
	};

	return (
		<nav className={classes.Navigation}>
			<ul
				className={`
					${classes.Navigation__Items} 
					${
						props.desktopView
							? classes.Navigation__Items_desktop
							: classes.Navigation__Items_mobile
					}
				`}
			>
				{/* NOT LOGGED IN */}
				{!loggedIn && (
					<NavigationItem
						link="/"
						exact
						closeSideDrawer={props.closeSideDrawer}
					>
						Main
					</NavigationItem>
				)}
				{!loggedIn && (
					<NavigationItem
						link="/auth"
						search="?action=signin"
						exact
						closeSideDrawer={props.closeSideDrawer}
					>
						SIGNIN
					</NavigationItem>
				)}
				{!loggedIn && (
					<NavigationItem
						link="/auth"
						search="?action=signup"
						exact
						closeSideDrawer={props.closeSideDrawer}
					>
						SIGNUP
					</NavigationItem>
				)}

				{/* LOGGED IN */}
				{loggedIn && (
					<NavigationItem
						link="/"
						exact
						closeSideDrawer={props.closeSideDrawer}
					>
						Main
					</NavigationItem>
				)}
				{loggedInAdmin && (
					<NavigationItem
						link="/protected/admin"
						exact
						closeSideDrawer={props.closeSideDrawer}
					>
						Protected Admin
					</NavigationItem>
				)}

				{loggedInUser && (
					<NavigationItem
						link="/protected/user"
						exact
						closeSideDrawer={props.closeSideDrawer}
					>
						Protected User
					</NavigationItem>
				)}

				{loggedIn && (
					<NavigationItem closeSideDrawer={logoutHandler}>
						Logout
					</NavigationItem>
				)}
				<Suspense fallback="loading">
					<LanguageSelect />
				</Suspense>
			</ul>
		</nav>
	);
};

export default NavigationItems;
