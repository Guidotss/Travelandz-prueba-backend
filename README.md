# Prueba tecnica para el cargo de desarrollador de software en travelandz

## Arquitectura

La arquitectura de la aplicación se basa en el patrón de diseño Clean Architecture, el cual se compone de tres capas principales:

- **Capa de Presentación**: Esta capa tiene la función de interactuar directamente con el usuario. En este contexto, se ha optado por implementar una API REST utilizando el framework Express.js. Su responsabilidad es recibir las solicitudes HTTP, procesarlas y enviar una respuesta al cliente correspondiente. En este proceso, esta capa se comunica con la capa de dominio para llevar a cabo las operaciones necesarias en la base de datos. Es importante destacar que aquí no debe residir la lógica de negocio, ya que esa responsabilidad es propia de la capa de dominio

- **Capa de Dominio**: Esta capa contiene la lógica de negocio de la aplicación. Aquí se definen las entidades y los casos de uso de la aplicación.
- **Capa de infraestructura**: Esta capa es la encargada de interactuar con la base de datos y otros servicios externos. En este caso, se ha implementado una base de datos NoSQL con MongoDB. Además, se ha utilizado el ORM Prisma para interactuar con la base de datos.


## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución para JavaScript.
- **Typescript**: Lenguaje de programación que añade tipado estático a JavaScript.
- **Express.js**: Framework para el desarrollo de aplicaciones web.
- **Prisma**: ORM para interactuar con la base de datos.
- **MongoDB**: Base de datos NoSQL.
- **Docker Compose**: Herramienta para definir y ejecutar aplicaciones Docker de múltiples contenedores.
- **ESLint**: Herramienta para identificar y reportar patrones encontrados
- **Postman**: Herramienta para probar API.

## Instalación

Para instalar y ejecutar la aplicación, se deben seguir los siguientes pasos:

1. Clonar el repositorio:

```bash
git clone https://github.com/Guidotss/Travelandz-prueba-backend.git
```

2. Instalar las dependencias:

```bash
cd Travelandz-prueba-backend
$ npm install
# o
$ yarn install
```

1. Cambiar el nombre del archivo .template.env a .env y configurar las variables de entorno.

   ```bash
   #Comando para copiar el archivo .template.env a .env
   cp .template.env .env
   ```

   ```bash
    #Puerto en el que se ejecutará la aplicación
   PORT=8080
   ```

   ```bash
   #API Key de hotelbeds. Cambiar <tu_api_key> por tu api key
    API_KEY="tu_api_key"
   ```

   ```bash
   #API Secret de hotelbeds. Cambiar <tu_secret_key> por tu secret key (transfers)
   SECRET_KEY="tu_secret_key"
   ```

   ```bash
   #MongoDB Atlas. Cambiar <tu_contraseña> por la contraseña de tu base de datos
   DATABASE_URL="mongodb+srv://Tu_Usuario:<tu_contraseña>@cluster0.tijy1to.mongodb.net/travelandz?retryWrites=true&w=majority&appName=Cluster0"
   ```

   ```bash
   #JWT Secret para encriptar. Si quieres cambiar la clave, cambia el valor de esta variable
   JWT_SECRET="123456"
   ```

   ```bash
   #Url base de la API de hotelbeds no es necesario cambiarla
   BASE_URL="https://api.test.hotelbeds.com/transfer-api/1.0"
   ```

2. Iniciar la aplicación:

```bash
$ npm run dev
# o
$ yarn dev
```

## Documentación

