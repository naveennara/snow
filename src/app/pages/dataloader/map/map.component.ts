import { Component, OnInit, ViewEncapsulation, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResizeEvent } from 'angular-resizable-element';
import { WindowRef } from '../../../sharing/sharing-module/WindowRef';
import { HttpClient } from "@angular/common/http";
import * as L from "leaflet";
import "leaflet/dist/images/marker-shadow.png";
import { DataService } from "../body/data.service";

import { Router } from '@angular/router';
declare var $: any;



function swicthOnLayers() {
 // alert(':D');
  $(".leaflet-control-layers-selector").each(function(i) {
    $(".leaflet-control-layers")[0].getElementsByTagName('input')[i].click();
  
  });
}


@Component({
  selector: 'app-map',
  providers: [DataService],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '(window:resize)': 'onResize($event)'
  }
})



export class MapComponent implements OnInit {

  domain;
  ​​​​isFullscreen = false;
  public styles: object = {};
  setSize: any;
  myInnerHeight: number;
  myInnerComponentHeight: number;
  private subscriptions: Subscription[] = [];
  uploadedJsonData;
  layerNames = [];
  metadata;
  dataFromPostGS;
  UploadedData;
  jsonFormatData;
  layersControl;
  map: L.Map;
  serverstate;
  layers = [];
  overlays = {};
  

