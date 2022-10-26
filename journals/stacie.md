10/26/2022

Paired with Kate all morning on styling. Did a lot of testing and bug fixing today. Fixed location query to return only un-adopted pets. Converted story form to use RTK query and formData to be able to upload picture. Updated README. Fixed navigation on story form. Deleted some print statements and stuff. Wrote unit test. Dealt with a difficult merge.


10/25/2022

Wrote README. Did some miscellaneous js bug fixes. Added "Save and add another" button to the create pet form. Worked on converting add story form to use RTK query and to be able to upload a picture.


10/24/2022

Made geo-query work for pets list. Create account and update account now add
location. Finished update pet and now you can upload pictures there.


10/22/2022

Restored petslist functionality. Refactored petslist and homepage to use RTK query.
Updated the http method for updating a pet from patch to put because put is the
correct method, since I am replacing the entire object.

Then, I got S3 to work. Now pictures uploaded for our pets are stored on AWS S3.
I created and configured a security policy that limits access to the development
bucket, and then I created a single-purpose user with that security policy. The
code currently uses that user's credentials to upload files into the bucket.

https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html


10/19/2022

Made add pet form work with new APIs. Added picture to story form. Made delete
button on pet card work. Made miscellaneous fixes to navbar, homepage, pets list.


10/18/2022

Finished Add Pet form. Tested Gary's new APIs. Helped Kate with story detail page.


10/17/2022

Changed Pet List to use Cards. Got Add Pet form working. Logout button on navbar
now works.


10/14/2022

Continued to learn React MUI.


10/13/2022

Today I fixed the geospatial query. I learned the problem was something missing
called a 2dsphere index.
## NOTE!
db.rescues.createIndex({location: "2dsphere"}) <-- This needs to run on every
Mongo db that's going to do our application. Also run for db.accounts.

I also started learning MUI.


10/12/2022

Today I worked on trying to use $nearSphere to sort pets by distance from the
user. None of us could get it to work yet. I started writing this code under Pets
but I moved it to Rescues because Rescues have addresses and pets but pets don't
have addresses.

Gary and I disagree about the way that data should be modeled. I want to have
objects as properties on models and he thinks this is bad design.

Not an aha moment kind of day, unfortunately.


10/11/2022

Today I created an api to get location coordinates from a rescue's address. I
basically copied what I did yesterday but still ran into some bugs. Finally got
it working. The next step for the location filter will be to figure out how to
make the db query to sort documents by distance.


10/10/2022

Today we worked on accounts as a group. On my own, I created an api to get
location coordinates from an account's address. I had an aha moment regarding
organization of the code.

10/05/2022

Today we got so much done. We did pet update as a group, then we worked
individually on issues we created. I worked on the Rescue model and all
the CRUD functionality for rescue. I then helped Kate with some logic for
success story list by rescue.


10/04/2022

Today we worked as a whole group again and we got started with our pet models/queries/routers.

Rather than one aha moment, it was a whole day of learning FastAPI and MongoDB.


10/03/2022

Today as a whole group we worked on setup--the yaml file and the Dockerfiles. We
also created our database volumes and installed MongoDB Compass.

It was really cool to get all the Docker containers running!
