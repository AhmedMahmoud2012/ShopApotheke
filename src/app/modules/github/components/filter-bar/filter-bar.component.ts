import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { format } from 'date-fns'
import { FilterOptions, Language } from '../../types';
import { GithubService } from '../../services';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterbarComponent implements OnInit {
  @Output() change: EventEmitter<FilterOptions> = new EventEmitter();
  dataRangeFrom: FormGroup;
  languages: Language[] = [];
  constructor(private readonly formBuilder: FormBuilder, private readonly service: GithubService) {
    const currentDate = new Date();
    const defaultEndDate = currentDate;
    const defaultStartDate = new Date(+currentDate - (60 * 60 * 1000 * 24 * 7)) // 7 days before
    this.dataRangeFrom = this.formBuilder.group({
      startDate: [defaultStartDate, Validators.compose([Validators.required])],
      endDate: [defaultEndDate, Validators.compose([Validators.required])],
      lang: ['all', Validators.compose([Validators.required])]
    })
    this.languages = this.service.languages;
  }

  ngOnInit() {
    this.applyFilter();
  }

  applyFilter() {
    if (this.dataRangeFrom.valid) {
      const { startDate, endDate, lang } = this.dataRangeFrom.value;
      this.change.emit({
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(endDate, 'yyyy-MM-dd'),
        lang: lang !== 'all' ? lang : null
      })
    }
  }
}
