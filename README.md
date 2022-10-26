# FriendsFurReal

- Gary Tang
- Kate Quashie-Javellana
- Stacie Herrington
- Tyler Male

Friends Fur Real - helping our furry friends find their fur-ever families!

## Design

- [API design](docs/api-design.md)
- [Original wireframe](docs/FriendsFurReal.png)
- [Revised wireframe](docs/fur.png)

## Intended market

We are targeting local animal rescue organizations nationwide, as well as the general public, in an effort to bring these two groups together to help more pets find loving fur-ever homes.

## Functionality

### Site visitor/potential adopter

In the past, potential adopters have had to visit multiple individual rescue organizations and shelters in search of their purr-fect pet.
Now, visitors to our site can access profiles of adoptable pets sponsored by a variety of organizations, all in one convenient place, with a streamlined adoption application process.
- A visitor is greeted with the homepage, which displays three randomly selected adoptable pets (Featured Friends), as well as teasers from three random "success stories" (Happy Tails) of pets who were matched with their fur-ever homes through our site.
- A visitor can choose to create an account with just an email address, password, and ZIP code (for location-based pet sorting). But, a visitor can also choose to browse anonymously and view all the available pets.
- From the homepage, a visitor can:
  - Click on a featured pet card to see pet details, or click on the card's "Adopt me!" button (which will direct them to sign in or create an account if they are not logged in) and then fill out an adoption application.
  - Favorite a featured pet (if signed in).
  - Click on a Happy Tails success story teaser card to read the full story.
  - Navigate to a list of adoptable pets, which is limited to 200 miles away from the visitor and sorted by distance if the visitor is signed in (thanks to our **geospatial query** and a free and open address service).
  - Navigate to a list of success stories.
  - Navigate to their profile page (if signed in).
- From the pets list page, a visitor can:
  - Click on a pet card to see pet details, or click on the card's "Adopt me!" button (which will direct them to sign in or create an account if they are not logged in) and then fill out an adoption application.
  - Favorite a pet.
  - Choose from some dropdown filters to filter the pet sort.
- A visitor can make unlimited adoption applications (but cannot make more than one application per pet).
- A visitor with an approved adoption application can submit their own success story to be included with Happy Tails. (A rescue admin or staff must approve the story before it is published.)
- From the profile page, a visitor can add details (like name, address, and photo) to their profile, as well as view their favorites list and a list of any applications they have completed. Their applications list displays the status of any applications (submitted, rejected, approved).

### Rescue organization admin/staff

Our site gives rescues the power to publicize their adoptable pets in a nationwide database, reaching more potential adopters than ever before.
- A rescue organization member is given the role of staff or admin for their particular organization. An admin can promote a regular account holder to staff with just their email address. Admin and staff can create, update, and delete pets that belong to their own organization.
- When a rescue admin or staff is signed in, some extra features display for them:
  - A "management" dropdown menu on the navbar that navigates to pet, application, and story management pages.
  - For any pet belonging to the rescue, the pet card (whether on the homepage or the pets list page) will display additional buttons: update and delete.
- From the pet management page, a rescue admin/staff can view, add, update, and delete their own pets.
  - The create and update pet forms include photo uploading functionality with **AWS S3 integration**.
- On the application management page, a rescue admin/staff can view a list of adoption applications submitted for any of the rescue's pets.
  - Admin/staff can navigate to an application detail page, and can approve or reject the application.
  - Once an application for a particular pet is approved, the pet is marked adopted in the database, and any other application made for that same pet will be automatically rejected.
- On the story management page, a rescue admin/staff can view a list of submitted success stories written by the rescue's own approved adopters. Admin/staff can navigate to story detail pages, and can approve or reject stories. Once a story is approved by the rescue admin/staff, the story is automatically published.
- Rescue admin has a special page to manage staff. Regular account holders can be promoted to staff, and staff can be demoted back to regular account holders.


## The future of FriendsFurReal

We are excited about the future pawsibilities for our site. The following are features we would like to add soon.
- The ability to accommodate foster parents as well as adopters:
  - Foster "matchmaking" results based on location and pet criteria. Matchmaking results will be provided to rescue organizations as well as potential foster parents.
  - Foster applications.
- The ability to upload multiple pet photos.
- Messaging between rescue orgs and potential adopters/fosters.
- Pets searchable by any criteria.
- Email notifications for approved/rejected adoption/foster applications and success stories.
- Integrated payment of adoption fees.
- Visitor can set preferred maximum distance for location sort.
- Rescue organizations can customize their adoption/foster applications.
- Allow account holders to change email and/or password.
- Forgot password email with password reset link.

## Project initialization

To fully enjoy this application on your local machine, please make sure to follow these steps:

1. Clone the repository down to your local machine
2. CD into the new project directory
3. *Insert instructions for installing fake database*
4. Run `docker compose build`
5. Run `docker compose up`
6. *...what else???*
