import { User } from "./user";
import { Responses } from "./responses";

export class EventDetails {
    EventDateAndTime: Date;
    location: string;
    team1: User[];
    team2: User[];
    responses: Responses[]
}
