import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as Globals from '../../../globals';
import { LeafletService } from './leaflet.service'
import { CommonService } from '../../sharing-module/common.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import * as CryptoJS from 'crypto-js';
import { GooglemapsService } from '../googlemaps/googlemaps.service';
import { ToastrService } from 'ngx-toastr';
import * as L from 'leaflet';
import { WindowRef } from '../../sharing-module/WindowRef';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-leaflet',
  templateUrl: './leaflet.component.html',
  styleUrls: ['./leaflet.component.css']
})
export class LeafletComponent implements OnInit {
  @Input() taskId;
  locationsList: any;
  theMarker: any;
  @Input() selectedRecords;
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  @Output() toggleMap: EventEmitter<any> = new EventEmitter<any>();
  @Input() displayValues;
  @ViewChild('map', /* TODO: add static flag */ { static: true }) mapElement: any;
  mapFirst = true;
  recordsIcons = Globals.svgIcons;
  infoWindowData: any;
  mapLayer: any;
  ispreview = 'preview';
  constantKeys = Globals.allConstants.constantKeys;
  private map: any;
  myInnerHeight: any;
  myInnerComponentHeight: any;
  geometryGroup = L.featureGroup();
  widgets: any;
  formInfo: any;
  subscriptions: Subscription[]=[];

  constructor(
    public leafletService: LeafletService,
    public commonService: CommonService,
    public services: GooglemapsService,
    public toastr: ToastrService,
    public ngxSmartModalService: NgxSmartModalService,
    public winRef: WindowRef,
    private route: ActivatedRoute,
  ) { }

