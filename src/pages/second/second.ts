import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events, AlertController } from 'ionic-angular';
import { UserProvider } from "../../providers/user/user";

/**
 * Generated class for the SecondPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-second',
  templateUrl: 'second.html',
})
export class SecondPage {

  materiaSelect: any;
  materia: string;
  pendencia: string;
  dtEntrega: Date;

  materiasOption: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public events: Events, public userService: UserProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    //this.loadMateriasItens();
    this.loadSemNode();
  }

  addRecipe() {
    if(this.isValid()){
      let dtHoje = new Date();
      let data = {
        materia: this.materiaSelect,
        pendencia: this.pendencia,
        dtEntrega: this.dtEntrega,
        dtHoje: dtHoje
      };

      let dtEntr = this.dtEntrega;
      this.events.publish('recipe:added', dtEntr);
      this.userService.insertData(data);
      this.viewCtrl.dismiss();
    }else{
      let alert = this.alertCtrl.create({
      title: 'Hey!',
      subTitle: 'Você esqueceu de preencher algum campo',
      buttons: ['OK']
    });
    alert.present();
    }
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  loadMateriasItens() {
    this.userService.getMateriasData().subscribe(
      data => this.materiasOption = data,
      err => console.log(err),
    );
  }

  loadSemNode() {
    this.materiasOption = this.userService.getMateriasData();
  }

  isValid(){
    let matSelect = typeof this.materiaSelect != 'undefined';
    let pend = typeof this.pendencia != 'undefined';
    let datePend = typeof this.dtEntrega != 'undefined';

    if(matSelect && pend && datePend)
      return true

    return false
  }
}
