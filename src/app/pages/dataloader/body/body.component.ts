import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { UploadService } from '../upload/upload.service';
import { Router, ActivatedRoute,Event,NavigationEnd,RoutesRecognized } from '@angular/router';
import { Subscription } from 'rxjs';
import { MetadataService } from '../datalister/metadata.service';
import { DataService } from "../body/data.service";
import { MigrateService } from '../datalister/migrate.service';
import { DatalisterComponent } from '../datalister/datalister.component';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AgGridAngular  } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid-community';
//import swal from 'sweetalert';
//import Swal from 'sweetalert2'
import { filter, pairwise } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import { NgxSmartModalService } from 'ngx-smart-modal';
//import { resetState } from 'sweetalert/typings/modules/state';
import * as Globals from '../../../globals';
import * as CryptoJS from 'crypto-js';

 

@Component({
  selector: 'app-body',
  providers: [MigrateService, MetadataService, DataService],
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  //@ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  openModal = false;
  showMapOptions = false;
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  addmapTitle = "Create New Map";
  mapName = 'Untitled Map';
  mapDesc='';
  title = 'angularpopup';
  truncateLayerData = false;
  selection = {};
  formSubmitted = false;
  showMapModal: boolean;
  showUploadPane: boolean;
  showHelpTip;
  userHistory :any;
  paginationPageSize=8;
  showHistoryPane= false;
  showHelpPane = false;
  registerForm: FormGroup;
  submitted = false;
  dataloaderProgress;
  serverstate;
  disableAddMap = false;
  disableAddLayers = true;
  disableMigrate = true;
  disableMapping = true;
  historyWaterMark = "No Previous Transactions";
  watermark = "Create New Map";
  uploadbtnlbl = "UPLOAD";
  disableUploadBtn= false;
  timestamp;
  filesInfo = [];
  private subscriptions: Subscription[] = [];
  domain;
  files: any[] = [];
  serverfiles;
  serverdata;
  servermappingdata;
  showSpinner;
  selectedDataFormat;
  allowedExtensionsForShp = ['shp', 'dbf', 'shx', 'prj'];
  allFormatsForShp = ['shp','dfx','dbf','shx','prj','cpg','sbn','sbx']
  showOptions = false;
  uploadLabel = "";
  disableClearall = false;
  disableUpload = false;
  duplicateLayers;
  clickEventsubscription:Subscription;
  // activeButton = false;
  // isActive;
  toggle = false;
  isValue: number = 0;

  gridOptions:GridOptions;
  defaultColDef= {
    flex: 1,
    maxWidth: 200
    
  }

  filterParams = {
    comparator: function (filterLocalDateAtMidnight, cellValue) {
      var dateAsString = cellValue;
      if (dateAsString == null) return -1;
      var dateParts = dateAsString.split(' ')[0].split('-')
      var cellDate = new Date(
        Number(dateParts[0]),
        Number(dateParts[1]) - 1,
        Number(dateParts[2])
      );
      if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
        return 0;
      }
      if (cellDate < filterLocalDateAtMidnight) {
        return -1;
      }
      if (cellDate > filterLocalDateAtMidnight) {
        return 1;
      }
    },
    browserDatePicker: true,
    minValidYear: 2000,
  };
  
    // then set individual column definitions
    columnDefs= [
        // filter not specified, defaultColDef setting is used
        { field: 'map_name', headerName:'Map Name',sortable: true, filter: true },
        
        { field: 'domain', headerName:'Domain', sortable: true, filter: true },
        
        { field: 'date_time', filterParams:this.filterParams ,filter: 'agDateColumnFilter', headerName:'Timestamp (UTC)', sortable: true },
        
        { field: 'percentage', headerName:'Compatibility', sortable: true, filter: true },
        { field: 'status', headerName:'Status', sortable: true, filter: true },
        
        { field: 'target_collections_mapped',headerName:'Mapped Collections', sortable: true, filter: true },
        { field: 'description', headerName:'Description', sortable: true, filter: true }
        
    ];

    

    



  constructor(public dialog: MatDialog, public ngxSmartModalService: NgxSmartModalService, private data: DataService, private toastr: ToastrService, private formBuilder: FormBuilder, public metadataService: MetadataService, private router: Router, public uploadService: UploadService, public migrateService: MigrateService,private activatedRoute: ActivatedRoute  ) { 
    
  }

  showMapInfo() {
    // this.toggle = !this.toggle;
    this.isValue = 1;
    this.ngxSmartModalService.getModal('mapModal').open();
    
    


  }
  //Bootstrap Modal Close event
  hideMapInfo() {
    this.submitted=false;
    this.ngxSmartModalService.resetModalData('mapModal')

    if (this.registerForm.dirty) {
      //this.formGroupDirective.resetForm();
      this.registerForm.reset();

    }
    this.ngxSmartModalService.getModal('mapModal').close();
    this.mapName = "Untitled Map";


  }

  showUpload(format) {
    this.isValue = 2;
    this.uploadLabel = "Upload " + format + " Layers";
    this.selectedDataFormat = format;
    this.showUploadPane = true; // Show-Hide Modal Check

  }
  //Bootstrap Modal Close event
  hideUpload() {
    this.deleteAllFiles();
    this.showUploadPane = false;
  }

  
  //Close upload model
  closeUploadModel(){
    this.deleteAllFiles();
    this.showUploadPane = false;
  }


showHelpModal(){
  this.showHelpPane = true;
  var tmp = JSON;
    tmp["showHelpPane"] = this.showHelpPane;
    this.data.changeHelpInput(tmp);
  
}
closeHelpModel(){
this.showHelpPane = false;
}
  ngOnInit() {
    this.showHelpPane = true;
    console.log('In init again');
    $('.custom-progressbar').width('0%');
    $('.custom-progressbar-pending').width('0%');
    //this.dataloaderProgress='0%';
    
    // this.router.events.subscribe((event: Event) => {
    //   if(event instanceof NavigationEnd){
    //       console.log(event);
    //   }
      this.router.events
      .pipe(filter((e: any) => e instanceof RoutesRecognized),
          pairwise()
      ).subscribe((e: any) => {
          console.log(e[0].urlAfterRedirects); // previous url
          
            
                if(e[0].urlAfterRedirects=="/mainLayout/dataloader/mapping" &&
                e[1].urlAfterRedirects=="/mainLayout/dataloader"){
                  this.disableAddLayers = false;
                  $('.custom-progressbar').width('25%');
                  $('.custom-progressbar-pending').width('75%');
                  this.dataloaderProgress='25%';
                  this.isValue=2;
                  this.watermark = 'Add layers';
                  this.disableMapping= true;
                  this.disableUploadBtn = false;
                  console.log(this.showUploadPane,(this.watermark === 'Add layers' && !this.showUploadPane));
                }

                if(e[0].urlAfterRedirects=="/mainLayout/dataloader/datamapper" &&
                e[1].urlAfterRedirects=="/mainLayout/dataloader"){
                  this.migrateData();
                  $('.custom-progressbar').width('100%');
                  $('.custom-progressbar-pending').width('0%');
                   this.dataloaderProgress='100%'; 

                  this.data.getClickEvent().subscribe(()=>{
                    console.log('Migrating');
                    this.migrateData();
                    })
              
                }

                if(e[0].urlAfterRedirects=="/mainLayout/dataloader/datamapper" &&
                e[1].urlAfterRedirects=="/mainLayout/dataloader/mapping"){
                 
                  $('.custom-progressbar').width('50%');
                  $('.custom-progressbar-pending').width('50%');
                  this.dataloaderProgress='50%';
                 this.disableMapping=false;
                }
            
                    
      });
   
  //});

    //this.data.currentMappingBtnstate.subscribe(disable => this.disableMapping = disable)
    this.data.currentHelpInput.subscribe(help => this.showHelpTip = help)
    this.data.currentMessage.subscribe(message => this.serverdata = message)
    this.data.currentFiles.subscribe(files => this.serverfiles = files)
    this.data.currentMappingData.subscribe(mappingdata => this.servermappingdata = mappingdata)
   
    

console.log(this.serverstate);
this.activatedRoute.queryParams.subscribe(params => {
  console.log("whats wrong")
});
  
    this.registerForm = this.formBuilder.group({

      inlineRadioOptions: ['', [Validators.required]],

      mapname: ['', [Validators.required, Validators.minLength(2)]],
      mapDesc: ['']

    });


    if (JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8)).privilege[Globals.Privileges['category']] == 0) {
      this.registerForm.disable();
    }
    this.gridOptions = {} as GridOptions;
    this.fetchUserHistory()
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  fetchUserHistory(){

    //this.userHistory = [{"name":"sindhu","loc":"india"},{"name":"sindhu","loc":"aus"}]
    

    
    this.subscriptions.push(this.metadataService.getUserHistory(this.loginDetails.username).subscribe(response => {
      console.log(response);
     this.userHistory = response;


      if(this.userHistory.length==0){
        
        this.showHistoryPane=false;
      }else{
        
        this.gridOptions.columnDefs = this.columnDefs;
        this.gridOptions.rowData = this.userHistory;
   
        this.showHistoryPane = true;
      }
  console.log(this.showHistoryPane);

    },
    //start change: sweet alert - naveen
     /* async error => {
      console.log('error from Snow Database is', error)
      this.showSpinner = false;
      //  alert('Unable to access server or Snow DB');
      const proceed = await swal('', 'Unable to access server or Snow DB', 'warning')

      if (proceed) {
        this.router.navigate(['mainLayout/dataloader']).then(() => {
          window.location.reload();
        });
      }

    })); */
    error =>{  
      this.toastr.warning("Unable to access SNOW Server/Database, Please contact administrator.");
      //alert('Unable to access SNOW Server/Database, Please contact administrator.');
      this.router.navigate(['mainLayout/dataloader']).then(() => {
       window.location.reload();
      });
  
    }));
    //end change: sweet alert - naveen
  
}
  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {

      return false;
    } else {
      //alert(JSON.stringify(this.registerForm.value))
    }
    if (this.submitted) {
      //alert(JSON.stringify(this.registerForm.value))
      this.domain = this.registerForm.value['inlineRadioOptions'];
      //this.showMapModal = false;
      this.ngxSmartModalService.getModal('mapModal').close();
      this.disableAddMap = true;
      $('.custom-progressbar').width('25%');
      $('.custom-progressbar-pending').width('75%');
      this.dataloaderProgress='25%';
      this.disableAddLayers = false;
      this.disableMapping = true;
      this.disableMigrate = true;
      this.showHistoryPane=false;
      this.watermark = "Add layers";
      this.mapName = this.registerForm.value['mapname'];
      this.mapDesc = this.registerForm.value['mapDesc'];

    }

  }

  onUpload() {
   // this.validateMappedLayers();
    this.showSpinner = true;
    this.disableUpload = true;
    this.disableUploadBtn = true;
    this.uploadFilesSimulator(0);
    

  }


  validateMappedLayers(srcLayers){
    var valid = true;
    var duplicateLayers =[];
    var srcLayerList=[];
    srcLayers.forEach(srcLayer => {
      srcLayerList.push(srcLayer.name);
 });

 this.userHistory.forEach(userRecord => {
    var layersInHistory = userRecord["src_collections_mapped"];

    srcLayerList.forEach(inputLayer => {
      if(layersInHistory.includes(inputLayer)){
        duplicateLayers.push(inputLayer);
        valid = false;
       // return;
        
      }
    });
 });

return duplicateLayers;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
     panelClass: 'myapp-dialog' });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.mapName = 'Untitled Map';
      this.router.navigate(['mainLayout/dataloader']).then(() => {
        window.location.reload();
      });

      // this.animal = result;
    });
  }

  //Upload



  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    console.log('validating shape fmt');
    var shapeFilesExtAry = {};
    const allowedExtns = this.allowedExtensionsForShp.slice().sort();
    for (var file of files) {
      var ext = file.name.split('.').pop();
      var name = file.name.replace("." + ext, "");
      if (shapeFilesExtAry[name] != null && shapeFilesExtAry[name].length != 0) {

        shapeFilesExtAry[name].push(ext);
      } else {
        shapeFilesExtAry[name] = [ext];
      }

      if (this.selectedDataFormat == "kml" && ext != "kml") {
        // alert('Please choose a valid kml file');
        this.toastr.warning('Please choose a valid kml file')

        return;
      }
      if (this.selectedDataFormat == "shape" && !this.allFormatsForShp.includes(ext)) {
        //alert('Please choose a valid shape file');
        this.toastr.warning('Please choose a valid shape file')

        return;
      }
    }
    if (this.selectedDataFormat == "shape") {
      var extlst = [];
      for (var key in shapeFilesExtAry) {
        extlst = shapeFilesExtAry[key];
        extlst = extlst.slice().sort();
        var obj = {};
 
//single loop - O(n)
extlst.forEach((el, index) => {
    obj[el] = index;
});

        var allMandatoryFormatsExist =  allowedExtns.every((el) => {
          return obj[el] !== undefined; //because 0 is falsy
        });
        //check will be true in this case
        //check will be true in this case
        if (extlst.length < 4 || !allMandatoryFormatsExist) {

          this.toastr.warning('Please choose valid shape data for layer \n' + key)
          return;
        }


      }

    }
    this.prepareFilesList(files);
  }

  deleteAllFiles() {
    this.files = [];
    this.resetFilerepo();
    this.uploadbtnlbl = "UPLOAD";
    this.disableUpload = false;

  }
  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {

    var fileToBDeleted = this.files[index];
    var ext = fileToBDeleted.name.split('.').pop();
    var nameToBeDeleted = fileToBDeleted.name.replace("." + ext, "");
    if (this.allFormatsForShp.includes(ext)) {


      for (let i = this.files.length - 1; i >= 0; i--) {
        const tmpfile = this.files[i];
        var tmpext = tmpfile.name.split('.').pop();
        var tmpname = tmpfile.name.replace("." + tmpext, "");
        if (tmpname == nameToBeDeleted) {
          this.files.splice(i, 1);
        }
      }
    } else {
      this.files.splice(index, 1);
    }
    console.log("Deleting.." + index);
    this.resetFilerepo();
    console.log("File size.." + this.files.length);
  }

  resetFilerepo() {
    var tmp = JSON;
    tmp["files"] = this.files;
    this.data.changeFilesSource(tmp);
    this.filesInfo = [];
    this.files.forEach(file => {
      this.filesInfo.push(file.name);
    });
    if (this.files.length == 0) {
      this.showOptions = false;
    }

    this.uploadbtnlbl = "UPLOAD";
    this.disableUpload = false;
  }

  confirmDelete(action:string) {
    if(action == 'Yes'){
      
        
  }
}


  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    if (this.uploadbtnlbl == "FINISH") {
      this.disableUpload = false;
      if (this.files.length == 0) {
        return;
      }
      this.showSpinner = true;
      console.log('ssadsa', this.showSpinner);
      this.showUploadPane = false;
      this.disableAddMap = true;
      this.disableAddLayers = true;
      this.timestamp = new Date().getTime() + "";
      // start the upload and save the progress map
      console.log(this.files.length);
      //var res = this.uploadService.upload(this.files,this.timestamp);
      this.uploadService.upload(this.files, this.timestamp).subscribe(
        res => {

          this.resetFilerepo();
          console.log("res", res);
          this.watermark = "";

          console.log(this.timestamp, this.filesInfo, this.domain, this.registerForm['inlineRadioOptions']);


          // this.domain = params.domain;
          //console.log(this.domain,params.domain);
          var tmpqueryParams = JSON;
          this.subscriptions.push(this.metadataService.getMetaDataUserDb(this.timestamp, this.filesInfo).subscribe((response) => {
            console.log("frst");
            this.subscriptions.push(this.metadataService.getMetaDataFromUserFileDb(this.timestamp).subscribe(async (filedbresponse) => {
              console.log("checking srs here");
              if (filedbresponse["jsondata"] != null && filedbresponse["jsondata"].length != 0 && filedbresponse["srcdata"] != null
               && this.checkForValidSrs(filedbresponse["srcdata"])  && 
               this.validateFeatureCount(filedbresponse["jsondata"])) {
                this.duplicateLayers = this.validateMappedLayers(filedbresponse["srcdata"]);
                 if(this.duplicateLayers.length!=0){
                   if(!confirm('There are few layers in the uploaded data that have been mapped already. Would you like to overwrite the data?')){
                     
                    this.disableAddMap = true;
                    this.disableAddLayers = false;
                    $('.custom-progressbar').width('25%');
                    $('.custom-progressbar-pending').width('75%');
                    this.dataloaderProgress='25%';
                    this.showSpinner = false;
                    this.disableUploadBtn = false;
                    this.deleteAllFiles();
                    return;
                   }else{
                     this.truncateLayerData= true;
                   }
                   console.log('don come here');
                 }
                 console.log('don come here');
            
                tmpqueryParams["userdbresponse"] = filedbresponse;
              } else {

                //this.openModal=true;

                // start change: sweet alert - naveen
                /* const proceed = await ({

                  text: "Error occured while processing the uploaded data. Please choose valid data.",
                  icon: "warning",
                  dangerMode: true,
                })

                
              
                
                if (proceed) {
                  this.disableAddMap = true;
                  this.disableAddLayers = false;
                  $('.custom-progressbar').width('25%');
                  $('.custom-progressbar-pending').width('75%');
                  this.dataloaderProgress='25%';
                  this.showSpinner = false;
                  this.disableUploadBtn = false;
                  this.deleteAllFiles();
                  this.router.navigate(['mainLayout/dataloader']);
                  return;
                  /* this.router.navigate(['mainLayout/dataloader']).then(() => {
                     window.location.reload();
                   });*/
                //}*/
                this.toastr.error('', 'Invalid User Data.',{timeOut: 50000})
                //alert("Error occured while processing the uploaded data. Please choose valid data.")
                this.disableAddMap = true;
                this.disableAddLayers = false;
                this.showSpinner = false;
                this.disableUploadBtn = false;
                this.deleteAllFiles();
                this.router.navigate(['mainLayout/dataloader']).then(() => {
                       // window.location.reload();
                      });
                return;
                // end of change: sweet alert - naveen

              }
              this.subscriptions.push(this.metadataService.getMetaDataSnowDb(this.domain).subscribe(response => {

                var tmpMetadata = response;
                tmpqueryParams["metadata"] = tmpMetadata;

                console.log(tmpqueryParams);
                tmpqueryParams["timestamp"] = this.timestamp;
                this.data.changeMessage(tmpqueryParams);

                console.log("................", this.serverdata);
                this.disableAddMap = true;
                this.disableAddLayers = true;
                this.disableMapping = false;
                $('.custom-progressbar').width('50%');
                $('.custom-progressbar-pending').width('50%');
                this.dataloaderProgress='50%';
                this.disableMigrate = true;
                this.showSpinner = false;
                this.router.navigate(['mainLayout/dataloader/mapping'], {
                  queryParams: {}
                });


              }, 
              /*async error => {
                console.log('error from Snow Database is', error)
                this.showSpinner = false;
                //  alert('Unable to access server or Snow DB');
                const proceed = await swal('', 'Unable to access server or Snow DB', 'warning')

                if (proceed) {
                  this.router.navigate(['mainLayout/dataloader']).then(() => {
                  window.location.reload();
                  });
                }

              } */
              error =>{
                console.log('error from Snow Database is', error)
                this.showSpinner = false;
                this.toastr.error('','Unable to access server',{timeOut: 10000})
                this.router.navigate(['mainLayout/dataloader']).then(() => {
                  window.location.reload();
                });
              }
              
              ));
            }, 
            /*async error => {
              console.log('error from Snow Database is', error)
              this.showSpinner = false;
              //alert('Error in processing User data');

              const proceed = await swal('', 'Error in processing User data', 'warning')

              if (proceed) {
                this.router.navigate(['mainLayout/dataloader']).then(() => {
                  window.location.reload();
                });
              }

            } */
            error =>{
              console.log('error from Snow Database is', error)
              this.showSpinner = false;
              this.toastr.error('', 'Error in processing User data',{timeOut: 10000})
              this.router.navigate(['mainLayout/dataloader']).then(() => {
                      window.location.reload();
              });
            }

            ));
          },
          /* async (error) => {
            console.log('error from user files is', error)
            this.showSpinner = false;
            //alert('Error while fetching Data from Snow DB');

            const proceed = await swal('', 'Error while fetching Data from Snow DB', 'warning')

            if (proceed) {
              this.router.navigate(['mainLayout/dataloader']).then(() => {
                window.location.reload();
              });
            }
          } */
          error =>{
            console.log('error from user files is', error)
            this.showSpinner = false;
            this.toastr.error('', 'Error while fetching Data',{timeOut: 10000})
            this.router.navigate(['mainLayout/dataloader']).then(() => {
              window.location.reload();
           
      });
          }

          ));

        })
      return;
    }


    setTimeout(() => {
      if (index === this.files.length) {
        this.uploadbtnlbl = "FINISH";
        this.disableUpload = false;
        this.disableUploadBtn = false;
        this.showSpinner = false;
        return;
      } else {



        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 100;
          }
        }, 10);
      }
    }, 200);
  }


  checkForValidSrs(srsdata) {
    for (let index = 0; index < srsdata.length; index++) {
      const element = srsdata[index];
      if (element.srs == null) {
        return false;
      }
    }

    return true;

  }

  showDataMapper() {
    this.isValue = 3;
    this.disableAddMap = true;
    this.disableAddLayers = true;
    this.disableMapping = true;
    this.disableMigrate = false;
    $('.custom-progressbar').width('75%');
    $('.custom-progressbar-pending').width('25%');
    this.dataloaderProgress='75%';
    this.router.navigate(['mainLayout/dataloader/datamapper']);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    this.uploadbtnlbl = "UPLOAD";

    if (files.length > 0) {
      this.showOptions = true;
    }
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    //this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  // button to send mapped info to postgresql
  migrateData() {
    this.isValue = 4;
    var mappingInfo = {}
    var additionalFieldsInfo ={}
    var domain = this.domain;
    console.log("domain??", this.domain);

   
    //if (this.servermappingdata.mdata != undefined && this.servermappingdata.mdata.length != 0) {

      var userData ={};
      userData["user_name"] = this.loginDetails.username;
      userData["map_name"] = this.mapName;
      userData["description"] = this.mapDesc;
      userData["domain"] = this.domain;
      if(!this.truncateLayerData){
        this.duplicateLayers= [];
      }
      
      console.log(this.servermappingdata);
      //console.log(params.files);
      mappingInfo["indexes"] = this.servermappingdata.mdata;
      mappingInfo["percentage"] = this.servermappingdata.percentage;
      mappingInfo["targetCollList"] = this.servermappingdata.targetCollList;
      mappingInfo["sourceCollList"] = this.servermappingdata.sourceCollList;
      mappingInfo["duplicateLayers"] = this.duplicateLayers;
      additionalFieldsInfo["additional_fields"] = this.servermappingdata.additional_fields;
      console.log(this.serverdata.timestamp, this.files, mappingInfo["indexes"], domain);
      console.log(mappingInfo["indexes"]);


      // var Lengthuserdbresponse = this.servermappingdata.userdbresponse["jsondata"].length;
      // if(mappingInfo["indexes"].length != Lengthuserdbresponse){
      //   if(!confirm('Few objects from uploaded data have not been mapped. Would you like to proceed anyway?')){
      //   return;        
      //   }
        
      // }
    
      this.subscriptions.push(this.migrateService.uploadMappedData(this.serverdata.timestamp, this.filesInfo, mappingInfo["indexes"], mappingInfo["percentage"], additionalFieldsInfo["additional_fields"],userData,mappingInfo["targetCollList"],mappingInfo["sourceCollList"],mappingInfo["duplicateLayers"]).subscribe((response) => {
        //console.log('response from migrate data is  ', response)
           this.openDialog();
         }, (error) => {
        //console.log('error from migrate data is', error)
         }));


      // this.subscriptions.push(this.migrateService.uploadMappedData(this.serverdata.timestamp, this.filesInfo, mappingInfo["indexes"], mappingInfo["percentage"], additionalFieldsInfo["additional_fields"],userData,mappingInfo["targetCollList"]).subscribe((response) => {
      //   //console.log('response from migrate data is  ', response)
      //   this.openDialog();
      // }, (error) => {
      //   //console.log('error from migrate data is', error)
      // }));
    // } else {
    //   this.toastr.warning("Please perform mapping for Migration");
    //   return;
    // }


  }

  showDataLoaderHome() {

    this.router.navigate(['mainLayout/dataloader']).then(() => {
      window.location.reload();
    });


  }


  canDeactivate() {
    if (!this.submitted && this.registerForm.dirty) {
      if (confirm(Globals.formExitMsg)) {
        return true
      } else {
        return false
      }

    } else {
      return true;
    }
  }

  
 // validate user data

 validateFeatureCount(tempJsonData){
  var res = false;
 Object.keys(tempJsonData).forEach(function (key) {
     Object.keys(tempJsonData[key]).forEach(function (fnm) {
     console.log(tempJsonData[key][fnm]["features"].length)

      if(tempJsonData[key][fnm]["features"].length > 0){
        res = true;
        return res;            
     }      
    });
 })
 return res
}

showHistory(){
  this.ngxSmartModalService.getModal('historyModal').open();
}

createNewMap(){
  this.showMapOptions = true;
  this.watermark = "Create New Map"
  $('.custom-progressbar').width('0%');
  $('.custom-progressbar-pending').width('100%');
   this.dataloaderProgress='0%';
}


}
