import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public schema = {
    '#$#schema': 'http://json-schema.org/draft-06/schema#',
    'type': 'object',
    'title': 'Username With Private Key',
    'properties': {
      'textArea': {
        'title': 'Text Area Test',
        'description': 'Text Area Test',
        'type': 'string',
        'format': 'textarea',
        'options': {
          'rows': 2
        }
      },
      'stringTest': {
        'title': 'String',
        'description': 'String Test',
        'type': 'string',
        'minLength': 2,
        'maxLength': 5
      },
      'colorTest': {
        'title': 'Color',
        'description': 'Color Test',
        'type': 'string',
        'format': 'color',
        'default': '#000000'
      },
      'dateTest': {
        'title': 'Date',
        'description': 'Date Test',
        'type': 'string',
        'format': 'date',
        'instanceof': 'String'
      },
      'dateTimeTest': {
        'title': 'Date Time',
        'description': 'Date Time Test',
        'type': 'string',
        'format': 'date-time',
        'instanceof': 'String'
      },
      'numberTest': {
        'title': 'Number',
        'description': 'Number Test',
        'type': 'number',
        'minimum': 1,
        'maximum': 5
      },
      'booleanTest': {
        'title': 'Boolean Test',
        'type': 'boolean'
      },
      'eventTypes': {
        'title': 'Array Test',
        'type': 'array',
        'items': {
          'type': 'object',
          'properties': {
            'value': {
              'title': 'Event Type',
              'type': 'string',
              'enum': [
                'pullrequest:created',
                'pullrequest:updated',
                'pullrequest:approved',
                'pullrequest:unapproved',
                'pullrequest:fulfilled',
                'pullrequest:rejected'
              ]
            }
          },
          'required': [
            'value'
          ]
        }
      },
      'passwords': {
        'title': 'Passwords',
        'type': 'object',
        'properties': {
          'password1': {
            'title': 'Password 1',
            'type': 'string',
            'default': ''
          },
          'password2': {
            'title': 'Password 2',
            'type': 'string',
            'default': ''
          }
        }
      },
      'credentials': {
        'title': 'Key Info',
        'type': 'object',
        'oneOf': [
          {
            'title': 'Enter Directly',
            '$ref': '#/definitions/enterDirectly'
          },
          {
            'title': 'File On Server',
            '$ref': '#/definitions/fileOnServer'
          },
          {
            'title': 'From SSH File',
            '$ref': '#/definitions/fromSshFile'
          }
        ]
      }
    },
    'required': [
      'stringTest',
      'credentials'
    ],
    'additionalProperties': true,
    'definitions': {
      'enterDirectly': {
        'title': 'Enter Directly',
        'type': 'object',
        'properties': {
          'value': {
            'type': 'string',
            'title': 'Key'
          },
          'type': {
            'type': 'string',
            'enum': [
              'enter-directly'
            ],
            'default': 'enter-directly',
            'options': {
              'hidden': true
            }
          }
        },
        'required': [
          'value'
        ]
      },
      'fileOnServer': {
        'title': 'File On Server',
        'type': 'object',
        'properties': {
          'value': {
            'type': 'string',
            'title': 'Path'
          },
          'type': {
            'type': 'string',
            'enum': [
              'file-on-server'
            ],
            'default': 'file-on-server',
            'options': {
              'hidden': true
            }
          }
        }
      },
      'fromSshFile': {
        'title': 'From SSH File',
        'type': 'object',
        'properties': {
          'type': {
            'type': 'string',
            'enum': [
              'from-ssh-file'
            ],
            'default': 'from-ssh-file',
            'options': {
              'hidden': true
            }
          }
        }
      }
    }
  };

  public model: any = {
    'textArea': 'test',
    'stringTest': 'test',
    'passwords': {
      'password1': 'test',
      'password2': ''
    },
    'credentials': {
      'value': 'test',
      'type': 'file-on-server'
    },
    'numberTest': 10,
    'dateTest': '2018-07-19',
    'dateTimeTest': '2018-07-19T00:00:00.000Z'
  };

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
  }

  public onModelChanged(event: any) {

  }
}
