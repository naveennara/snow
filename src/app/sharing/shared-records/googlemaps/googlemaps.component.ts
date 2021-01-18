import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
//import { } from 'googlemaps';
import * as Globals from '../../../globals';
import { CommonService } from '../../sharing-module/common.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import * as CryptoJS from 'crypto-js';
import { GooglemapsService } from './googlemaps.service';
import { ToastrService } from 'ngx-toastr';
import { WindowRef } from '../../sharing-module/WindowRef';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-googlemaps',
  templateUrl: './googlemaps.component.html',
  styleUrls: ['./googlemaps.component.css']
})
export class GooglemapsComponent implements OnInit {
  @Input() selectedRecords;
  @Input() displayValues;
  @Output() toggleMap: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('map', /* TODO: add static flag */ { static: true }) mapElement: any;
  map: google.maps.Map;
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  recordsIcons = Globals.svgIcons;
  markers: any = [];
  mapLayer: any;
  widgets: any;
  formInfo: any;
  infoWindowData: any;
  mapFirst =  true;
  geocoder = new google.maps.Geocoder;
  constantKeys = Globals.allConstants.constantKeys;
  ispreview = 'preview';
  myInnerHeight: any;
  myInnerComponentHeight: any;
  subscriptions: Subscription[]=[];

  constructor(public commonService: CommonService, 
    public services: GooglemapsService,
    public toastr: ToastrService,
    public ngxSmartModalService: NgxSmartModalService,
    public winRef: WindowRef) { }

    ngAfterViewInit() {
      this.myInnerHeight = '350'; //this.winRef.nativeWindow.innerHeight;
      this.myInnerComponentHeight = this.winRef.nativeWindow.innerHeight - 5;
    }

