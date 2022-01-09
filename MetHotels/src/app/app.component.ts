import { Component, NgModule } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditRoomDialogComponent } from './edit-room-dialog/edit-room-dialog.component';
import { Room } from './room/room.model';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  rooms: Room[];
  searchText: string;

  constructor(private dialog: MatDialog) {
    this.rooms = [
      new Room('Ambasador', 'Set in Niš, a few steps from King Milan Square, Ambasador Hotel offers accommodation with a restaurant, free private parking, a fitness centre and a bar. With a shared lounge, the 5-star hotel has air-conditioned rooms with free WiFi. The accommodation features a 24-hour front desk, room service and currency exchange for guests.', 150,  9.5),
      new Room('Eter', 'At the hotel, every room has a desk, a flat-screen TV, a private bathroom, bed linen and towels. All rooms include a safety deposit box and certain rooms here will provide you with river views. The units will provide guests with a wardrobe and a kettle.', 40, 7.0)
    ];
    this.searchText = '';
  }



  randomize() {
    if (this.searchText !== '') {
      alert(`Can't use randomize with search bar`);
      return;
    }
    let currentIndex = this.rooms.length;
    let randomIndex;
    let temp;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temp = this.rooms[currentIndex];
      this.rooms[currentIndex] = this.rooms[randomIndex];
      this.rooms[randomIndex] = temp;
    }
  }

  onDelete(room: Room): void {
    const index = this.rooms.indexOf(room);
    if (index > -1) {
      this.rooms.splice(index, 1);
    }
  }

  onEdit(room: Room): void {
    const dialogRef = this.dialog.open(EditRoomDialogComponent, {
      data: {
        room
      }
    });
    dialogRef.afterClosed().subscribe(room => {
      console.log(room);
    });
  }

  addRoom(room: Room) {
    this.rooms.push(room);
  }
}
