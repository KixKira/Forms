import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder,
              private validators: ValidatorsService) { 
    this.createForm();
    this.loadData();
  }

  ngOnInit(): void {
  }

  //VALIDATIONS

  //HOBBIE VALIDATION
  get hobbie() {
    return this.form.get('hobbie') as FormArray;
  }

  //NAME VALIDATION
  get nameNoValid() {
    return this.form.get('name')?.invalid && this.form.get('name')?.touched;
  }

  //SURNAME VALIDATION
  get surnameNoValid() {
    return this.form.get('surname')?.invalid && this.form.get('surname')?.touched;
  }

  //EMAIL VALIDATION
  get emailNoValid() {
    return this.form.get('email')?.invalid && this.form.get('email')?.touched;
  }

  //USER VALIDATION
  //User No Valid
  get userNoValid() {
    return this.form.get('user')?.invalid && this.form.get('user')?.touched;
  }
  
  //User Valid
  get userValid(){
    return this.form.get('user')?.valid && this.form.get('user')?.touched;
  }

  //ADDRESS VALIDATION
  get addressNoValid() {
    return this.form.get('address.address')?.invalid && this.form.get('address.address')?.touched;
  }

  //PASSWORD VALIDATION
  get pass1NoValid() {
    return this.form.get('pass1')?.invalid && this.form.get('pass1')?.touched;
  }

  //REPEAT PASSWORD VALIDATION
  get pass2NoValid() {
    const pass1 = this.form.get('pass1').value;
    const pass2 = this.form.get('pass2').value;
    return (pass1 === pass2)?false:true
  }

  //Create Form
  createForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      user: ['', , this.validators.userExist],
      pass1: ['', [Validators.required, Validators.minLength(8)]],
      pass2: ['',Validators.required],
      address: this.fb.group({
        address: ['', Validators.required]
      }),
      hobbie: this.fb.array([])
    },{
      validators: this.validators.matchPass('pass1', 'pass2')
    });
  }

  //Load Data
  loadData(){
    this.form.reset({
      name:'Oscar',
      surname:'Machado',
      email:'oemqkix@gmail.com',
      pass1: '12345678',
      pass2: '12345678',
      address:{
        address:'Vitacura, Santiago, Chile'
      }
    }) 
  }

  //Add Hobbie Button
  addHobbie() {
    this.hobbie.push(this.fb.control(''))
  }
  
  //Delete Hobbie Button
  deleteHobbie(i: number) {
    this.hobbie.removeAt(i);
  }

  //Save Button
  save() {
    console.log(this.form);
    if ( this.form.invalid ){
      return Object.values(this.form.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }
    this.form.reset();
  }

}
