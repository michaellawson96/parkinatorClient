import { Component, OnInit, Output, EventEmitter, Injectable } from '@angular/core';
import { User } from '../DTO/User';
import { Car } from '../DTO/Car';
import { CarDetailsComponent } from '../car-details/car-details.component';
import { UserCarDataService } from '../userCar-data.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  @Output() selectedCar = new EventEmitter<Car>();
  selectedCarID : number;
  user: User;
  cars: Car[] = [];
  errorMsg :String = null;
  car_id : number;

  constructor(private cdService :UserCarDataService) { }


  ngOnInit() {
    this.user = <User>JSON.parse(sessionStorage.getItem('userDetail'));
    this.cdService.getUserCars(this.user.user_id).subscribe( data => {
      
      console.log(data.toString());
      this.cars = data;

      this.cars.forEach(element => {
      console.log(element);
      });
      this.errorMsg = null;
    },
    err=> {console.log("Error = ", err.message);
      this.errorMsg = err.message});
  }

  carSelected(i : number){
    console.log("Car ID = " + i);
    this.selectedCar.emit(this.cars.find(car => car.car_id === i));    
    this.selectedCarID = i;
  }

  trackByFn(index, item) {

    return ; // or item.id

  }

}
