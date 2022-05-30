import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TabsModule.forRoot()
  ],
  exports: [
    CommonModule,
    TabsModule
  ]
})
export class SharedModule {}
