import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    @Inject('apiUrl') private apiUrl,
    private http: HttpClient
  ) { }

addTodO(obj){
    let res= this.http.post( this.apiUrl + '/todo', obj);
    return res;
}

getAllTodos(){
  return this.http.get(this.apiUrl + '/todo');
}

updateTodo(obj){
  let res=this.http.put(this.apiUrl + '/todo', obj)
  return this.getAllTodos();
}

removeTodo(id){
  return this.http.delete(this.apiUrl + '/todo/' + id);
}

}
