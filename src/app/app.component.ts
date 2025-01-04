import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

const collage = {
  collage: [
    {
      department: [
        {
          chemical: [
            {
              id: 1,
              name: 'Yogesh',
              address: 'murgud',
              MobNo: 3,
            },
            {
              id: 2,
              name: 'Yogesh2',
              address: 'murgud2',
              MobNo: 2,
            },
          ],
        },
        {
          computer: [
            {
              id: 3,
              name: 'Yogesh3',
              address: 'murgud3',
              MobNo: 1,
            },
            {
              id: 4,
              name: 'Yogesh4',
              address: 'murgud4',
              MobNo: 2,
            }
          ],
        },
      ],
    },
  ],
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'MessApp';
  
  // js for get Duplicate data from object

  result : any[] = [];
  seen : any = {};
  allStudentArry : any[] = [];


  ngOnInit(){
    this.getDuplicateObject(collage);
  } 

  getDataByDepartment(data : any){
    this.allStudentArry = [];
    data.collage[0].department.forEach((item: any) => {
      for (const key in item) {
        item[key].forEach((v :any) => {
          this.allStudentArry.push(v);
        });
      }
    });
  }

  getDuplicateObject(data :any) {
    const mapArray = new Map();
    this.getDataByDepartment(data);
    this.allStudentArry.forEach((item : any) => {
      for (const key in item) {
        const value = key +":"+ item[key];
        if(mapArray.has(value)){
          this.result.push(item);
          break;
        }
        else{
          mapArray.set(value, item);
        }
      }
    });
    console.log(this.result);
  }
  
  // // js for get Duplicate data from object
  // function getDuplicateObject(data, keys) {
  //   let duplicateArry = [];
  //   let counts = {};
  
  //   data.collage[0].department.forEach((item) => {
  //     for (const key in item) {
  //       item[key].forEach((item) => {
  //         counts[item[keys]] = (counts[item[keys]] || 0) + 1;
  //         if (counts[item[keys]] === 2) {
  //           duplicateArry.push(item);
  //         }
  //       });
  //     }
  //   });
  //   console.log(duplicateArry);
  // }
  // getDuplicateObject(collage, 'MobNo');
  
  // // js for get Duplicate data from object
  // function getDuplicateObject(data, field, value) {
  //   let newArray = [];
  //   data.collage[0].department.forEach((item) => {
  //     for (const key in item) {
  //       item[key].forEach((obj) => {
  //         if (obj[field] == value) {
  //           newArray.push(obj);
  //         }
  //       });
  //     }
  //   });
  //   console.log(newArray);
  // }
  
  // getDuplicateObject(collage, 'MobNo', '1');
  


}
