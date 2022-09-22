import { Injectable } from "@angular/core";

//@Injectable({providedIn: 'root'})
export class LoggingService{
    private log!: string;

    public writeLog(message: string){
        console.log('Last Log:', this.log);
        console.log('New Log:', message);
        this.log = message;
    }
}