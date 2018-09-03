export class Event {
    id: string;
    name: string;
    date: Date;
} 

export class Invitees {
    Name:string;
    Email:string;
}

export class NewGame {
    Name: string;
    Email: string;
    ResponseUrl:string;
    Location: string;
    EventDateAndTime: Date;
    Invitees: Invitees[];

}