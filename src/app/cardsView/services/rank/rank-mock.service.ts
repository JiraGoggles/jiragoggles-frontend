import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {BaseCardMockService} from "../base-card-mock.service";

@Injectable()
export class RankMockService extends BaseCardMockService {

    constructor(http: Http) {
        super(http);
    }

    protected get path(): string {
        return " ";
    }

    rankIssue(id: string, direction: string, referenceId: string) {
        console.log(id, direction, referenceId);
    }
}
