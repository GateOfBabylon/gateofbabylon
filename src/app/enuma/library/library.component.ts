import {Component} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-library',
  imports: [
    NgForOf
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent {
  projects = ['EA project 1', 'EA project 2', 'EA project 3', 'EA project 4'];
}
