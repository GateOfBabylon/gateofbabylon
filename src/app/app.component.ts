import {Component} from '@angular/core';
import {ShellComponent} from './layout/shell/shell.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [ShellComponent],
    templateUrl: './app.component.html'
})
export class AppComponent {
}
