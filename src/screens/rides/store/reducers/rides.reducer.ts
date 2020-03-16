import { RidesActions, RidesActionsTypes } from '../actions';
import { FoundRide } from '../../models/findRide.model';
import { AddressSuggestion } from '../../models/addressSuggestion.model';
import { RootState } from '../../../../redux/store/reducers';

export interface RidesState {
	rides: FoundRide[];
	addressSuggestions: AddressSuggestion[];
	loading: boolean;
	error: string | null;
}

const initialState: RidesState = {
	rides: [],
	addressSuggestions: [],
	loading: false,
	error: null
};

export default function (state = initialState, action: RidesActions) {
	switch (action.type) {
		case RidesActionsTypes.CREATE_RIDE:
			return {
				...state,
				loading: true
			};
		case RidesActionsTypes.CREATE_RIDE_SUCCESS:
			return {
				...state,
				loading: false
			};
		case RidesActionsTypes.CREATE_RIDE_FAILED:
			return {
				...state,
				error: action.payload.error,
				loading: false
			};
		case RidesActionsTypes.FIND_RIDE:
			return {
				...state,
				rides: [],
				loading: true,
				error: null
			};
		case RidesActionsTypes.FIND_RIDE_SUCCESS:
			return {
				...state,
				rides: action.payload.items,
				error: null,
				loading: false
			};
		case RidesActionsTypes.FIND_RIDE_FAILED:
			return {
				...state,
				loading: false,
				error: action.payload.error
			};
		case RidesActionsTypes.LOAD_ADDRESS_SUGGESTIONS:
			return {
				...state,
				loading: true,
				addressSuggestions: [],
				error: null
			};
		case RidesActionsTypes.LOAD_ADDRESS_SUGGESTIONS_SUCCESS:
			return {
				...state,
				loading: false,
				addressSuggestions: action.payload.items,
				error: null
			};
		case RidesActionsTypes.LOAD_ADDRESS_SUGGESTIONS_FAILED:
			return {
				...state,
				loading: false,
				addressSuggestions: [],
				error: action.payload.error
			};
		case RidesActionsTypes.CLEAR_ADDRESS_SUGGESTIONS:
			return {
				...state,
				loading: false,
				addressSuggestions: [],
				error: null
			};
		default:
			return state;
	}
}

export function getRides(state: RootState) {
	return state.rides.rides;
}

export function getAddressSuggestions(state: RootState) {
	return state.rides.addressSuggestions;
}

export function getRidesStateLoading(state: RootState) {
	return state.rides.loading;
}

export function getRidesStateError(state: RootState) {
	return state.rides.error;
}
