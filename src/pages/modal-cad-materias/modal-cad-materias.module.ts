import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalCadMateriasPage } from './modal-cad-materias';

@NgModule({
  declarations: [
    ModalCadMateriasPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalCadMateriasPage),
  ],
  exports: [
    ModalCadMateriasPage
  ]
})
export class ModalCadMateriasPageModule {}
