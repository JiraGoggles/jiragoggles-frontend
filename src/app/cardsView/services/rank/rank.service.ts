import {BaseCardService} from "../base-card.service";
import {Http} from "@angular/http";
import {AppAuthenticationService} from "../../../app-authentication.service";
import {Injectable} from "@angular/core";

@Injectable()
export class RankService extends BaseCardService {

    constructor(protected http: Http, pluginAuth: AppAuthenticationService) {
        super(http, pluginAuth);
    }

    rankIssue(id: string, direction: string, referenceId: string): void {
        this._put(`api/rank/issue/${id}/${direction}/${referenceId}`).subscribe();
    }
}
