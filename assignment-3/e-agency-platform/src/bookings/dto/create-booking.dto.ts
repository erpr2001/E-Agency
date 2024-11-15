export class CreateBookingDto {
    readonly bookingId: string;
    readonly userId: string;
    readonly agencyId: string;
    readonly bookingDate: Date;
    readonly bookingStatus: string;
    readonly notes?: string;
}