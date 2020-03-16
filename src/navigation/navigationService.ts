// NavigationService.js

import { NavigationActions } from 'react-navigation';

let _navigator: { dispatch: (arg0: import("react-navigation").NavigationNavigateAction) => void; };

function setTopLevelNavigator(navigatorRef: { dispatch: (arg0: import("react-navigation").NavigationNavigateAction) => void; }) {
	_navigator = navigatorRef;
}

export function navigate(routeName: any, params?: any) {
	let updateInterval = null;
	clearInterval(updateInterval);
	if (_navigator) {
		_navigator.dispatch(
			NavigationActions.navigate({
				routeName,
				params,
			})
		);
	} else {
		// @todo replace with something better if it will come to my mind.
		updateInterval = setInterval(() => {
			if (_navigator) {
				_navigator.dispatch(
					NavigationActions.navigate({
						routeName,
						params,
					})
				);
				clearInterval(updateInterval);
			}
		}, 50);
	}
}

// add other navigation functions that you need and export them

export default {
	navigate,
	setTopLevelNavigator,
};
