import { NgModule, SkipSelf, Optional } from "@angular/core";
import { AuthService } from "../office/services/auth.service";
import { ConfigService } from "../office/services/config.service";
import { ErrorService } from "../office/services/error.service";
import { NotifyService } from "../office/components/notify/notify.service";

@NgModule({
    providers: [
        AuthService,
        ConfigService,
        ErrorService,
        NotifyService
    ]
})
export class CoreModule {
    constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}