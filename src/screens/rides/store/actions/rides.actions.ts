import { Action } from 'redux';
import { Ride } from '../../models/ride.model';
import { FindRide, FoundRide } from '../../models/findRide.model';
import { AddressSuggestion } from '../../models/addressSuggestion.model';

export enum RidesActionsTypes {
	CREATE_RIDE = '[Rides] Create ride',
	CREATE_RIDE_SUCCESS = '[Rides] Create ride Success',
	CREATE_RIDE_FAILED = '[Rides] Create ride Failed',

	FIND_RIDE = '[Rides] Find ride',
	FIND_RIDE_SUCCESS = '[Rides] Find ride Success',
	FIND_RIDE_FAILED = '[Rides] Find ride Failed',

	LOAD_ADDRESS_SUGGESTIONS = '[Rides] Load address suggestions',
	LOAD_ADDRESS_SUGGESTIONS_SUCCESS = '[Rides] Load address suggestions Success',
	LOAD_ADDRESS_SUGGESTIONS_FAILED = '[Rides] Load address suggestions Failed',

	CLEAR_ADDRESS_SUGGESTIONS = '[Rides] Clear Address Suggestions'
}

export interface CreateRideAction extends Action {
	type: RidesActionsTypes.CREATE_RIDE,
	payload: Ride;
}

export function createRide(payload: Ride): CreateRideAction {
	return {
		type: RidesActionsTypes.CREATE_RIDE,
		payload
	};
}

export interface CreateRideSuccessAction extends Action {
	type: RidesActionsTypes.CREATE_RIDE_SUCCESS
}

export function createRideSuccess(): CreateRideSuccessAction {
	return {
		type: RidesActionsTypes.CREATE_RIDE_SUCCESS
	};
}

export interface CreateRideFailedAction extends Action {
	type: RidesActionsTypes.CREATE_RIDE_FAILED,
	payload: { error: string }
}

export function createRideFailed(error: string): CreateRideFailedAction {
	return {
		type: RidesActionsTypes.CREATE_RIDE_FAILED,
		payload: {error}
	};
}

export interface FindRideAction extends Action {
	type: RidesActionsTypes.FIND_RIDE;
	payload: FindRide;
}

export function findRideAction(payload: FindRide): FindRideAction {
	return {
		type: RidesActionsTypes.FIND_RIDE,
		payload
	};
}

export interface FindRideSuccessAction extends Action {
	type: RidesActionsTypes.FIND_RIDE_SUCCESS;
	payload: { items: FoundRide[] }
}

export function findRideSuccessAction(payload: { items: FoundRide[] }): FindRideSuccessAction {
	return {
		type: RidesActionsTypes.FIND_RIDE_SUCCESS,
		payload
	};
}

export interface FindRideFailedAction extends Action {
	type: RidesActionsTypes.FIND_RIDE_FAILED,
	payload: { error: string }
}

export function findRideFailedAction(error: string): FindRideFailedAction {
	return {
		type: RidesActionsTypes.FIND_RIDE_FAILED,
		payload: {error}
	};
}

export interface LoadAddressSuggestionsAction extends Action {
	type: RidesActionsTypes.LOAD_ADDRESS_SUGGESTIONS;
	payload: { term: string };
}

export function loadAddressSuggestionsAction(term: string): LoadAddressSuggestionsAction {
	return {
		type: RidesActionsTypes.LOAD_ADDRESS_SUGGESTIONS,
		payload: {
			term
		}
	};
}

export interface LoadAddressSuggestionsSuccessAction extends Action {
	type: RidesActionsTypes.LOAD_ADDRESS_SUGGESTIONS_SUCCESS;
	payload: { items: AddressSuggestion[] };
}

export function loadAddressSuggestionsSuccessAction(payload: { items: AddressSuggestion[] }): LoadAddressSuggestionsSuccessAction {
	return {
		type: RidesActionsTypes.LOAD_ADDRESS_SUGGESTIONS_SUCCESS,
		payload
	};
}

export interface LoadAddressSuggestionsFailed extends Action {
	type: RidesActionsTypes.LOAD_ADDRESS_SUGGESTIONS_FAILED,
	payload: { error: string }
}

export function loadAddressSuggestionsFailed(error: string): LoadAddressSuggestionsFailed {
	return {
		type: RidesActionsTypes.LOAD_ADDRESS_SUGGESTIONS_FAILED,
		payload: {error}
	};
}

export interface ClearAddressSuggestionsAction extends Action {
	type: RidesActionsTypes.CLEAR_ADDRESS_SUGGESTIONS
}

export function clearAddressSuggestionsAction(error: string): ClearAddressSuggestionsAction {
	return {
		type: RidesActionsTypes.CLEAR_ADDRESS_SUGGESTIONS
	};
}

export type RidesActions = CreateRideAction
	| CreateRideSuccessAction
	| CreateRideFailedAction
	| FindRideAction
	| FindRideSuccessAction
	| FindRideFailedAction
	| LoadAddressSuggestionsAction
	| LoadAddressSuggestionsSuccessAction
	| LoadAddressSuggestionsFailed
	| ClearAddressSuggestionsAction;