  googleSat  = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    minZoom: 2,
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
  });
  googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    minZoom: 2,
    maxNativeZoom: 19,
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
  });
  osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 2,
    maxNativeZoom: 19,
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });
  googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    minZoom: 2,
    maxNativeZoom: 19,
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
  });
  
  baseLayers = {
    "OpenLayers": this.osm,
    "Satellite": this.googleSat,
    "Hybrid": this.googleHybrid,
    "Terrain": this.googleTerrain
  };


  mapOptions = {
    layers: [this.osm

    ],
    zoom: 2,
    center: L.latLng(37.482019, 10)
  };
  mapFitToBounds: any = null;
  
  validate(event: ResizeEvent): boolean {
    const MIN_DIMENSIONS_PX: number = 50;
    if (
      event.rectangle.width &&
      event.rectangle.height &&
      (event.rectangle.width < MIN_DIMENSIONS_PX ||
        event.rectangle.height < MIN_DIMENSIONS_PX)
    ) {
      return false;
    }
    return true;
  }

  onResizeEnd(event: ResizeEvent): void {
    this.styles = {
      position: 'fixed',
      left: `${event.rectangle.left}px`,
      top: `${event.rectangle.top}px`,
      width: `${event.rectangle.width}px`,
      height: `${event.rectangle.height}px`
    };
  }

  constructor(private data: DataService,
    private http: HttpClient, 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public winRef: WindowRef) {
      this.myInnerHeight = winRef.nativeWindow.innerHeight;
      this.myInnerComponentHeight = winRef.nativeWindow.innerHeight - 65;
  }

  onResize(event) {
    this.myInnerHeight = event.target.innerHeight;
    this.myInnerComponentHeight = event.target.innerHeight - 65;
  }

  serverdata;
  style = feature => {
    return {
      weight: 2,
      opacity: 1,
      color: 'blue',
      dashArray: '3',
      fillOpacity: 0.7

    };
  }

  ngAfterViewInit(){
    swicthOnLayers();
    //this.map.fitBounds(this.layersControl.getBounds());
    //this.mapFitToBounds= L.LatLngBounds;

   
  }
  ngOnInit() {
    //this.initializeMapOptions();
    $('.custom-progressbar').width('50%');
    $('.custom-progressbar-pending').width('50%');
    this.data.currentMessage.subscribe(message => this.serverdata = message);
    
    const resetHighlight = e => {
      //geojson.resetStyle(e.target);
      //  info.update();
    }


    const highlightFeature = e => {
      const layer = e.target;
      var table = document.createElement("table");
      //var tr = table.insertRow(-1);                   // TABLE ROW.


      
      table.setAttribute("style","border: 1px");

      var keys = Object.keys(e.target.feature.properties);
for(var i=0; i<keys.length; i++){

    var key = keys[i];
    if( !(["tessellate","extrude","visibility","extent","location"].includes(key)) ){
      if(e.target.feature.properties[key]!=null){
    var tr = table.insertRow(-1);
    //tr.setAttribute('padding', '5px');

        
    var tabCell = tr.insertCell(-1);
    tabCell.innerHTML = key;
    tabCell.setAttribute("style","padding:5px;font-weight: 600;text-transform:capitalize;");
    tabCell = tr.insertCell(-1);
    tabCell.innerHTML = e.target.feature.properties[key];
    }
  }
            
}
     

      var z = document.createElement('p');
          z.setAttribute("style","width: max-content");
      z.innerHTML = "";
      z.appendChild(table);
      layer.bindPopup(z);
      /*
        layer.setStyle({
          weight: 5,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.7
        });*/

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        if(e.target.feature.geometry.type!="Point"){
        layer.bringToFront();
        }
      }

      // info.update(layer.feature.properties);
    }


    const zoomToFeature = e => {
      if(e.target.feature.geometry.type!="Point"){
        this.map.fitBounds(e.target.getBounds());

        }
    }

    const onEachFeature = (feature, layer) => {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
      });

     
    }



    this.activatedRoute.queryParams.subscribe(params => {
      //console.log("params .path ",params.key);
      if(this.serverdata.userdbresponse==undefined){
      //  Swal.fire('', 'Invalid navigation or Incorrect map data', 'warning');
        
        this.router.navigate(['mainLayout/dataloader']).then(() => {
          window.location.reload();
        });


      }
      console.log("................",this.serverdata.userdbresponse["jsondata"]);

      var tempJsonData = this.jsonFormatData = this.serverdata.userdbresponse["jsondata"];

      console.log('in map rdy');
      var layerLocations = L.layerGroup();
      var tempOverlays = {};
      var tempLayers = [];
      var tempStyle = this.style;
      Object.keys(tempJsonData).forEach(function (key) {
        console.table('Key : ' + key + ', Value : ' + tempJsonData[key])
        Object.keys(tempJsonData[key]).forEach(function (fnm) {
          tempOverlays[fnm] = L.geoJSON(tempJsonData[key][fnm], { onEachFeature: onEachFeature });
         
          
          tempLayers.push(L.geoJSON(tempJsonData[key][fnm]));
         });
      })

      this.layers.push(L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: ""
      }));
      for (let index = 0; index < tempLayers.length; index++) {

        this.layers.push(tempLayers[index]);
        var  eachLayer = tempLayers[index];
        
        if(this.mapFitToBounds==null){
          if(eachLayer["_layers"]!=null&& eachLayer["_layers"]!={}){
          this.mapFitToBounds= tempLayers[index].getBounds();
          }
        }else{
        this.mapFitToBounds.extend(tempLayers[index].getBounds());
        }
       // this.map.fitBounds(tempLayers[index].getBounds());
      }

      
      this.layersControl = {
        baseLayers: this.baseLayers,
        overlays: tempOverlays
      }
      console.log('response from User files is  ', this.serverdata.userdbresponse)
      this.serverdata.userdbresponse["srcdata"].forEach(element => {
        this.layerNames.push({ "name": element.name, "count": element.featureCount });
      });

      //swicthOnLayers();
     // llExtObject.init();
      
     // this.metadata = this.serverdata.metadata;
     
     // this.dataFromPostGS = JSON.parse("[" + this.metadata + "]");
    });

    //swicthOnLayers();

    
  }


  onMapReady(map: L.Map) {

    this.map = map;

    
  
  }

  call_FSEvnt(event) {
    if (this.isFullscreen === false) {
      this.openFullscreen();
    } else {
      this.closeFullscreen();
    }
  }

  openFullscreen() {
    this.isFullscreen = true;
    
  }

  closeFullscreen() {
    this.isFullscreen = false;
    
  }

  navigateToAddLayers(){
    
   
    this.router.navigate(['mainLayout/dataloader'], {
      queryParams: {}
    });


}
}