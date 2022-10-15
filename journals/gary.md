## Oct 3, 2022
Today, worked on:
- We create / edit the docker compose yaml file. set api as out bnackend folder, ghi as our frontend folder. Help team mates to download mongo-compass and connect to mongodb://localhost:27017.

## Oct 4, 2022
Today, worked on:
- We created Pet related models, finished part of api-s/querie-s for pet.
What I learned today:
1. Don't forget the '/' in front of api path.
2. In order to use class build-in function, have to create an instance of it. 
3. FastAPI model as parameter using Model.field_name to get the data, NOT Model['field_name']
4. How FastAPI Model Queries and Routers working together.

## Oct 5, 2022
Today, Worked on:
- We create pet-update-api as group. working with Kate and Stacie to create success-story-list-by-rescue_id.
- create list_stories api
- helped team mates on merging branches to main.
what I learned today: 
using tags = 'group_name' to group api-s for fastAPI/docs

## Oct 10, 2022
Today, Worked on:
- Help Tyler to test Accounts apis and fix bugs
- Found out we need a way to kick off a loged in user after promoted or demoted.
    * because the old token does not include the updated roles.

## Oct 11, 2022
Today, Worked on:
- trying to draw a diagram to display all the relations for all the models we have. We can use it to filter or search or display cross models/collections
- fix docker-compose.yaml file to make ghi/node working on windows

## Oct 12, 2022
Today, worked on:
- still working on clear all the relations between models.

## Oct 13, 2022
Today, Worded on :
- all models wairframs and conections are done. all the pages and apis need for each on commont: - https://whimsical.com/fur-normal-account-TJ3iXQfk1iG4YmCn1KuD47
- and list out all the grouped api for each model, with all the detail. docs/api_model_diagram.excalidraw

## Oct 14, 2022
Today, Worked on:
- refactory on apis for all the models
- Pet:
    1. when create a pet the “is_adopted” is false by default
    2. when create a pet please add a “rescue_id” from pet form.
    3. random 3 pets now return 3 pets with false on “is_adopted”
    4. add list pet by rescue_id
    5. change id to model_id on urls to help understand.
- Application:
    1. renamed adoption_applications to applications
    2. add list applications by account_id and list applications by rescue_id for user to view on profile page and rescue admin staff to review
    3. add api to approve an application by application_id, will auto check if there is an application is approved for the same pet_id, if yes, auto reject; if no auto reject all other applications for the same pet_id and change target pet is_adopted to True
    4. add api to reject an application by application_id