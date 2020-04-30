import { Component, OnInit, Input } from '@angular/core';
import { DBService } from 'src/app/core/services';
import { Repository } from '../../types';

@Component({
  selector: 'app-starred_repositories',
  templateUrl: './starred_repositories.component.html',
  styleUrls: ['./starred_repositories.component.css']
})
export class StarredRepositoriesComponent implements OnInit {

  items: Repository[]
  constructor(private readonly dbService: DBService) {

  }


  ngOnInit() {
    this.load();
  }

  load() {
    this.items = this.dbService.getStarRepo();

  }





}