La documentación de la API de Hotelbeds se encuentra en el siguiente enlace: [Documentación de la API](https://developer.hotelbeds.com/documentation/transfers/)

## Endpoints

### Autenticación

#### Registro

- **URL**: /api/v1.0/auth/register
- **Método**: POST
- **Descripción**: Permite registrar un nuevo usuario en la aplicación.
- **Cuerpo de la solicitud**:
  ```json
  {
    "name": "Guido",
    "email": "email@hotmail.com"
    "password": "123456"
  }
  ```
- **Respuesta exitosa**:
- **Código de estado**: 201
- **Cuerpo de la respuesta**:
  ```json
  {
    "ok": true,
    "token": "token",
    "message": "User registered successfully",
    "data": {
      "name": "Guido",
      "email": "guidoolguin1@hotmail.com"
    }
  }
  ```
- **Respuesta fallida**:
- **Código de estado**: 400
- **Cuerpo de la respuesta**:
  ```json
  {
    "ok": false,
    "error": "User already exists"
  }
  ```

#### Inicio de sesión

- **URL**: /api/v1.0/auth/login
- **Método**: POST
- **Descripción**: Permite iniciar sesión en la aplicación.
- **Cuerpo de la solicitud**:
  ```json
  {
    "ok": true,
    "token": "token",
    "message": "User logged in successfully",
    "data": {
      "name": "Guido",
      "email": "guidoolguin@hotmail.com"
    }
  }
  ```
- **Respuesta fallida**:
- **Código de estado**: 400
- **Cuerpo de la respuesta**:
  ```json
  {
    "ok": false,
    "error": "Invalid credentials"
  }
  ```
- **Código de estado**: 404
- **Cuerpo de la respuesta**:
  ```json
  {
    "ok": false,
    "error": "User not found"
  }
  ```

### Renovación de token

- **URL**: /api/v1.0/auth/renew-token
- **Método**: GET
- **Descripción**: Permite renovar el token de autenticación.
- **Headers de la solicitud**:
  ```json
  {
    "X-Token": "token"
  }
  ```
- **Respuesta exitosa**:
- **Código de estado**: 200
- **Cuerpo de la respuesta**:

  ```json
  {
    "ok": true,
    "token": "token",
    "message": "Token renewed",
    "data": {
      "name": "Guido",
      "email": "guidoolguin@hotmail.com"
    }
  }
  ```

- **Respuesta fallida**:
- **Código de estado**: 400
- **Cuerpo de la respuesta**:

```json
{
  "ok": false,
  "error": "Invalid token"
}
```

- **Código de estado**: 401
- **Cuerpo de la respuesta**:
  ```json
  {
    "ok": false,
    "error": "Token expired"
  }
  ```
- **Código de estado**: 404
- **Cuerpo de la respuesta**:
  ```json
  {
    "ok": false,
    "error": "User not found"
  }
  ```
- **Código de estado**: 500
- **Cuerpo de la respuesta**:
  ```json
  {
    "ok": false,
    "error": "Error creating token"
  }
  ```

### Transfers

#### Consultar disponibilidad de transfers

- **URL**: /api/v1.0/transfer/availables
- **Método**: POST
- **Descripción**: Permite consultar la disponibilidad de transfers.
- **Cuerpo de la solicitud**:
  ```json
  {
    "language": "en",
    "fromType": "IATA",
    "fromCode": "BCN",
    "toType": "ATLAS",
    "toCode": 57,
    "departing": "2024-06-12T12:00:00",
    "adults": 2,
    "children": 0,
    "infants": 0
  }
  ```
- **Respuesta exitosa**:
- **Código de estado**: 200
- **Cuerpo de la respuesta**:

  ```json
  {
    "ok": true,
    "message": "Transfers availables",
    "avalaibleTransfers": [
      {
        "id": 0,
        "direction": "ARRIVAL",
        "transferType": "SHARED",
        "vehicle": {
          "code": "SH",
          "name": "Shuttle"
        },
        "category": {
          "code": "STND",
          "name": "Standard"
        },
        "pickupInformation": {
          "from": {
            "code": "BCN",
            "description": "Barcelona Airport",
            "type": "IATA"
          },
          "to": {
            "code": "57",
            "description": "Barcelona Universal",
            "type": "ATLAS"
          },
          "date": "2024-06-12",
          "time": "12:00:00",
          "pickup": {
            "address": null,
            "number": null,
            "town": null,
            "zip": null,
            "description": "description",
            "altitude": null,
            "latitude": null,
            "longitude": null,
            "checkPickup": {
              "mustCheckPickupTime": true,
              "url": "www.checkpickup.com",
              "hoursBeforeConsulting": 24
            },
            "pickupId": null,
            "stopName": null,
            "image": null
          }
        },
        "minPaxCapacity": 1,
        "maxPaxCapacity": 99,
        "content": {
          "vehicle": {
            "code": "SH",
            "name": "Shuttle"
          },
          "category": {
            "code": "STND",
            "name": "Standard"
          },
          "images": [
            {
              "url": "https://assets.holidaytaxis.com/imgs/default/vehicle_set/shuttle1min3.jpg",
              "type": "EXTRALARGE"
            },
            {
              "url": "https://assets.holidaytaxis.com/imgs/default/vehicle_set/shuttle1min3.jpg",
              "type": "LARGE"
            },
            {
              "url": "https://assets.holidaytaxis.com/imgs/default/vehicle_set/shuttle1min3.jpg",
              "type": "MEDIUM"
            },
            {
              "url": "https://assets.holidaytaxis.com/imgs/default/vehicle_set/shuttle1min3.jpg",
              "type": "SMALL"
            }
          ],
          "transferDetailInfo": [
            {
              "id": "0",
              "name": "50 min. Estimated journey time",
              "description": "50 min. Estimated journey time",
              "type": "GENERAL_INFO"
            },
            {
              "id": "1",
              "name": "1 passenger(s) minimum",
              "description": "1 passenger(s) minimum",
              "type": "GENERAL_INFO"
            },
            {
              "id": "2",
              "name": "99 passenger(s) maximum",
              "description": "99 passenger(s) maximum",
              "type": "GENERAL_INFO"
            },
            {
              "id": "3",
              "name": "suitcases permitted",
              "description": "suitcases permitted",
              "type": "GENERAL_INFO"
            }
          ],
          "customerTransferTimeInfo": [],
          "supplierTransferTimeInfo": [],
          "transferRemarks": [
            {
              "type": "CONTRACT",
              "description": "description",
              "mandatory": true
            }
          ]
        },
        "price": {
          "totalAmount": 19.1,
          "netAmount": null,
          "currencyId": "EUR"
        },
        "rateKey": "rateKey",
        "cancellationPolicies": [
          {
            "amount": 19.1,
            "from": "2024-06-11T12:00:00",
            "currencyId": "EUR",
            "isForceMajeure": null
          }
        ],
        "links": [
          {
            "rel": "self",
            "href": "/availability",
            "method": "GET"
          },
          {
            "rel": "confirm",
            "href": "/booking",
            "method": "POST"
          }
        ],
        "factsheetId": 39
      }
    ]
  }
  ```

- **Respuesta fallida**:
- **Código de estado**: 400
- **Cuerpo de la respuesta**:

  ```json
  {
    "ok": false,
    "message": "The fields X is required"
  }
  ```

- **Respuesta fallida**:
- **Código de estado**: 404
- **Cuerpo de la respuesta**:
  ```json
  {
    "ok": false,
    "message": "No transfers found for the given parameters."
  }
  ```

#### Reservar transfer

- **URL**: /api/v1.0/transfer/booking
- **Método**: POST
- **Descripción**: Permite reservar un transfer.
- **Cuerpo de la solicitud**:

  ```json
  {
    "language": "en",
    "holder": {
      "user_id": "user_Id",
      "name": "John",
      "surname": "Doe",
      "email": "john.doe@hotelbeds.com",
      "phone": "+16543245812"
    },

    "transfers": [
      {
        "rateKey": "rateKey",
        "transferDetails": [
          {
            "type": "FLIGHT",
            "direction": "ARRIVAL",
            "code": "123",
            "companyName": null
          }
        ]
      }
    ],
    "welcomeMessage": "Welcome Mr. John Doe",
    "clientReference": "1",
    "remark": "Booking remarks go here."
  }
  ```

- **Respuesta exitosa**:
- **Código de estado**: 200
- **Cuerpo de la respuesta**:

  ```json
  {
    "ok": true,
    "message": "Transfer booked",
    "bookingTransfer": [
      {
        "reference": "102-16858514",
        "bookingFileId": null,
        "creationDate": "2024-03-10T00:39:39",
        "status": "CONFIRMED",
        "modificationsPolicies": {
          "cancellation": true,
          "modification": true
        },
        "holder": {
          "name": "John",
          "surname": "Doe",
          "email": "john.doe@hotelbeds.com",
          "phone": "+16543245812"
        },
        "transfers": [
          {
            "id": 1,
            "rateKey": "rateKey",
            "status": "CONFIRMED",
            "transferType": "SHARED",
            "vehicle": {
              "code": "SH",
              "name": "Shuttle"
            },
            "category": {
              "code": "STND",
              "name": "Standard"
            },
            "pickupInformation": {
              "from": {
                "code": "BCN",
                "description": "Barcelona Airport",
                "type": "IATA"
              },
              "to": {
                "code": "57",
                "description": "Barcelona Universal",
                "type": "ATLAS"
              },
              "date": "2024-06-12",
              "time": "12:00:00",
              "pickup": {
                "address": null,
                "number": null,
                "town": null,
                "zip": null,
                "description": "description",
                "altitude": null,
                "latitude": null,
                "longitude": null,
                "checkPickup": {
                  "mustCheckPickupTime": true,
                  "url": "www.checkpickup.com",
                  "hoursBeforeConsulting": 24
                },
                "pickupId": null,
                "stopName": null,
                "image": null
              }
            },
            "paxes": [
              {
                "type": "ADULT",
                "age": 30
              },
              {
                "type": "ADULT",
                "age": 30
              }
            ],
            "content": {
              "vehicle": {
                "code": "SH",
                "name": "Shuttle"
              },
              "category": {
                "code": "STND",
                "name": "Standard"
              },
              "images": [
                {
                  "url": "https://assets.holidaytaxis.com/imgs/default/vehicle_set/shuttle1min3.jpg",
                  "type": "EXTRALARGE"
                },
                {
                  "url": "https://assets.holidaytaxis.com/imgs/default/vehicle_set/shuttle1min3.jpg",
                  "type": "LARGE"
                },
                {
                  "url": "https://assets.holidaytaxis.com/imgs/default/vehicle_set/shuttle1min3.jpg",
                  "type": "MEDIUM"
                },
                {
                  "url": "https://assets.holidaytaxis.com/imgs/default/vehicle_set/shuttle1min3.jpg",
                  "type": "SMALL"
                }
              ],
              "transferDetailInfo": [
                {
                  "id": "TRFTIME",
                  "name": "Transfer Time",
                  "description": "min. Estimated journey time",
                  "type": "GENERAL_INFO"
                },
                {
                  "id": "MINPAX",
                  "name": "Minimum pax",
                  "description": "passenger(s) minimum",
                  "type": "GENERAL_INFO"
                },
                {
                  "id": "MAXPAX",
                  "name": "Maximum pax",
                  "description": "passenger(s) maximum",
                  "type": "GENERAL_INFO"
                },
                {
                  "id": "LUGGAGE",
                  "name": "Number of suitcases",
                  "description": "suitcases permitted",
                  "type": "GENERAL_INFO"
                }
              ],
              "customerTransferTimeInfo": [],
              "supplierTransferTimeInfo": [],
              "transferRemarks": [
                {
                  "type": "CONTRACT",
                  "description": "description",
                  "mandatory": true
                }
              ]
            },
            "price": {
              "totalAmount": 19.1,
              "netAmount": null,
              "currencyId": "EUR"
            },
            "cancellationPolicies": [
              {
                "amount": 19.1,
                "from": "2024-06-11T00:00:00",
                "currencyId": "EUR",
                "isForceMajeure": false
              }
            ],
            "factsheetId": 39,
            "arrivalFlightNumber": "123",
            "departureFlightNumber": null,
            "arrivalShipName": null,
            "departureShipName": null,
            "arrivalTrainInfo": null,
            "departureTrainInfo": null,
            "transferDetails": [
              {
                "type": "FLIGHT",
                "direction": "ARRIVAL",
                "code": "123",
                "companyName": null
              }
            ],
            "sourceMarketEmergencyNumber": "34971211630",
            "links": [
              {
                "rel": "transferCancel",
                "href": "/booking/en/reference/102-16858514",
                "method": "DELETE"
              }
            ]
          }
        ],
        "clientReference": "1",
        "remark": "Booking remarks go here.",
        "invoiceCompany": {
          "code": "E14"
        },
        "supplier": {
          "name": "HOTELBEDS SPAIN, S.L.U",
          "vatNumber": "ESB28916765"
        },
        "totalAmount": 19.1,
        "totalNetAmount": 19.1,
        "pendingAmount": 19.1,
        "currency": "EUR",
        "links": [
          {
            "rel": "self",
            "href": "/booking/en/reference/102-16858514",
            "method": "GET"
          },
          {
            "rel": "bookingDetail",
            "href": "/booking/en/reference/102-16858514",
            "method": "GET"
          },
          {
            "rel": "bookingCancel",
            "href": "/booking/en/reference/102-16858514",
            "method": "DELETE"
          }
        ],
        "paymentDataRequired": false
      }
    ]
  }
  ```

- **Respuesta fallida**:
- **Código de estado**: 400
- **Cuerpo de la respuesta**:

  ```json
  {
    "ok": false,
    "message": "The fields X is required"
  }
- **Código de estado**: 400
- **Cuerpo de la respuesta**:
  ```json
  {
    "ok": false,
    "message": "Booking already exists"
  }

  ```
- **Código de estado**: 404
- **Cuerpo de la respuesta**:
  ```json
  {
    "ok": false,
    "message": "No transfers found for the given parameters."
  }
  ```

- **Código de estado**: 500
- **Cuerpo de la respuesta**:
  ```json
  {
    "ok": false,
    "message": "Internal server error"
  }



#### Consultar reservas

- **URL**: /api/v1.0/transfer/bookings/:userId
- **Método**: GET
- **Descripción**: Permite consultar las reservas de un usuario.
- **Respuesta exitosa**:
- **Código de estado**: 200
- **Cuerpo de la respuesta**:

  ```json
  {
    "ok": true,
    "message": "Booked transfers retrieved successfully",
    "bookedTransfers": [
        {
            "reference": "102-16858514",
            "bookingFileId": null,
            "creationDate": "2024-03-10T00:39:39",
            "status": "CONFIRMED",
            "clientReference": "1",
            "remark": "Booking remarks go here.",
            "totalAmount": 19.1,
            "totalNetAmount": 19.1,
            "pendingAmount": 19.1,
            "currency": "EUR",
            "paymentDataRequired": false,
            "transfers": [
                {
                    "id": 1,
                    "rateKey": "rateKey",
                    "status": "CONFIRMED",
                    "transferType": "SHARED",
                    "vehicle": {
                        "code": "SH",
                        "name": "Shuttle"
                    },
                    "category": {
                        "code": "STND",
                        "name": "Standard"
                    },
                    "pickupInformation": {
                        "from": {
                            "code": "BCN",
                            "description": "Barcelona Airport",
                            "type": "IATA"
                        },
                        "to": {
                            "code": "57",
                            "description": "Barcelona Universal",
                            "type": "ATLAS"
                        },
                        "date": "2024-06-12",
                        "time": "12:00:00",
                        "pickup": {
                            "address": null,
                            "number": null,
                            "town": null,
                            "zip": null,
                            "description": "description",
                            "altitude": null,
                            "latitude": null,
                            "longitude": null,
                            "checkPickup": {
                                "mustCheckPickupTime": true,
                                "url": "www.checkpickup.com",
                                "hoursBeforeConsulting": 24
                            },
                            "pickupId": null,
                            "stopName": null,
                            "image": null
                        }
                    },
                    "paxes": [
                        {
                            "type": "ADULT",
                            "age": 30
                        },
                        {
                            "type": "ADULT",
                            "age": 30
                        }
                    ],
                    "content": {
                        "vehicle": {
                            "code": "SH",
                            "name": "Shuttle"
                        },
                        "category": {
                            "code": "STND",
                            "name": "Standard"
                        },
                        "images": [
                            {
                                "url": "https://assets.holidaytaxis.com/imgs/default/vehicle_set/shuttle1min3.jpg",
                                "type": "EXTRALARGE"
                            },
                            {
                                "url": "https://assets.holidaytaxis.com/imgs/default/vehicle_set/shuttle1min3.jpg",
                                "type": "LARGE"
                            },
                            {
                                "url": "https://assets.holidaytaxis.com/imgs/default/vehicle_set/shuttle1min3.jpg",
                                "type": "MEDIUM"
                            },
                            {
                                "url": "https://assets.holidaytaxis.com/imgs/default/vehicle_set/shuttle1min3.jpg",
                                "type": "SMALL"
                            }
                        ],
                        "transferDetailInfo": [
                            {
                                "id": "TRFTIME",
                                "name": "Transfer Time",
                                "description": "min. Estimated journey time",
                                "type": "GENERAL_INFO"
                            },
                            {
                                "id": "MINPAX",
                                "name": "Minimum pax",
                                "description": "passenger(s) minimum",
                                "type": "GENERAL_INFO"
                            },
                            {
                                "id": "MAXPAX",
                                "name": "Maximum pax",
                                "description": "passenger(s) maximum",
                                "type": "GENERAL_INFO"
                            },
                            {
                                "id": "LUGGAGE",
                                "name": "Number of suitcases",
                                "description": "suitcases permitted",
                                "type": "GENERAL_INFO"
                            }
                        ],
                        "transferRemarks": [
                            {
                                "type": "CONTRACT",
                                "description": "description",
                                "mandatory": true
                            }
                        ],
                        "customerTransferTimeInfo": [],
                        "supplierTransferTimeInfo": []
                    },
                    "price": {
                        "totalAmount": 19.1,
                        "netAmount": null,
                        "currencyId": "EUR"
                    },
                    "cancellationPolicies": [
                        {
                            "amount": 19.1,
                            "from": "2024-06-11T00:00:00",
                            "currencyId": "EUR",
                            "isForceMajeure": false
                        }
                    ],
                    "factsheetId": 39,
                    "arrivalFlightNumber": "123",
                    "departureFlightNumber": null,
                    "arrivalShipName": null,
                    "departureShipName": null,
                    "arrivalTrainInfo": null,
                    "departureTrainInfo": null,
                    "transferDetails": [
                        {
                            "type": "FLIGHT",
                            "direction": "ARRIVAL",
                            "code": "123",
                            "companyName": null
                        }
                    ],
                    "sourceMarketEmergencyNumber": "34971211630",
                    "links": [
                        {
                            "rel": "transferCancel",
                            "href": "/booking/en/reference/102-16858514",
                            "method": "DELETE"
                        }
                    ]
                }
            ],
            "modificationsPolicies": {
                "cancellation": true,
                "modification": true
            },
            "holder": {
                "name": "John",
                "surname": "Doe",
                "email": "john.doe@hotelbeds.com",
                "phone": "+16543245812"
            },
            "invoiceCompany": {
                "code": "E14"
            },
            "supplier": {
                "name": "HOTELBEDS SPAIN, S.L.U",
                "vatNumber": "ESB28916765"
            },
            "links": [
                {
                    "rel": "self",
                    "href": "/booking/en/reference/102-16858514",
                    "method": "GET"
                },
                {
                    "rel": "bookingDetail",
                    "href": "/booking/en/reference/102-16858514",
                    "method": "GET"
                },
                {
                    "rel": "bookingCancel",
                    "href": "/booking/en/reference/102-16858514",
                    "method": "DELETE"
                }
            ]
        }
    ]
  }
  ```

- **Respuesta fallida**:
- **Código de estado**: 400
- **Cuerpo de la respuesta**:

  ```json
  {
    "ok": false,
    "message": "Invalid id"
  }
  ```

- **Código de estado**: 404
- **Cuerpo de la respuesta**:
  ```json
  {
    "ok": false,
    "message": "User not found"
  }
- **Código de estado**: 500
- **Cuerpo de la respuesta**:
  ```json
  {
    "ok": false,
    "message": "Internal server error"
  }


## Autor

- Guido Olguin - [Guidotss](https://github.com/Guidotss?tab=repositories)
