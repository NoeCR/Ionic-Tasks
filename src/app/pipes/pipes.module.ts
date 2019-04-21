import { NgModule } from '@angular/core';
import { CapitalizePipe } from './capitalize.pipe';
import { FilterCompletedPipe } from './filter-completed.pipe';

@NgModule({
  declarations: [FilterCompletedPipe, CapitalizePipe],
  imports: [],
  exports: [FilterCompletedPipe, CapitalizePipe]
})
export class PipesModule { }
