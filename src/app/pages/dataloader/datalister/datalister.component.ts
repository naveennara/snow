import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import {MatTree} from '@angular/material/tree';
import { MetadataService } from './metadata.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FlatTreeControl } from '@angular/cdk/tree';
import { ToastrService } from 'ngx-toastr';
import { DataService } from "../body/data.service";
import { Router } from '@angular/router';
//import swal from 'sweetalert';


interface DataNode {
  name: string;
  children?: DataNode[];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}


@Component({
  selector: 'app-datalister',
  providers: [ DataService],
  templateUrl: './datalister.component.html',
  styleUrls: ['./datalister.component.scss']
})


export class DatalisterComponent implements OnInit { 
  
  @Input()
  filepath: String;
  MAPPING_DATA: DataNode[] = [];
  dataFromPostGS;
  private subscriptions: Subscription[] = [];
  metadata: any;
  domain;
  serverdata;
  serverfiles;
  sFldText;
  sDtypeText;
  dFldText;
  dDtypeText;
  disableMappingBtn;
  openConfirmModal=false;
  servermappingdata;
  showMappedData = false;
  selectedSrcField;
  selectedDstField;
  datalisterFormGroup: FormGroup;
  totalCompliancePercentage;
  targetCollList;
  sourceCollList;
  dropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  
  };

  stndrddropdownSettings= {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  
  };

  disabled= false;
  closeDropdownSelection = false;

  name;
  
  constructor(private formBuilder: FormBuilder,private data: DataService,private activatedRoute: ActivatedRoute, private router: Router,public dialog: MatDialog, private toastr: ToastrService) {
    this.userdataSource.data = this.MAPPING_DATA;
  }
  uploadedJsonData;

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {

    this.data.currentMappingBtnstate.subscribe(disable => this.disableMappingBtn = disable)

    this.data.currentMessage.subscribe(message => this.serverdata = message)

    this.data.currentFiles.subscribe(files => this.serverfiles = files)
    this.data.currentMappingData.subscribe(mappingdata => this.servermappingdata = mappingdata)

    if(this.serverdata.userdbresponse==undefined){
      //  Swal.fire('', 'Invalid navigation or Incorrect map data', 'warning');
        
      this.router.navigate(['mainLayout/dataloader']).then(() => {
          window.location.reload();
        });


      }

        this.uploadedJsonData = this.UploadedData = this.serverdata.userdbresponse["srcdata"];
       // console.log('response from User files is  ', response)
        
        //gets metadata response 
      
         
         
          this.metadata = this.serverdata.metadata;
          ////console.log("metadata " + this.metadata);

          this.dataFromPostGS = JSON.parse("[" + this.metadata + "]");

          this.fetchDataFromStandardDS();
          this.fetchDataFromUploadedData();
          //console.log('response from Snow Database is  ', response)
        

  }


  ngOnDestroy() {
    // destroys the created subscriptions to avoid memory leak.
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private _transformer = (node: DataNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);


  userdataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  mappednode;
  mappedchildnode;
  dataFromSDB;
  selectedUsrCollObj;
  selectedColl;
  selectedCollFields;
  mappedcount;

  async mapToUploadedData() {
    if (!(this.selectedColl == undefined || this.selectedDColl == undefined || this.selectedchildSrcNode == undefined ||
      this.selectedchildDefNode == undefined)) {
      //console.log(this.selectedColl + "," + this.selectedDColl + "," + this.selectedchildSrcNode + "," +
       // this.selectedchildDefNode);
      var mappednodeForComp = this.mappednode = this.selectedColl + " - " + this.selectedDColl;
      var mappedChildNodeForComp = this.selectedchildSrcNode;
      var mappedChildDefNodeForComp = this.selectedchildDefNode;
      var mappedDefColl = this.selectedDColl;
      var mappedSrcColl = this.selectedColl;
      var res = await this.checkGeometryType(this.selectedColl, this.selectedDColl);

      this.selectedSrcField=null;
    this.selectedDstField=null;

      if (!res) {
        return;
      }

      if(mappedChildDefNodeForComp.includes("external_name")){
        this.toastr.warning("Cannot map with External Name. Please choose a different field");
        return;
      }

      if (!this.checkDataType(this.selectedchildSrcNode, this.selectedchildDefNode)) {
        this.toastr.warning("Please choose fields with same data type");
        return;
      }

      this.mappedchildnode = this.selectedchildSrcNode + " - " + this.selectedchildDefNode;
      if (this.MAPPING_DATA.length == 0) {

        this.MAPPING_DATA = [{
          "name": this.mappednode, 
          "children": [{"name": this.mappedchildnode}]
        }]

      }
      else {

        var index = this.MAPPING_DATA.findIndex(function (item, i) {
          return item.name === mappednodeForComp;
        });

        var defindex = this.MAPPING_DATA.findIndex(function (item, i) {
          return item.name.endsWith(mappedDefColl);
        });

        var srcindex = this.MAPPING_DATA.findIndex(function (item, i) {
          return item.name.startsWith(mappedSrcColl);
        });

        if (index != -1) {

          var childIndex = this.MAPPING_DATA[index].children.findIndex(function (item, i) {
            return item.name.startsWith(mappedChildNodeForComp);
          });

          var childDefIndex = this.MAPPING_DATA[index].children.findIndex(function (item, i) {
            return item.name.endsWith(mappedChildDefNodeForComp);
          });

          if (childIndex != -1) {

            this.MAPPING_DATA[index].children[childIndex] = { "name": this.mappedchildnode };
          } else {
            if (childDefIndex == -1) {
              //if(this.checkDataType(this.selectedchildSrcNode,this.selectedchildDefNode)){
              this.MAPPING_DATA[index].children.push({ "name": this.mappedchildnode });
              /*}else{
                this.toastr.warning("Please choose fields with same data type");
              }*/

            } else {
              this.toastr.warning("Please choose a different field from Standard data model");
              return;
            }
          }
        } else {
          if (!(index == -1 && defindex != -1 || index == -1 && srcindex != -1)) {

            this.MAPPING_DATA.push({ "name": this.mappednode, "children": [{ "name": this.mappedchildnode }] });
          } else {
            if (index == -1 && defindex != -1) {
              this.toastr.warning("Please choose a different Collection from Standard data model");
              return;
            } if (index == -1 && srcindex != -1) {
              this.toastr.warning("Please choose a different Collection from Uploaded data model");
              return;
            }
          }

        }
      }
    } else {
      this.toastr.warning("Please select the Collections and Fields");
      return;
    }

    this.userdataSource.data = this.MAPPING_DATA;
    this.showMappedData = true;
    this.treeControl.expandAll();
  var tmp = JSON;
  tmp["mdata"] = this.formatMappedData(this.userdataSource.data);
  tmp["percentage"] = this.totalCompliancePercentage;
  tmp["targetCollList"] = this.targetCollList;
  tmp["sourceCollList"] = this.sourceCollList;
  console.log(this.totalCompliancePercentage,this.targetCollList);
  this.data.changeMappingData(tmp);
  this.toastr.success("1 DATA SET MAPPED SUCCESFULLY");


    console.log(this.servermappingdata);
    
  }

  expandMapping(){
    this.treeControl.expandAll();
  }

  
  collapseMapping(){
    this.treeControl.collapseAll();
  }

  async checkGeometryType(source, dest){
     var srccollection = this.getFieldsbyUpColl(source);
     var destcollection = this.getFieldsbyDColl(dest);
     //collection["children"].

     var srcGeom ="";
     srccollection["children"].forEach(obj => {
         if( obj.name.includes("geometry")){
            srcGeom = obj.name.match(/\(([^)]+)\)/)[1];
         }
     });

     var destGeom ="";
     destcollection["children"].forEach(obj => {
      var geom = obj.name;
         if( obj.name.includes("location")){
          destGeom="POINT";
         } else if  (obj.name.includes("route")){
          destGeom="LINESTRING";
         } else if(obj.name.includes("extent")){
          destGeom="POLYGON";
            
         }
     });

     console.log(srcGeom,destGeom)
    if (srcGeom==destGeom) {
      return true;
    } else {
      //alert("Cannot Map Geometry "+srcGeom+" and "+destGeom+" Please choose collections of same geometry type")
      this.toastr.warning("Geometry mismatch. <br/>"+srcGeom+" <=> "+destGeom+"<br/> Please map collections of same geometry type","", {  enableHtml: true });
      
    /*const result = await swal({
      
      text: "Cannot Map Geometry "+srcGeom+" and "+destGeom+" Would you like to continue without geometry mapping?",
      icon: "warning",
      buttons: ["No","Coninue"],
    })
    
    
    if(result){
      // do nothing
      console.log(result+"here");
      return true;
    }else{
      console.log(result+"there");
      return false;
    }*/
      return false;
    
    
      //return false;
    }
  }

  checkDataType(source, dest) {
    //console.log(source + "---" + dest);
    if (source.toUpperCase().match(/\(([^)]+)\)/)[1] == dest.toUpperCase().match(/\(([^)]+)\)/)[1]) {
      return true;
    } else {
      return false;
    }

  }

  UploadedData: DataNode[] = [];
  
  DefaultData: DataNode[] = [];
  selectedDColl: string;
  selectedDCollObj;
  selectedSchema;
  tableNameMapping =[];
  fetchDataFromStandardDS() {
    this.dataFromSDB = this.dataFromPostGS;
    this.DefaultData = [];
    this.tableNameMapping =[];
    for (let rec of this.dataFromSDB) {

      var sdbindex = this.DefaultData.findIndex(function (item, i) {
        return item.name.startsWith(rec.table_name);
      });

      var dataType = rec.data_type.replace("character varying", "string");
      if(rec.column_name=="external_name"){
       var extName =rec.column_default.split('::')[0].replaceAll("'","")
        this.tableNameMapping.push({"id" :rec.table_name,"name": extName});
      }else{
      if (sdbindex == -1) {
        this.DefaultData.push({ "name": rec.table_name, "children": [{ "name": rec.column_name + " (" + dataType + ")" }] })
      } else {
        this.DefaultData[sdbindex].children.push({ "name": rec.column_name + " (" + dataType + ")" });
      }
    }
    }
   var placeholder = this.selectedDColl = this.DefaultData[0].name;
    this.selectedDCollObj=[{"id":placeholder,"name":this.getExtName(placeholder)}];
   
    //console.log("SDB DATA.." + this.DefaultData);
  }

  getExtName(int_id) {
    for (let rec of this.tableNameMapping) {
      if (rec.id == int_id) {
        return rec.name;
      }
    }

  }


  dataFromUDB;

  fetchDataFromUploadedData() {
    var placeholder = this.UploadedData[0].name;
    this.selectedColl = placeholder
    this.selectedUsrCollObj=[{"name":placeholder,"id":placeholder}];
    
  }
  getFieldsbyUpColl(coll) {
    for (let rec of this.UploadedData) {
      if (rec.name == coll) {
        return rec;
      }
    }

  }

  getFeatureCount(coll) {
    for (let rec of this.UploadedData ){
      if(rec.name == coll){
        return rec;
      }
    }
  }

  getFieldsbyDColl(coll) {
    for (let rec of this.DefaultData) {
      if (rec.name == coll) {
        return rec;
      }
    }
  }

  onSelectionSrcColl(e) {
   
    this.selectedColl= this.selectedColl;
    this.selectedColl = this.selectedUsrCollObj[0].name;
    this.selectedchildSrcNode = undefined;
  }

  onSelectionDefColl(e) {
    this.selectedDColl = this.selectedDCollObj[0].id;
    this.selectedchildDefNode = undefined;
  }

  selectedUsrNode = null;
  selectedchildSrcNode: string;
  onSelectionSrc(e, v) {

    this.selectedchildSrcNode = e.option.value;
  }

  selectedDefNode = null;
  selectedchildDefNode: string;
  onSelectionDef(e, v) {
    this.selectedchildDefNode = e.option.value;

  }

  formatMappedData(mappedData){
    var formattedMap ={};
    var indexes = [];
    var formattedMapAry =[];
 var compPercentage=0;   
 var targetColls ="";
 var sourceColls="";
    //console.log(JSON.stringify(mappedData));
     var additionalFieldsMap ={};
     var additionalFieldsMapAry=[];
    mappedData.forEach(obj => {
      formattedMap ={};
      
       
          var colmap = obj["name"];
          indexes =[]
          
          var li = colmap.lastIndexOf("- ");
          var srccol = colmap.substr(0,li-1).trim();
          var destcol = colmap.substr(li+1, colmap.length).trim();
          var destColName = this.getExtName(destcol);
          if(targetColls==""){targetColls= destColName}else{
          targetColls= targetColls + ", "+destColName;}

          if(sourceColls==""){sourceColls= srccol}else{
            sourceColls= sourceColls + ", "+srccol;}
            
            
          // colmap.substr(colmap.lastIndexOf("- ")+1, colmap.length).trim();
          //console.log("destcol"+srccol);
          var srcFieldsMapped =  this.getFieldsbyUpColl(srccol)["children"];
          var destFieldsMapped =  this.getFieldsbyDColl(destcol)["children"];
          var srcFields=[];
          for (let index = 0; index < srcFieldsMapped.length; index++) {
            var fld = srcFieldsMapped[index].name;
            srcFields.push(fld.substring(0, fld.indexOf(' (')));
            
          }

         
          var srccolrecslength = srcFields.length;
          var featureCount = this.getFeatureCount(srccol)["featureCount"];
          var srs = this.getFeatureCount(srccol)["srs"];
          //console.log("here->"+srccolrecslength);

          for (let index = 0; index < srccolrecslength-1; index++) {
            indexes[index] = -1;
          
          }
     
          var fldsmap = obj["children"];
     console.log(srcFields);

     var destFields=[];
     for (let index = 0; index < destFieldsMapped.length; index++) {
       var fld = destFieldsMapped[index].name;
       fld = fld.substring(0, fld.indexOf(' ('));
       if(srcFields.includes(fld))
{
  var duplicateFldindex = srcFields.indexOf(fld);
  if (duplicateFldindex !== -1) {
    srcFields.splice(duplicateFldindex, 1);
  }

}       
     }
     console.log(destFields);

            fldsmap.forEach(fld =>{
                          var fldmap = fld["name"];
                          var usrIndx = fldmap.substr(fldmap.indexOf("#")+1,fldmap.length);
                          var destIndx = fldmap.substr(fldmap.lastIndexOf("#")+1,fldmap.length);
                          //console.log(usrIndx+"::"+destIndx);
                          indexes[parseInt(usrIndx)] = parseInt(destIndx);
                          var usrField= fldmap.substring(0, fldmap.indexOf(' ('))

                          var index = srcFields.indexOf(usrField);
if (index !== -1) {
  srcFields.splice(index, 1);
}
                         

     
            });
            var gindex = srcFields.indexOf("geometry");
if (gindex !== -1) {
  srcFields.splice(gindex, 1);
}
gindex = srcFields.indexOf("location");
if (gindex !== -1) {
  srcFields.splice(gindex, 1);
}
gindex = srcFields.indexOf("extent");
if (gindex !== -1) {
  srcFields.splice(gindex, 1);
}
gindex = srcFields.indexOf("route");
if (gindex !== -1) {
  srcFields.splice(gindex, 1);
}

var additional_fields="";
            for (let index = 0; index < srcFields.length; index++) {
              if(index==0){
              additional_fields =  srcFields[index];
              }else{
                additional_fields =  additional_fields+ ","+srcFields[index];
              }
              
            }
            compPercentage = compPercentage +(fldsmap.length)/indexes.length;
          
            formattedMap["source"] = srccol;
            formattedMap["target"] = destcol;
            formattedMap["indexes"]= indexes;
            formattedMap["featureCount"] = featureCount;
            formattedMap["srs"]= srs;
            formattedMap["additional_fields"] = additional_fields;
            
            formattedMapAry.push(formattedMap);
            
     
      });
      this.targetCollList = targetColls;
      this.sourceCollList = sourceColls;
      this.totalCompliancePercentage = ((compPercentage*100)/(this.tableNameMapping.length)).toFixed(2);
      console.log(JSON.stringify(formattedMapAry));
      console.log(this.totalCompliancePercentage+" %");
     // console.log(JSON.stringify(additionalFieldsMapAry));
      
      return formattedMapAry;
    }
    

    selectedSrcColForstyle(fld){
      
      var mappedSrcColl = this.selectedUsrCollObj[0].name;
        var srcindex = this.MAPPING_DATA.findIndex(function (item, i) {
          return item.name.startsWith(mappedSrcColl);
        });

        var fldDtype = fld.split(" ");
this.sFldText = fldDtype[0];
this.sDtypeText = fldDtype[1]


        if(srcindex!=-1){
          var childIndex = this.MAPPING_DATA[srcindex].children.findIndex(function (item, i) {
            return item.name.startsWith(fld);
          });

          if(childIndex!=-1){
            return true;
          }else{
            return false;
          }

        }else{
          return false;
        }
    }


    selectedDColForstyle(fld){
      
      var mappedDColl = this.selectedDColl;
        var destindex = this.MAPPING_DATA.findIndex(function (item, i) {
          return item.name.endsWith(mappedDColl);
        });

        var dFldDtype = fld.split(" ");
        this.dFldText = dFldDtype[0];
        this.dDtypeText = dFldDtype[1];

        
        if(destindex!=-1){
          var childIndex = this.MAPPING_DATA[destindex].children.findIndex(function (item, i) {
            return  item.name.split('#',2).join('#').endsWith(fld);
          //  return item.name.substr(0,item.name.length-2).endsWith(fld);
          });

          if(childIndex!=-1){
            return true;
          }else{
            return false;
          }

        }else{
          return false;
        }
    }

    async unmapField(fld){
      console.log(parent,fld);

      /*const result = await swal({
      
        text: "Are you sure to proceed with Unmapping?",
        icon: "warning",
        buttons: ["No","Yes"],
      }) */
      const result = confirm('Are you sure to proceed with Unmapping?')
      
      if(!result){
        // do nothing
        console.log(result+"here");
        return true;
      }else{
        console.log(result+"there");
        //do nothing
        //return false;
      }
      
      const ancestors = this.getAncestors(this.MAPPING_DATA, fld);
      if(ancestors[ancestors.length - 2]){
      var parent = ancestors[ancestors.length - 2].name;
      console.log(parent,fld);
      //this.findAndRemove(this.userdataSource.data,"name",parent)
      var index = this.MAPPING_DATA.findIndex(function (item, i) {
        return item.name === parent;
      });



      this.findAndRemove(this.MAPPING_DATA[index].children,"name",fld)
      if(this.MAPPING_DATA[index].children.length==0){
        this.findAndRemove(this.MAPPING_DATA,"name",parent)
      }
    }else{
      this.findAndRemove(this.MAPPING_DATA,"name",fld)
    }
      this.userdataSource.data = this.MAPPING_DATA;
      this.refreshDataTree();
      
      var tmp = JSON;
  tmp["mdata"] = this.formatMappedData(this.userdataSource.data);
  tmp["percentage"] = this.totalCompliancePercentage;
  tmp["targetCollList"] = this.targetCollList;
  console.log(this.totalCompliancePercentage,this.targetCollList);
  this.data.changeMappingData(tmp);
  this.toastr.success("1 DATA SET UNMAPPED SUCCESFULLY");
  this.expandMapping();
  this.moveExpansionState(fld,parent);
    }


    refreshDataTree(){
      const data = this.userdataSource.data;
// cdk tree that mat tree is based on has a bug causing children to not be rendered in the UI without first setting the data to null
//this.userdataSource.data = null;
// mat-tree has some sort of memory leak issue when not instantiating a new MatTreeNestedDataSource which causes the app to become very slow
this.userdataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

this.userdataSource.data = data;


    }

    moveExpansionState(from: ExampleFlatNode, to: ExampleFlatNode) {
      if (this.treeControl.isExpanded(from)) {
        console.log(`'${from.name}' was expanded, setting expanded on new node`);
        this.treeControl.collapse(from);
        this.treeControl.expand(to);
      }
    }

    findAndRemove(array, property, value) {
      array.forEach(function(result, index) {
        if(result[property] === value) {
          //Remove from array
          array.splice(index, 1);
        }    
      });
    }
    
    
    getAncestors(array, name) {
      if (typeof array !== 'undefined') {
        for (let i = 0; i < array.length; i++) {
          if (array[i].name === name) {
            return [array[i]];
          }
          const a = this.getAncestors(array[i].children, name);
          if (a !== null) {
            a.unshift(array[i]);
            return a;
          }
        }
      }
      return null;
    }

    navigateToMapPreview(){
     // this.data.changeMappingBtnState(false);
      this.router.navigate(['mainLayout/dataloader/mapping']).then(() => {
       // window.location.reload();
      });


    }

    migrate(){
      if (this.servermappingdata.mdata != undefined && this.servermappingdata.mdata.length != 0) {
        $('.custom-progressbar').width('100%');
        $('.custom-progressbar-pending').width('0%');
        var mappingInfo={};
        mappingInfo["indexes"] = this.servermappingdata.mdata;
       
  
        var Lengthuserdbresponse = this.servermappingdata.userdbresponse["jsondata"].length;
        if(mappingInfo["indexes"].length != Lengthuserdbresponse){
          if(!confirm('Few objects from uploaded data have not been mapped. Would you like to proceed anyway?')){
          return;        
          }
          
        }
     
        if(!confirm('Are you sure you want to proceed?')){
          return;        
          }
       

          this.data.sendClickEvent();
          this.router.navigate(['mainLayout/dataloader']);
      
            
      }else{
        this.toastr.warning("Please perform mapping for Migration");
        return;
      }
     
    }

    openConfirmPane(){
      this.openConfirmModal= true;
    }

    confirmDelete(action:string) {
      
      if(action == 'Yes'){
        // Migrate
        this.data.sendClickEvent();
        this.router.navigate(['mainLayout/dataloader']).then(() => {
          //window.location.reload();
        });
        
      }else{
        //this.openConfirmModal=false;
      }
      this.openConfirmModal=false;
    }

}
