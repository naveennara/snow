import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
//import { } from 'googlemaps';
import * as Globals from '../../../globals';
import { MapLocationsService } from '../map-locations.service';
import { WindowRef } from '../../../sharing/sharing-module/WindowRef';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-map-locations',
  templateUrl: './map-locations.component.html',
  styleUrls: ['./map-locations.component.css']
})
export class MapLocationsComponent implements OnInit {

  @ViewChild('map', /* TODO: add static flag */ { static: true }) mapElement: any;
  map: google.maps.Map;
  pageDetails = { pageIcon: Globals.headerIcons };
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  usermapLayer;
  usersList: any = [];
  showAssetBlock = true;
  myInnerHeight: any;
  myInnerComponentHeight: any;
  open: boolean = false;
  selectedUserIndex: number;
  icons =  Globals.svgIcons;
  searchDept: any;
  InforObj = [];
  constants = Globals.allConstants.constantKeys;
  constructor(  public elRef: ElementRef, private winRef: WindowRef,
    public services: MapLocationsService) {
      this.myInnerHeight = winRef.nativeWindow.innerHeight;
      this.myInnerComponentHeight = winRef.nativeWindow.innerHeight - 5;
   }

  ngOnInit() {
    //this.elRef.nativeElement.ownerDocument.body.style.overflow = 'hidden';
    const mapProperties = {
      center: new google.maps.LatLng(17.387140,78.491684),
      // center: {
      //   lat: 0,
      //   lng: 0
      // },
      zoom: 8,
      mapTypeControl: false,
			fullscreenControl: false,
      streetViewControl: false,
      options: {
        gestureHandling: 'greedy'
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    this.getUserLocations();
  }
  openSideBar(){
    this.open = !this.open;
  }
  selectUserIndex(i){
    this.selectedUserIndex = i;
  }
  closeSideBar(){
    this.open =false;
  }
  onKey(event) {
		this.searchDept = event.target.value;
	  }
  getUserLocations() {
    const url = Globals.urls.userLocations + '/' + this.loginDetails.accounts[0]._id;
    this.services.getUserLocations(url).subscribe((userList: any[]) => {
      this.usersList =userList; //userList.map((user)=> user.username);
      let that = this;
      let i;
      let infoWindow = new google.maps.InfoWindow();
      let bounds = new google.maps.LatLngBounds();
      // Loop through our array of markers &amp; place each one on the map  
      for (i = 0; i < userList.length; i++) {
        let position = new google.maps.LatLng(userList[i].lat, userList[i].lng);
        let title = userList[i].username;
        bounds.extend(position);
         let marker = new google.maps.Marker({
          position: position,
          map: this.map,
          title:title
        });
        let content = '<div class="info_content">' +
        '<h3>User - '+  userList[i].username +'</h3>' +
        '<p> Accuracy - '+ userList[i].accuracy +'</p>' + '<p>Altitude - '+ userList[i].altitude +'</p>'+'</div>';
      //   marker.addListener('click', function () {
      //     that.closeOtherInfo();
      //     infoWindow.open(marker.get('map'), marker);
      //     that.InforObj[0] = infoWindow;
      // });
      this.map.addListener('click', function () {
       
      infoWindow.setContent(content);
      infoWindow.open(that.map, marker);
    });

        // Each marker to have an info window    


        // Automatically center the map fitting all markers on the screen
        this.map.fitBounds(bounds);
      }

      // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
      let boundsListener = google.maps.event.addListener((this.map), 'bounds_changed', function (event) {
        this.setZoom(5);
        google.maps.event.removeListener(boundsListener);
      });
    })
  }
  closeOtherInfo() {
    if (this.InforObj.length > 0) {
        /* detach the info-window from the marker ... undocumented in the API docs */
        this.InforObj[0].set("marker", null);
        /* and close it */
        this.InforObj[0].close();
        /* blank the array */
        this.InforObj.length = 0;
    }
}
  userLocation(){
    let position = new google.maps.LatLng(this.usersList[0].lat, this.usersList[0].lng);
    this.map.panTo(position);
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