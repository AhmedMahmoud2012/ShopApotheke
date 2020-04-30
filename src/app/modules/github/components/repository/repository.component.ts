import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Repository } from '../../types';
import { DBService } from 'src/app/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {

  @Input() item: Repository;
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  constructor(private readonly dbService: DBService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  star_repo() {
    let msg = '';
    if (this.isStarred()) {
      if (this.dbService.unStarRepo(this.item)) {
        msg = `You Unstared the repo ${this.item.name} successfully!`
        this.change.emit(true);
      } else {
        msg = `there are errors`;
      }
    } else {
      if (this.dbService.starRepo(this.item)) {
        msg = `You Starred the repo ${this.item.name} successfully!`
      } else {
        msg = `there are errors`;
      }
    }
    this.snackBar.open(msg);
  }

  isStarred() {
    return this.dbService.getStarRepoIds().includes(this.item.id);
  }
}
