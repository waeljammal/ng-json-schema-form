import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public schema = {
    'type': 'object',
    'properties': {
      'parameters': {
        'title': 'Header Key Value Pairs',
        'type': 'array',
        'items': {
          'type': 'object',
          'properties': {
            'key': {
              'title': 'Key',
              'type': 'string'
            },
            'value': {
              'title': 'Value',
              'type': 'string'
            }
          },
          'required': [
            'key',
            'value'
          ]
        },
        'minItems': 0,
        'uniqueItems': true
      }
    }
  };

  public model: any = null;

  constructor() {
    // setTimeout(() => {
    //   this.model = {
    //     'username': 'new',
    //     'passwords': {
    //       'password1': 'new',
    //       'password2': 'new'
    //     },
    //     'credentials': {
    //       'type': 'from-ssh-file'
    //     },
    //     'booleanTest': true,
    //   };
    // }, 4000);

    setTimeout(() => {
      this.model = {
        parameters: []
      };
    }, 1000);
  }

  public onModelChanged(event: any) {
    console.log('event', event);
  }
}
