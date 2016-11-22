import { NgModule } from '@angular/core';
import { Language } from '../pipes/language';
@NgModule({
    declarations: [ Language ],
    exports: [ Language ],
    providers: [ Language ]
})
export class LanguageModule {}