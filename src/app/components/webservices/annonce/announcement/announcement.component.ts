import { Component, OnInit, ViewChild } from '@angular/core';
import { AnnouncementService } from '../announcement.service';
import { MatTableDataSource } from '@angular/material/table';
import { Announcement } from '../bean/announcement';
import { MatSort } from '@angular/material/sort';
import { error } from 'console';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.scss'
})
export class AnnouncementComponent implements OnInit{

  displayedColumns: string[] = ['description', 'weight_available', 'date_of_departure', 'destination', 'price', 'creation_date', 'status'];

  dataSource = new MatTableDataSource<Announcement>();

  @ViewChild(MatSort, {static : true}) sort! : MatSort;

  constructor(private announcementService : AnnouncementService){}

  /*ngOnInit(): void {
    this.announcementService.getAllAnnouncements().subscribe({
      next : (announcement) =>{
        console.log('Annonces reçues :', announcement);
      }
    })
  }*/

  ngOnInit(): void {
      this.announcementService.getAllAnnouncements().subscribe(data => {
        console.log(data);
        this.dataSource = new MatTableDataSource(data.content);
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log('Error fetching announcement:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(this.dataSource)
    {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

}
