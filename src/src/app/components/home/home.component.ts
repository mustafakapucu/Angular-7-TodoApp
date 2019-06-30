import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {MatSnackBar} from '@angular/material/snack-bar';
import { TodoService } from 'src/app/services/todo.service';
import { Key } from 'protractor';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

   data = {}

  constructor(
    private todoService:TodoService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getAllTodos();
  }

  drop(event: CdkDragDrop<string[]>) {
  
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    this.updateTodo();                    
  }

  addTodo(todo){
    const obj = { todo: todo.value };
this.todoService.addTodO(obj)
.subscribe({
  next:(res:any) => {
    this.openSnackBar(res.message);
    this.getAllTodos();
    todo.value='';
  }, error:(err) => {
console.log(err);
  } 
})}

getAllTodos(){

this.todoService.getAllTodos()
.subscribe({
  next:(res) => {
   
    Object.keys(res).forEach(key => {
      this.data[key] = res[key];
    });
    
  }, error:(err) => {
    console.log(err);
  }
})}

updateTodo(){
  this.todoService.updateTodo(this.data)
  .subscribe({
next:(res) => {
console.log(res);
}, error:(err) => {
  console.log(err);
}
  });
}

removeTodo(id){
 if(confirm('Silmek istediğinize emin misiniz?'))
 {
  this.todoService.removeTodo(id)
  .subscribe(
    {
      next:(res)=> {
       console.log(res);
       this.getAllTodos();
      }, error:(err)=> {
       console.log(err);
      }
    }
  )
 } 

 
 
}

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Tamam', {
      duration: 2000,
    });

}
}
