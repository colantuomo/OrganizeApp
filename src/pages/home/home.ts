import { Component } from '@angular/core';
import { NavController, ModalController, Events, AlertController } from 'ionic-angular';
import { SecondPage } from "../second/second";
import { UserProvider } from "../../providers/user/user";
import { ModalCadMateriasPage } from "../modal-cad-materias/modal-cad-materias";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public pendencia: any = [];
  public materiasOption: any = [];
  public dtHoje: any = new Date();
  public dtPendencia: any;


  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public userService: UserProvider,
    public events: Events,  public alertCtrl: AlertController) {
    this.loadItens();
  }

  ionViewDidLoad() {
    // this.events.subscribe('recipe:added', (data) => {
    //   this.dtPendencia = data;
    // });
    this.loadItens();
  }

  //---------------------------------------------------------
  loadItens() {
    // this.userService.getData().subscribe(
    //   data => this.pendencia = data,
    //   err => console.log(err),
    // );
    this.pendencia = this.userService.getData();
    console.log(this.dtPendencia);
  }

  launchSecondPage() {
    let modal = this.modalCtrl.create(SecondPage);
    modal.present();
  }
  launchCadMateriasPage() {
    let modal = this.modalCtrl.create(ModalCadMateriasPage);
    modal.present();
  }

  insertItem(pend: any) {
    this.userService.insertData(pend);
  }

  deleteItem(pendencia: any) {
    this.userService.deleteData(pendencia);
    let i = this.pendencia.indexOf(pendencia);
    this.pendencia.splice(i, 1);
  }

  getFormatedTodayDate() {
    let dtSplit: string = this.dtHoje + "";
    let split: string[] = dtSplit.split(" ");
    let dt = split[2];
    return dt;
  }

  getFormatedPendDate(dtPend: any) {
    let dtSplit: string = dtPend + "";
    let split: string[] = dtSplit.split("-");
    let dt = split[2];
    return dt;
  }

   showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Olá! :)',
      subTitle: 'Usar o Organize é simples! Cadastre suas matérias e após isso as pendências conforme necessário. Experimente!',
      buttons: ['OK']
    });
    alert.present();
  }

}