  ngOnInit() {
    // console.log(recordInfo.recordId)
    const mapProperties = {
      center: new google.maps.LatLng(17.387140, 78.491684),
      // center: {
      // 	lat: 0,
      // 	lng: 0
      // },

      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      options: {
        gestureHandling: 'greedy'
      }
      //gestureHandling: 'greedy'
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    let geoTaggedImagesList = this.commonService.geoTaggedImagesList.subscribe((geoTaggedImagesList: any) => {
			if(this.mapLayer) {
				this.mapLayer.setMap(null);
			}
      this.toggleMap.emit();
			geoTaggedImagesList.forEach((geoTaggedImageData)=>{
				this.geoTaggingImageAddingOnMap(geoTaggedImageData);
			})
			//this.geoTaggingImageAddingOnMap(data);
		})

    let sketching =  this.commonService.sketching.subscribe((data: any) => {
      this.toggleMap.emit();
      this.sketching(data);
    })
    // Renuka code
    let locations = this.commonService.locations.subscribe((data: any) => {
      console.log(data)
      this.toggleMap.emit();

      // let contentString = '<div class="info_content">' +
      // 	'<h5>User - ' + data.recordInfo.submittedBy.username + '</h5>';

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

      // contentString = contentString + '<p> Time - ' + data.recordInfo.submittedTime + '</p>' + '</div>';
      let locations = data.location.split(',');
      console.log(data.location)
      let infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      google.maps.event.addListener(infowindow, 'domready', () => {
        const el = document.getElementById('buttonMap');
        el.addEventListener('click', (event) => that.viewMore(data.recordInfo));
      });
      if (this.mapLayer) {
        this.mapLayer.setMap(null);
      }
      this.clearMarkers();
      let that = this;
      let icon = {
        url: that.recordsIcons.markerLocation, // url
        scaledSize: new google.maps.Size(50, 50), // scaled size
        //origin: new google.maps.Point(0, 0), // origin
        //anchor: new google.maps.Point(0, 0) // anchor
      };
      // let myLatlng = new google.maps.LatLng(parseFloat(geos[0]),parseFloat(geos[1]));
      let myLatlng = new google.maps.LatLng(locations[0], locations[1]);
      let marker = new google.maps.Marker({
        position: myLatlng,
        icon: icon
      });
      marker.addListener('click', function () {
        infowindow.open(that.map, marker);
        that.infoWindowData = (marker.getPosition().lat()).toString() + ',' + (marker.getPosition().lng()).toString();
      });
      this.markers.push(marker);

      this.map.setZoom(15);

      // To add the marker to the map, call setMap();
      marker.setMap(this.map);

      this.map.panTo(marker.getPosition());
      let bounds = new google.maps.LatLngBounds();
      this.mapLayer = new google.maps.Data({ map: that.map })
    })
    let photoOnmap = this.commonService.photoOnmap.subscribe(
			(geoData) => {
        console.log(geoData)
				    if (!geoData['GPS']) {
					this.toastr.info(this.constantKeys.geoTagMsg);
					return;
				}
        this.toggleMap.emit();

				    this.clearMarkers();
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
        // <div class="col-md-6">
				// 			${geoData['Exif']['36867']}
				// 		</div>
				const geos = this.getLatLongs(geoData['GPS']);
				const latlng = { lat: geos[0], lng: geos[1] };
				let infowindow
				this.geocoder.geocode({ 'location': latlng }, function (results, status) {
					if(results[0] && results[0].formatted_address) {
						infowindow = new google.maps.InfoWindow({
							content: results[0].formatted_address
						});
					} else {
						infowindow = new google.maps.InfoWindow({
							content: 'No physical address available'
						});
					}
					
        });
        this.toggleMap.emit();
        if (this.mapLayer) {
					this.mapLayer.setMap(null);

				}
				this.geoTaggingImageAddingOnMap(geoData)
      });
		this.subscriptions.push(photoOnmap);
		this.subscriptions.push(locations);
		this.subscriptions.push(sketching);
		this.subscriptions.push(geoTaggedImagesList);
  }
  sketching(recordInfo) {
    
    const url = Globals.urls.getSketchingData + "/" + recordInfo.formId + '/' + recordInfo.recordId;
    this.services.getFormData(url).subscribe(
      (res: any) => {
        if (res.status == 200) {
          if (this.mapLayer) {
            this.mapLayer.setMap(null);
          }
          let that = this;
          let bounds = new google.maps.LatLngBounds();
          this.mapLayer = new google.maps.Data({ map: that.map })
          this.mapLayer.addListener('addfeature', function (e) {
            processPoints(e.feature.getGeometry(), bounds.extend, bounds);
            this.map.fitBounds(bounds);
          });
          let icon = {
            url: that.recordsIcons.markerLocation, // url
            scaledSize: new google.maps.Size(50, 50), // scaled size
            //origin: new google.maps.Point(0, 0), // origin
            //anchor: new google.maps.Point(0, 0) // anchor
          };
          for (let i = 0, length = res.data.features.length; i < length; i++) {
            let feature = res.data.features[i];
            if (feature.geometry.type == 'Point') {
              res.data.features[i].properties['icon'] = icon;
            }

          }
          let markerCollection = this.mapLayer.addGeoJson(res.data);

          for (let i = 0, length = markerCollection.length; i < length; i++) {
            let feature = markerCollection[i];
            if (feature.getProperty('icon')) {
              this.mapLayer.setStyle(function (feature) {
                return {

                  icon: feature.getProperty('icon')
                };
              });
            }
          }
          this.mapLayer.addListener('click', function (e) {
            let id = e.feature.getId();
            let properties = res.data.features.filter((object) => object.id == id).map(obj => obj.properties);
            that.sketchingFormOpen(properties[0]);

          });
          this.map.fitBounds(bounds);
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
        console.log(res)
        if (res.status == 200) {
          this.commonService.formOpen.next({ recordInfo: data[0], formSkeleton: res.data.formSkeleton, recordEdit: false });
        } else if (res.status == 404) {

        } else if (res.status == 500) {
          //swal(CONSTANTS.serverProblem);
        }
      });
    // this.zone.run(() => {
    // 	console.log('enter',event)
    // });
  }
  clearMarkers() {
    this.setMapOnAll(null);
  }
  setMapOnAll(map: google.maps.Map | null) {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }
  geoTaggingImageAddingOnMap(geoData) {
		if (!geoData['GPS']) {
			this.toastr.info('Geo tag not avilable');
			return;
		}		
		const geos = this.getLatLongs(geoData['GPS']);
		const latlng = { lat: geos[0], lng: geos[1] };
		let infowindow
		this.geocoder.geocode({ 'location': latlng }, function (results, status) {
			let contentString = '';
			if(results && results[0].formatted_address) {
				contentString = `
				<span>
					<img style="position: relative;
					width: 278px;
					height: 200px;
				}" src= `+ geoData['imageUrl']+`>
					<div style=" position: absolute; top: 28px; color: white;width: 50%; font-weight: bold; margin-left: 16px">`+ results[0].formatted_address+`</div>
					
				</span>`;
			} else {
				contentString = `
				<span>
					<img style="position: relative;
					width: 278px;
					height: 200px;
				}" src= `+ geoData['imageUrl']+`>
					<div style=" position: absolute; top: 28px; color: white;width: 50%; font-weight: bold; margin-left: 16px">No physical address available</div>
					
				</span>`;
			}
			
			infowindow = new google.maps.InfoWindow({
				//content: results[0].formatted_address
				content: contentString
			});
		});
		
		if (this.mapLayer) {
			this.mapLayer.setMap(null);
		}
		let that = this;
		let myLatlng = new google.maps.LatLng(geos[0], geos[1]);
		let icon = {
			url: geoData['imageUrl'], // url
			scaledSize: new google.maps.Size(60, 60),

		};
		let marker = new google.maps.Marker({
			position: myLatlng,
			icon: icon,

		});
		marker.addListener('click', function () {
			infowindow.open(that.map, marker);
		});
		this.markers.push(marker);
		this.map.setZoom(15);
		// To add the marker to the map, call setMap();
		marker.setMap(this.map);
		this.map.panTo(marker.getPosition());
		let bounds = new google.maps.LatLngBounds();
		this.mapLayer = new google.maps.Data({ map: that.map })
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
  insertedLocations(locationsList) {
    //let locationsList = this.selectedRecords;
    if (locationsList.length < 1) {
			this.toastr.warning(this.constantKeys.locationMsgRecord);
			return;
		} else {
      this.toggleMap.emit();
      if(this.mapLayer) {
			this.mapLayer.setMap(null);
    }
    this.clearMarkers();
		    let that = this;
		let i;
		    let bounds = new google.maps.LatLngBounds();
		    let icon = {
			url: that.recordsIcons.markerLocation, // url
      scaledSize: new google.maps.Size(50, 50), // scaled size
    };
		    for (i = 0; i < locationsList.length; i++) {
			if(locationsList[i]['Inserted Place'] != ''){
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
				})
				contentString = contentString +
					'<button id="buttonMap" class="float-right btn btn-primary btn-sm btn-link">View more</button>' +
					'</div>' +
					'</div>';
				const infoWindow = new google.maps.InfoWindow({
						content: contentString
					  });
				google.maps.event.addListener(infoWindow, 'domready', () => {
						const el = document.getElementById('buttonMap');
						el.addEventListener('click', (event) => that.viewMore(null));
					  });
				let locations = locationsList[i]['Inserted Place'].split(',');
				let position = new google.maps.LatLng(locations[0],locations[1]);
				let marker = new google.maps.Marker({
					position: position,
					map: that.map,
					icon: icon,
				});
			    this.markers.push(marker);
				marker.addListener('click', function () {
					that.infoWindowData = (marker.getPosition().lat()).toString() +','+ (marker.getPosition().lng()).toString();
					infoWindow.open(that.map, marker);
				});
				bounds.extend(position);
			
			}else{

			}
		}
		that.map.fitBounds(bounds);
		if(this.mapFirst){
			this.mapFirst = false;
			//this.insertedLocations();
			setTimeout(()=>{
        this.insertedLocations(locationsList);
			//	this.locationClick.nativeElement.click();
			},10);
		}
	
	}	
  }
  ngOnDestroy() {
		this.subscriptions.forEach((subscription) => subscription.unsubscribe())  
	
	}
}
function processPoints(geometry, callback, thisArg) {
  if (geometry instanceof google.maps.LatLng) {
    callback.call(thisArg, geometry);
  } else if (geometry instanceof google.maps.Data.Point) {
    callback.call(thisArg, geometry.get());
  } else {
    geometry.getArray().forEach(function (g) {
      processPoints(g, callback, thisArg);
    });
  }

}