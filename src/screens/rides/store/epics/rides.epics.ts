import { ActionsObservable } from 'redux-observable';
import {
	createRideFailed,
	createRideSuccess,
	findRideFailedAction,
	findRideSuccessAction,
	loadAddressSuggestionsFailed,
	loadAddressSuggestionsSuccessAction,
	RidesActions,
	RidesActionsTypes,
} from '../actions';
import { isOfType } from 'typesafe-actions';
import { catchError, debounceTime, filter, map, switchMap, tap } from 'rxjs/operators';
import axios, { AxiosResponse } from 'axios';
import { createRideRoute } from '../../constants/api.constants';
import algoliasearch from 'algoliasearch';
import { from, of } from 'rxjs';

const sessionToken = new Date().getMilliseconds();
const places = algoliasearch.initPlaces('null', 'null');

export const createRideEpic = (actions$: ActionsObservable<RidesActions>) => actions$.pipe(
	filter(isOfType(RidesActionsTypes.CREATE_RIDE)),
	map(action => action.payload),
	switchMap(ride =>
		from(axios.post<AxiosResponse<any>>(createRideRoute, ride))
			.pipe(
				map(response => createRideSuccess()),
				catchError(e => of(createRideFailed(e)))
			)
	)
);

export const findRideEpic = (actions$: ActionsObservable<RidesActions>) => actions$.pipe(
	filter(isOfType(RidesActionsTypes.FIND_RIDE)),
	map(action => action.payload),
	switchMap(payload =>
		from(axios.get<AxiosResponse<any>>(`${createRideRoute}?passengersCount=${payload.passengersCount}&rideFrom=${encodeURIComponent(payload.rideFrom)}&rideTo=${encodeURIComponent(payload.rideTo)}&date=${payload.date}`))
			.pipe(
				map((response: AxiosResponse<any>) => findRideSuccessAction({items: response.data.rides})),
				catchError(e => of(findRideFailedAction(e)))
			)
	)
);

export const loadAddressSuggestionsEpic = (actions$: ActionsObservable<RidesActions>) => actions$.pipe(
	filter(isOfType(RidesActionsTypes.LOAD_ADDRESS_SUGGESTIONS)),
	map(action => action.payload),
	debounceTime(300),
	filter(payload => !!payload.term),
	switchMap(payload =>
			from(places.search({query: payload.term, countries: 'ua', language: 'uk', hitsPerPage: 5}))
				.pipe(
					tap(console.log),
					map((response: any) => loadAddressSuggestionsSuccessAction({items: response.hits})),
					catchError(e => of(loadAddressSuggestionsFailed(e)))
				)
	)
);
