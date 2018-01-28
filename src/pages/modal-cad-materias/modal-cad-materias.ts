import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { UserProvider } from "../../providers/user/user";


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
      message: "Adicione abaixo a matéria para cadastrar suas futuras pendências",
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
            if (data.nome != '') {
              this.insertMateriasItem(data);
            }
            else {
              let alert = this.alertCtrl.create({
                title: 'Hey!',
                subTitle: 'Preencha o nome da matéria',
                buttons: ['OK']
              });
              alert.present();
            }

          }
        }
      ]
    });
    prompt.present();
  }

  loadMateriasItens() {
    console.log("LOAD ITENS");
    this.userService.getStorageData().subscribe(
      data => this.materiasOption = data,
      err => console.log(err),
    );
  }

  loadSemNode() {
    this.materiasOption = this.userService.getStorageData();
    console.log('SEMNODE: '+this.materiasOption);
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