  ngAfterViewInit() {
    this.myInnerHeight = '350'; //this.winRef.nativeWindow.innerHeight;
    this.myInnerComponentHeight = this.winRef.nativeWindow.innerHeight - 5;
    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 4,
      maxNativeZoom: 19,
      maxZoom: 20,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    this.map = L.map(this.mapElement.nativeElement, {
      center: [20.593684, 78.96288],
      zoom: 5,
      zoomControl: true,
      trackResize: true,
      layers: [osm]
    });
    const that = this;
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 4,
      maxNativeZoom: 19,
      maxZoom: 20,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(that.map);
    // adding dynamic layers to map start
    const url = Globals.urls.getLayersByTaskId + '/' + this.taskId;
    this.leafletService.getLayersByTaskId(url).subscribe(
      (res: any) => {
        if (res.status === 200) {
          const layersDetailsObj = res.data;
          const overlays = {};
          layersDetailsObj.forEach((layerItem, index) => {
            if ( (layerItem.layerUrl).indexOf("wms") != -1) {
                        overlays[layerItem.externalName] = L.tileLayer.wms(layerItem.layerUrl, {
                          layers: layerItem.internalName,
                          transparent: true,
                          format: 'image/png',
                          maxZoom: 28
                        });
                        console.log(overlays);
                     } else if ( ((layerItem.layerUrl).indexOf("WMTS") != -1) || (layerItem.layerUrl).indexOf("wmts") != -1) {

              overlays[layerItem.externalName] = L.tileLayer(layerItem.layerUrl);
             }
            if (index == layersDetailsObj.length-1) {
              L.control.layers(null, overlays).addTo(this.map);
             }
          });
        }
      });
       // adding dynamic layers to map end
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.taskId = params['taskId'];
      console.log(this.taskId)
    });
  
    let geoTaggedImagesList = this.commonService.geoTaggedImagesList.subscribe((geoTaggedImagesList: any) => {
      if (this.mapLayer) {
        this.mapLayer.setMap(null);
      }
      this.toggleMap.emit();
      geoTaggedImagesList.forEach((geoTaggedImageData) => {
        this.geoTaggingImageAddingOnMap(geoTaggedImageData);
      });
    });
    // showing marker when we click on inserted place
    let locations = this.commonService.locations.subscribe((data: any) => {
      this.toggleMap.emit();
      const locations = data.location.split(',');
      let contentString =
        '<div class="card mapCard">' +
        '<div class="card-header mapInfoHeader">' +
        '<h4 class="card-title">Record Information</h4>' +
        '</div>' +
        '<div class="card-body p-5">';
      this.displayValues.filter(obj => {
        contentString = contentString +
          '<div class="table-responsive">' +
          '<table class="table table-bordered table-bordered-bd-warning mb-0">' +
          '<tbody>' +
          '<tr>' +
          '<td>' + obj.label + '</td>' +
          '<td>' + data.recordInfo[obj.id] + '</td>' +
          '</tr>' +
          '<tr>' +
          '<td>Time</td>' +
          '<td>' + data.recordInfo.submittedTime + '</td>' +
          '</tr>' +
          '</tbody>' +
          '</table>' +
          '</div>';
      })
      contentString = contentString +
        '<button id="buttonMap" class="float-right btn btn-primary btn-sm btn-link">View more</button>' +
        '</div>' +
        '</div>';
      const that = this;
      const myIcon = L.icon({
        iconUrl: that.recordsIcons.markerLocation,
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowSize: [68, 95],
        shadowAnchor: [22, 94]
      });
      const markerOptions1 = {
        clickable: true,
        draggable: false,
        icon: myIcon
      };
      that.map.setView([locations[0], locations[1]], 14);
      this.theMarker = L.marker([locations[0], locations[1]],
        markerOptions1
      ).addTo(that.map);
      this.theMarker.bindPopup(contentString).on("popupopen", () => {
        const el = document.getElementById('buttonMap');
        el.addEventListener('click', (event) => that.viewMore(data.recordInfo));
      });
    });
    let photoOnmap = this.commonService.photoOnmap.subscribe(
      (geoData) => {
        if (!geoData['GPS']) {
          this.toastr.info(this.constantKeys.geoTagMsg);
          return;
        }
        this.toggleMap.emit();
        const contentString = `
				<span>
					<span class="row">
						<div class="col-md-6">
							<b>Device name</b>
						</div>
						<div class="col-md-6">
							${geoData['0th']['272']}
						</div>
					</span>
					<span class="row">
						<div class="col-md-6">
							<b>Device model</b>
						</div>
						<div class="col-md-6">
							${geoData['0th']['271']}
						</div>
					</span>
					<span class="row">
						<div class="col-md-6">
							<b>Date:</b>
						</div>
						</span>
        </span>`;
        const that = this;
        that.map.removeLayer(that.theMarker);
        const geos = this.getLatLongs(geoData['GPS']);
        const latlng = { lat: geos[0], lng: geos[1] };
        const myIcon = L.icon({
          iconUrl: geoData['imageUrl'],
          iconSize: [50, 50],
          iconAnchor: [22, 94],
          popupAnchor: [-3, -76],
          shadowSize: [60, 54],
          shadowAnchor: [22, 94]
        });
        const markerOptions = {
          clickable: true,
          draggable: false,
          icon: myIcon
        };
        that.map.setView([geos[0], geos[0]], 14);
        this.theMarker = L.marker(
          latlng,
          markerOptions
        ).addTo(that.map);
        this.theMarker.bindPopup(contentString);
        const c1 = L.latLng(geos[0], geos[1]);
        const c2 = L.latLng(geos[0], geos[1]);
        that.map.fitBounds(L.latLngBounds(c1, c2));
        this.toggleMap.emit();
        if (this.mapLayer) {
          this.mapLayer.setMap(null);
        }
        this.geoTaggingImageAddingOnMap(geoData)
      });
      let sketching =  this.commonService.sketching.subscribe((data: any) => {
      this.toggleMap.emit();
      this.sketching(data);
    });
    this.subscriptions.push(photoOnmap);
    this.subscriptions.push(locations);
    this.subscriptions.push(sketching);
    this.subscriptions.push(geoTaggedImagesList);
  }
  viewMore(event) {
    let data;
    if (event == null) {
      data = this.selectedRecords.filter(obj => obj['Inserted Place'] == this.infoWindowData);
    } else {
      data = [event];

    }
    const url = Globals.urls.getform + "/" + data[0].formId;
    this.services.getFormData(url).subscribe(
      (res: any) => {
        if (res.status == 200) {
          this.commonService.formOpen.next({ recordInfo: data[0], formSkeleton: res.data.formSkeleton, recordEdit: false });
        } else if (res.status == 404) {

        } else if (res.status == 500) {
          //swal(CONSTANTS.serverProblem);
        }
      });
  }


  // Inserted location when we select a record and click on the map icon in grid list
  insertedLocations(locationsList) {
    if (locationsList.length < 1) {
      this.toastr.warning(this.constantKeys.locationMsgRecord);
      return;
    } else {
      const that = this;
      this.toggleMap.emit();
      const myIcon = L.icon({
        iconUrl: that.recordsIcons.markerLocation,
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowSize: [68, 95],
        shadowAnchor: [22, 94]
      });
      // map options
      const markerOptions = {
        clickable: true,
        draggable: false,
        icon: myIcon
      };
      for (var i = 0; i < locationsList.length; i++) {

        // data displayed in popUp wnen we click on the marker
        let contentString =
          '<div class="card mapCard">' +
          '<div class="card-header mapInfoHeader">' +
          '<h4 class="card-title">Record Information</h4>' +
          '</div>' +
          '<div class="card-body p-5">';
        this.displayValues.filter(obj => {
          contentString = contentString +
            '<div class="table-responsive">' +
            '<table class="table table-bordered table-bordered-bd-warning mb-0">' +
            '<tbody>' +
            '<tr>' +
            '<td>' + obj.label + '</td>' +
            '<td>' + locationsList[i][obj.id] + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td>Time</td>' +
            '<td>' + locationsList[i].submittedTime + '</td>' +
            '</tr>' +
            '</tbody>' +
            '</table>' +
            '</div>';
        });
        contentString = contentString +
          '<button id="buttonMap" class="float-right btn btn-primary btn-sm btn-link">View more</button>' +
          '</div>' +
          '</div>';
        const locations = locationsList[i]['Inserted Place'].split(',');
        that.map.setView([locations[0], locations[1]], 14);
        this.theMarker = L.marker([locations[0], locations[1]],
          markerOptions).addTo(that.map);
        let marker = this.theMarker
        this.theMarker.bindPopup(contentString).on("popupopen", () => {
          that.infoWindowData = (marker.getLatLng().lat).toString() + ',' + (marker.getLatLng().lng).toString();
          const el = document.getElementById('buttonMap');
          el.addEventListener('click', (event) => that.viewMore(null));
        });
      }
    }
    if (this.mapFirst) {
      this.mapFirst = false;
      setTimeout(() => {
      }, 10);
    }
  }

  // geo tagged image on map
  geoTaggingImageAddingOnMap(geoData) {
    if (!geoData['GPS']) {
      this.toastr.info('Geo tag not avilable');
      return;
    }
    else {
      const that = this;
      // that.map.removeLayer(that.theMarker);
      const geos = this.getLatLongs(geoData['GPS']);
      const latlng = { lat: geos[0], lng: geos[1] };
      let contentString = `
    <span>
      <img style="position: relative;
      width: 278px;
      height: 200px;
    }" src= `+ geoData['imageUrl'] + `>
      <div style=" position: absolute; top: 28px; color: white;width: 50%; font-weight: bold; margin-left: 16px"></div>
      
    </span>`;
      const myIcon = L.icon({
        iconUrl: geoData['imageUrl'],
        iconSize: [60, 60],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowSize: [68, 95],
        shadowAnchor: [22, 94]
      });
      const markerOptions = {
        clickable: true,
        draggable: false,
        icon: myIcon
      };
      that.map.setView([geos[0], geos[0]], 14);
      this.theMarker = L.marker(
        latlng,
        markerOptions
      ).addTo(that.map);
      this.theMarker.bindPopup(contentString);
      const c1 = L.latLng(geos[0], geos[1]);
      const c2 = L.latLng(geos[0], geos[1]);
      that.map.fitBounds(L.latLngBounds(c1, c2));
    }
  }
  getLatLongs(GpsData) {
    const lat = this.convertDegToDec(GpsData[2]);
    const long = this.convertDegToDec(GpsData[4]);
    return [lat, long]
  }
  convertDegToDec(arr) {
    return (arr[0][0] / arr[0][1]) + ((arr[1][0] / arr[1][1]) / 60) + ((arr[2][0] / arr[2][1]) / 3600);
    // return (arr[0].numerator + arr[1].numerator / 60 + (arr[2].numerator / arr[2].denominator) / 3600).toFixed(4);
  }

  sketching(recordInfo) {

    const url = Globals.urls.getSketchingData + "/" + recordInfo.formId + '/' + recordInfo.recordId;
    this.services.getFormData(url).subscribe(
      (res: any) => {
        if (res.status == 200) {
          if (this.mapLayer) {
            this.mapLayer.setMap(null);
          }
          let geoData = res.data;
          const that = this;
          that.map.removeLayer(that.theMarker);
          const myIcon = L.icon({
            iconUrl: that.recordsIcons.markerLocation,
            iconSize: [50, 50], // width and height of the image in pixels
            shadowSize: [50, 64], // size of the shadow
            iconAnchor: [25, 49]
          });
          this.geometryGroup = L.geoJSON(geoData, {
            style: (feature) => {
              return {
                color: '#006EE5',
                weight: 10,
                radius: 8,
                opacity: 1,
                fillOpacity: 0.8
              };
            }, pointToLayer: (feature, latlng) => {
              return L.marker(latlng, { icon: myIcon })

            },
            onEachFeature: (feature, layer) => {
              layer.on({

                // => OnClick Open the InfoWindow
                click: (e) => {

                  // Open Data preview of each feature
                  this.sketchingFormOpen(feature.properties);
                }
              });
            }
          }).addTo(that.map);


          let geometryBounds = that.geometryGroup.getBounds();
          this.map.fitBounds(geometryBounds);


        } else if (res.status == 404) {

        } else if (res.status == 500) {
          //swal(CONSTANTS.serverProblem);
        }
      });
  }
  sketchingFormOpen(properties) {
    let url;
    if (this.loginDetails.type == 0) {
      url = Globals.urls.sketchingSkeleton + '/' + null + '/' + 'point';

    } else if (this.loginDetails.type == 1) {
      url = Globals.urls.sketchingSkeleton + '/' + this.loginDetails.accounts[0]._id + '/' + 'point';
    }
    else if (this.loginDetails.type == 3) {
      url = Globals.urls.sketchingSkeleton + '/' + 'all' + '/' + 'point';
    }
    this.services.getFormData(url).subscribe(
      (res: any) => {
        if (res.status == 200) {
          this.widgets = res.data;
          this.formInfo = properties;
          this.ngxSmartModalService.getModal('sketchingpreview').open();
        } else if (res.status == 404) {

        } else if (res.status == 500) {
          //swal(CONSTANTS.serverProblem);
        }
      });
  }
  ngOnDestroy() {
		this.subscriptions.forEach((subscription) => subscription.unsubscribe())  
	
	}
}





