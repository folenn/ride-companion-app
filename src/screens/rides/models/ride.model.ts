import {Coordinate} from './coordinate.model';

export interface Ride {
	date: Date;
	coordinates: Coordinate[];
	rideFromName: string;
	rideToName: string;
	passengersCount: number | string;
	owner?: string;
}
