import { Injectable } from "@angular/core";

@Injectable()
export class ErrorService {
    private error: string;

    setError (error: string) {
        this.error = error;
    }

    getError (): string {
        return this.error;
    }
}