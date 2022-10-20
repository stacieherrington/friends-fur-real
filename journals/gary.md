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

## Oct 15, 2022
Today, Worked on:
- refactory on apis for:
- Account:
    1. add api /api/manage/staffs/ to list all the staff accounts if current login-ed account is “admin” based on the admin’s rescue_id .
    2. change detail/update apis to GET/PATCH /api/accounts/profile/. This two APIs now check if a user is login-ed, only display detail/ allowed to update only if login-ed.
    3. for promote/demote APIs, this two APIs will auto check if the current user is login-ed and is “admin”. now using email to promote and demote

## Oct 16, 2022
Today, Worked on:
- refactory on api for:
- Story:
    1. change create story api url to POST:  /api/applications/{application_id}/story/, because a story is only related on an approved application. auto check current user match the application’s account_id.
    2. change list stories to list all the approved stories.
    3. random list 3 stories use sample aggregate, and random list 3 approved stories for home page to display
    4. update(PATCH)/delete a story by story_id now auto check if the current logged in user is the owner of the story. update api will check the status of story is submitted, if approved or rejected will not allowed.
    5. GET: /api/rescue/{rescue_id}/stories/ now list all the approved stories for a rescue_id, can use it as filter on base user story list page.
    6. GET: /api/manage/stories/  list all the stories for review by admin/staff by the staff’s/admin’s rescue_id.
    7. PATCH: approve / reject story by story_id now auto check current user is related rescue’s staff/admin.
    8. GET: /api/accounts/profile/stories/ list all stories for current logged in user. can display on account profile page.

## Oct 17, 2022
Today, Worked on:
- All the APIs are done and regrouped with a new tag name “management” holds all the apis for rescue admin/staff. did not  merge yet. just test all the apis from create account ,create rescue(auto set admin), create pet , submit application, approve/ reject applications, create story base on an approved application, approve/reject stories. update application/story. promote/demote staff … all works good. not merged yet. everything is on branch 39. ready to merge.
- setup mengodb init location-index when first time create docker volumn, and build docker compose.
- create an namagement dropdown menu for rescue/staff

## Oct 18, 2022
- fixed api bug when update a pet.
- login page works
- use a refresh state to force Navbar rerender after logged in and redirect to homePage
- conditional rendering management dropdown menu based on roles of current logged in user