import {Component, Input, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {LhcDataService} from '../../lib/lhc-data.service';
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import { CommonUtilsService } from "../../lib/common-utils.service";
import { it_IT } from "ng-zorro-antd/i18n";
import { NzI18nService } from "ng-zorro-antd/i18n";

@Component({
  selector: 'lhc-item-date',
  templateUrl: './lhc-item-date.component.html',
  styleUrls: ['./lhc-item-date.component.css'],
})
export class LhcItemDateComponent implements AfterViewInit {
  
  @Input() item: any;

  @ViewChild('nzDatePickerComponent')
  nzDatePickerComponent: NzDatePickerComponent;

  constructor(
    public lhcDataService: LhcDataService,
    private commonUtilsService: CommonUtilsService,
    private i18n: NzI18nService
  ) {}


  ngAfterViewInit() {
    // Set aria-label attribute of the actual <input> element.
    // It should have just worked by passing [nzId] into <nz-date-picker>, but the library
    // (which we have no control of) creates another wrapper element with same id which
    // messes with the aria label association.
    this.nzDatePickerComponent.pickerInput.nativeElement.setAttribute(
      'aria-label',
      this.commonUtilsService.getAriaLabel(this.item)
    );
  }
  ngOnInit() {
    this.i18n.setLocale(it_IT);
  }
  /**
   * model change event handler
   * @param value the new date/time
   * Note: 1) need to put (ngModelChange) before [(ngMode)] in the template.
   *       2) use [ngModel] like in other compoments does not work as expected.
   */
  onModelChange(value: Date): void {
    
    let prevValue = this.item.value;

    this.item.value = value;
    this.lhcDataService.onItemValueChange(this.item, this.item.value, prevValue)
  }
}
