export interface Announcement {
  idAnnouncement: number;
  refAnnouncement: string;
  weightAvailable: number;
  description: string;
  dateOfDeparture: Date;
  destination: string;
  price: number;
  status: boolean;
  dateCreation: Date;
}
