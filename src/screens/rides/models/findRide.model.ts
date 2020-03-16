export interface FindRide {
	rideFrom: string;
	rideTo: string;
	date: Date;
	passengersCount: number | string;
}

export interface FoundRide {
	passengers: string[];
	passengersCount: number;
	rideFromName: string;
	rideToName: string;
	date: Date;
}
