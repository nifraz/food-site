import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { LoggingService } from "./logging.service";
import { RecipesService } from "./recipes/recipes.service";
import { ShoppingService } from "./shopping-list/shopping.service";

@NgModule({
    providers: [
        RecipesService,
        ShoppingService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        },
        //LoggingService
    ]
})
export class CoreModule { }