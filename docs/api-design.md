# APIs

### Log in

* Endpoint path: /token
* Endpoint method: POST

* Request shape (form):
  * username: string
  * password: string

* Response: Account information and a token
* Response shape (JSON):
    ```json
    {
      "account": {
        "email": string,
        "first_name": string,
        "last_name": string,
        "avatar_url": string
      },
      "token": string
    }
    ```

### Log out

* Endpoint path: /token
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
    ```json
    true
    ```

### Pet list

* Endpoint path: api/pets/
* Endpoint method: GET

* Response:

* Response shape (JSON):
    ```json
    {
        "pets": [
            {
            "name": string,
            "type": string,
            "breed": string,
            "age": int,
            "sex": string,
            "size": string,
            "description": string,
            "weight": string,
            "pictures": [string],
            "primary_color": string,
            "ok_with_dogs": bool,
            "ok_with_cats": bool,
            "shots_up_to_date": bool,
            "ok_with_kids": bool,
            "spayed_neutered": bool,
            "house_trained": bool,
            "special_needs": bool,
            "rescue": string,
            "needs_foster": bool,
            "adoptable": bool,
            "date_added": string,
            "adopted": bool,
            "adopter": string
            }
        ]
    }
    ```

### Create a pet

* Endpoint path: api/pets/
* Endpoint method: POST
* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    {
        "name": string,
        "type": string,
        "breed": string,
        "age": int,
        "sex": string,
        "size": string,
        "description": string,
        "weight": string,
        "pictures": [string],
        "primary_color": string,
        "ok_with_dogs": bool,
        "ok_with_cats": bool,
        "shots_up_to_date": bool,
        "ok_with_kids": bool,
        "spayed_neutered": bool,
        "house_trained": bool,
        "special_needs": bool,
        "rescue": string,
        "needs_foster": bool,
        "adoptable": bool,
        "date_added": string,
        "adopted": bool,
        "adopter": string
    }
    ```

* Response: success message string

* Response shape (JSON):
    ```json
    {
        "message": string
    }
    ```


### Pet detail

* Endpoint path: api/pets/<id>
* Endpoint method: GET

* Response:

* Response shape (JSON):
    ```json
    {
        "name": string,
        "type": string,
        "breed": string,
        "age": int,
        "sex": string,
        "size": string,
        "description": string,
        "weight": string,
        "pictures": [string],
        "primary_color": string,
        "ok_with_dogs": bool,
        "ok_with_cats": bool,
        "shots_up_to_date": bool,
        "ok_with_kids": bool,
        "spayed_neutered": bool,
        "house_trained": bool,
        "special_needs": bool,
        "adopted": bool,
        "adopter": string
    }
    ```

### Pet update

* Endpoint path: api/pets/<id>
* Endpoint method: PUT

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    {
        "name": string,
        "type": string,
        "breed": string,
        "age": int,
        "sex": string,
        "size": string,
        "description": string,
        "weight": string,
        "pictures": [string],
        "primary_color": string,
        "ok_with_dogs": bool,
        "ok_with_cats": bool,
        "shots_up_to_date": bool,
        "ok_with_kids": bool,
        "spayed_neutered": bool,
        "house_trained": bool,
        "special_needs": bool,
        "adopted": bool,
        "adopter": string
    }
    ```

* Response: the pet detail page

* Response shape (JSON):
    ```json
    {
        "name": string,
        "type": string,
        "breed": string,
        "age": int,
        "sex": string,
        "size": string,
        "description": string,
        "weight": string,
        "pictures": [string],
        "primary_color": string,
        "ok_with_dogs": bool,
        "ok_with_cats": bool,
        "shots_up_to_date": bool,
        "ok_with_kids": bool,
        "spayed_neutered": bool,
        "house_trained": bool,
        "special_needs": bool,
        "adopted": bool,
        "adopter": string
    }
    ```

### Pet delete

* Endpoint path: api/pets/<id>
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: success message

* Response shape (JSON):
    ```json
    {
        "message": string
    }
    ```

### Create an account (signup)

* Endpoint path: api/accounts/
* Endpoint method: POST

* Request shape (JSON):
    ```json
    {
        "email": string,
        "password": string,
        "zip_code": string,
        "first_name": string,
        "last_name": string,
        "address": {
            "address_one": string,
            "address_two": string,
            "city": string,
            "state": string
        },
        "picture": string,
        "applications": [],
        "roles": []
    }
    ```

* Response: success message
* Response shape (JSON):
    ```json
    {
        "message": string
    }
    ```

### Promote an account

* Endpoint path: api/accounts/<id>
* Endpoint method: PATCH
* Headers:
  * Authorization: Bearer token (rescue admin)

* Request shape (JSON):
    ```json
    {
        "roles": []
    }

* Response: success message
* Response shape (JSON):
    ```json
    {
        "message": string
    }
    ```

### Update an account

* Endpoint path: api/accounts/
* Endpoint method: PATCH or PUT ???
* Headers:
  * Authorization: Bearer token (own user)

* Request shape (JSON):
    ```json
    {
        "email": string,
        "password": string,
        "zip_code": string,
        "first_name": string,
        "last_name": string,
        "address": {
            "address_one": string,
            "address_two": string,
            "city": string,
            "state": string
        },
        "picture": string,
        "applications": [],
    }
    ```

* Response: success message
* Response shape (JSON):
    ```json
    {
        "message": string
    }
    ```
