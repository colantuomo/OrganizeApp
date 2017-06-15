import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { UserProvider } from "../../providers/user/user";

/**
 * Generated class for the ModalCadMateriasPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modal-cad-materias',
  templateUrl: 'modal-cad-materias.html',
})
export class ModalCadMateriasPage {

  private materiasOption: any = [];
  //private materia: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public userService: UserProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalCadMateriasPage');
    //this.loadMateriasItens();
    this.loadSemNode();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  //MATERIAS INSERT/GET NODE
  cadMaterias() {
    let prompt = this.alertCtrl.create({
      title: 'Nova matéria',
      message: "Adicione abaixo o nome para cadastrar suas futuras pendências",
      inputs: [
        {
          name: 'nome',
          placeholder: 'Matéria'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Salvar',
          handler: data => {
            console.log(data);
            this.insertMateriasItem(data);
          }
        }
      ]
    });
    prompt.present();
  }

  loadMateriasItens() {
    console.log("LOAD ITENS");
    this.userService.getMateriasData().subscribe(
      data => this.materiasOption = data,
      err => console.log(err),
    );
  }

  loadSemNode(){
    this.materiasOption = this.userService.getMateriasData();
  }

  insertMateriasItem(materias: string) {
    console.log(this.materiasOption);
    this.userService.insertMateriasData(materias);
    //this.materiasOption.push(materias);
  }

  deleteItem(materias: string) {
    this.userService.deleteMateriasData(materias);
    let i = this.materiasOption.indexOf(materias);
    this.materiasOption.splice(i, 1);

    console.log(this.materiasOption);
  }


}
