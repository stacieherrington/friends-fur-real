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
        "roles": [],
        "favorites": [],
        "adopted_pets": [],
        "success_stories": []
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
        "favorites": [],
        "adopted_pets": [],
        "success_stories": []
    }
    ```

* Response: success message
* Response shape (JSON):
    ```json
    {
        "message": string
    }
    ```

<!-- ### Foster list
* Endpoint path: api/fosters/
* Endpoint method: GET
* Headers:
  * Authorization: Bearer token (only rescue admin and staff (and superuser))


### Foster application

* Endpoint path: api/foster/application ???
* Endpoint method: POST
* Headers:
  * Authorization: Bearer token (own user)

* Request shape (JSON):
    ```json
    {

    } -->

### Rescue list
* Endpoint path: api/rescues/
* Endpoint method: GET

* Response: a list of rescues

* Response shape (JSON):
    ```json
    {
        "name": string,
        "address": {
            "city": string,
            "state": string,
            "zip_code": string
        },
        "logo": string
    }

### Rescue detail
* Endpoint path: api/rescues/<id>
* Endpoint method: GET
* Response: rescue detail page
* Response shape (JSON):
    ```json
    {
        "name": string,
        "description": string,
        "address": {
            "address_one": string,
            "address_two": string,
            "city": string,
            "state": string,
            "zip_code": string
        },
        "logo": string,
        "picture": string,
        "rescue_admin": {},
        "pets": [],
        "staff": [],
        "approved_adopters": []
    }

### Adoption Application
* Endpoint path: api/pets/<id>/adopt
* Endpoint method: POST
* Headers:
  * Authorization: Bearer token (own user)

* Request shape (JSON):
   ```json
   {
        "pet": {},
        "first_name": string,
        "last_name": string,
        "address": {
            "address_one": string,
            "address_two": string,
            "city": string,
            "state": string,
            "zip_code": string
        },
        "phone_number": string,
        "has_small_children": bool,
        "has_dogs": bool,
        "has_cats": bool,
        "residence_type": string,
        "residence_owned": bool,
        "landlord_restrictions": string,
        "date_ready": string,
        "wants_preapproval": bool,
        "agrees_to_terms": bool,
        "status": string (choice)
    }
    ```
* Response: adoption application success message
* Response shape (JSON):
    ```json
    {
        "message": string
    }
    ```

### Adopt application list

* Endpoint path: api/rescues/<id>/applications
* Endpoint method: GET

* Response: a list of applications belonging to that rescue

* Response shape (JSON):
    ```json
    {
        "applications": []
    }
    ```

### Adopt application detail

* Endpoint path: api/rescues/<id>/applications/<id>
* Endpoint method: GET
* Headers:
  * Authorization: Bearer token (own user)

* Response: a detail view of one application

* Response shape (JSON):
    ```json
       {
        "pet": {},
        "first_name": string,
        "last_name": string,
        "address": {
            "address_one": string,
            "address_two": string,
            "city": string,
            "state": string,
            "zip_code": string
        },
        "phone_number": string,
        "has_small_children": bool,
        "has_dogs": bool,
        "has_cats": bool,
        "residence_type": string,
        "residence_owned": bool,
        "landlord_restrictions": string,
        "date_ready": string,
        "wants_preapproval": bool,
        "agrees_to_terms": bool,
        "status": string (choice)
    }
    ```

### Success Story
* Endpoint path: api/pets/<id>/story
* Endpoint method: POST
* Headers:
  * Authorization: Bearer token (logged in user, user already adopted this pet)

* Request shape (JSON):
   ```json
   {
        "pet": {},
        "account": {},
        "title": string,
        "story": string,
        "picture": string,
        "status": string (choice)
    }
    ```
* Response shape (JSON):
    ```json
    {
        "message": string
    }

### Success story list
* Endpoint path: api/rescues/<id>/stories
* Endpoint method: GET
* Headers:
  * Authorization: Bearer token (rescue staff)

* Response: a list of success stories specific to this rescue
* Response shape (JSON):
    ```json
    {
        "pet": {},
        "account": {},
        "title": string,
        "status": string (choice)
    }

### Success Story
* Endpoint path: api/pets/<id>/story
* Endpoint method: GET
* Headers:
  * Authorization: Bearer token (depends on "status")

* Response: a detail page of one story

* Response shape (JSON):
   ```json
   {
        "pet": {},
        "account": {},
        "title": string,
        "story": string,
        "picture": string,
        "status": string (choice)
    }
    ```
