## October 3 2022
- The entire group worked together to set up the docker-compose.yml file
- We also linked MongoDB Compass && MongoExpress to utilize going forward with MongoDB
- I just learned that writing requirements like fastapi==0.81.0 is much different than fastapi[all]==0.81.0.  What a relief to know that [all] will also install all the necessary dependencies for fastapi. 

## October 4 2022
- The entire group worked together to work our way through setting up routes and queries for a single pet.
- Pair programming would not work this early in our development because of FastAPI, MongoDB, Pymongo, Pydantic.  There is a lot to learn to be comfortable with all of these together, and we figured learning together is the best way.
- I worked a lot on trying to streamline a few processes of things while also continuing to help our development and understanding of these queries and routes.  I believe later we will be able to increase efficiency of our queries through aggregates pipelines.  

## October 5 2022
- The entire group finished up the reest of queries and routers from pets.  
- We split up and each began taking different issues but stayed in a group together
- I created the all queries and routers for the AdoptionAppliction.  I wrote them all without testing and only had a few errors at the end which was a relief-- only after Kate pointed out that I never really hooked everything up in Main.
- Regardless, today was a great day for everyone.  We got a lot done collectively as a group
- I believe everything is implemented except for users which should be pretty east. 
- Mongo DB is becoming easier and easier to work with, and FastAPI's are slowly looking more and more recognizable.

## October 8 2022
- Over the weekend I worked a lot on trying to accomplish CRUD for accounts.  I think we have everything implemented but I have a few blockers that i'll present to the group on monday. Hopefully we can work together to sort these issues out.  I switched our models.py to become a models folder to store the various different models in seperate .py files.  I ensured functionality by adding all necessary imports.  I'll find out monday if the group approves of the idea.

## October 10 2022
- We worked on solidifying account CRUD. Together we fixed a few missing functionalities and issues that I had ran into over the weekend. 
- I'm glad my group was very accepting to a few ideas I came up with as well as being able to help contribute to fixing a few bugs I had ran into with account CRUD.  
- We each sort of went through and tested things out too just to ensure functionality had not been broken anywhere else.  
- I'm looking forward to reading more about Redux-toolkit to help me not have to drill props around like I had to on my last project.  Redux is going to have an enormous impact moving forward with the front end.
- We have a group blocker that sort of stems from a necessity for a 'refresh_token.'  We currently only have unlimited tokens.  I was able to find a way to put an expiration time on a token, but need to develop a way to be able to have a refresh token upon expiration of the token, i think?

## October 11 2022
- I spent a lot of time trying to fix a small error on implementing jwtdown_fastapi instead of utilizing from jose import jwt.  It all paid off at the end though and now we're about to ensure users are logged out both during promotion and demotion of roles.

## October 12 2022
- I finalized the integration of jwtdown_fastapi with the added sessions.  I really wish we would have used a different authenticator overall instead of the one built for us to use.  The interworkings of the jwtdown_fastapi are far inferior to a lot of other authentication.  I don't really know why we still dont have refresh tokens.

## October 13-16 2022
-  I worked on setting up a redux store for the first time over these days.  It was a lot of work and I wasn't really sure how to go about it.  I started off by setting up what I could but also trying to make the propery querys and mutations for each of our 33 endpoints.  I have all of the query endpoints set up and working properly, but we don't have enough front end setup yet.  
-  October 14 we were notified by a teammate that because there was absolutely NO other way, they were working on completely changing everyones backend code that they had written. As of October 16th we have 46 api endpoints, and I was told that all we need is a token from the store.  I'm not happy that I spent so much time setting up the store, which was wanted by everyone from the start, only to be told we only need to have a token available.  We'll see going forward about the use of the store, because we don't need to have the entire back-end handle everything.  The front-end shouldn't handle everything, but its plenty capable of handling more way more than it's currently going to be used for.

## October 17-18 2022
- I quickly made the desired limited redux store but haven't pushed it into main.  As of now it needs 1 endpoint; I have a branch with around 36 endpoints all query endpoints working properly, I have yet to test mutations because my branch did not have front-end components
- I mostly worked on the application form which by the end of Oct 18, is fully functioning. It's a very large form and a lot of fields.  I experimented with using FormData() instead of useState().  It makes a lot of sense considering useState() just gets reset upon submission.  There's a lot that goes into trying to make a form with state VS FormData() but I was not able to get all fields to successfully carry over upon submission. 
- I also experimented with modals.  If all goes well, I should be able to make any form a modal instead of having it live on it's own page. This may require more redux endpoints though, but we'll see going forward.

## October 19-29 2022
- Somehow I lost a few journals in branches but I'll be doing my best to try to catch up my journaling.  I thought I had up until the 21st but twice now ive somehow lost journals on branches.
- October 19-21 I started working on application form.  I also finally added the a miniaturized version of the entire store that I created.  Application modal and form started out living on different files.  I did a lot of work with Signup form and Login form too.  I've run into a lot of hiccups and on the 21st.  We ended up utilizing a few more endpoints but they're not all exactly fully functioning or used. 
-- October 21 I started a new branch because somehow when i merged into main I accidently deleted one of my teammates files, PetList.js.  Luckily, I thought it might happen, so I had saved the files prior to my merge and supplied them to my teammate.
--October 22, 23 I worked all weekend on a branch.  I spent a lot of time making changes to different queries/mutations to make them all work.  When originally attempting to set up around my initial 30+ endpoints, all stored across multiple files, I only ever made sure they were working by supplying them an '_id' string value within them and checking them on the redux-dev-tools to ensure that they were properly receiving data.  At that point, I had not been able to utilize any of the mutations.  
--October 24 I made a courageous move that I never did before, but it's become a much nicer experience using Gitlab overall.  Prior to this, on my own branch, this would be my process:
-git add.
-git commit -m 'message'
-git checkout main
-git pull main
-git merge -mybranch-
-git push
 I found that this was not the best process, it often left me very distraught and nervous for merging.  The better process I ended up learning was to just simply be on my own branch and this is the process: 
-git add .
-git commit -m "message"
-git push
-git checkout main
-git pull
-git checkout -mybranch-
-git merge main
This is the best way for me now because I can resolve conflicts within my own branch without needing to worry about causing problems in main.
-October 25-29 I spent a lot of time in redux and modals.  I made some changes to other peoples files but ultimately I ended up being able to achieve a lot of usefulness with redux.  I was able to create my own application slice and which was pretty cool.  I ended up being able to also make my account update form which populates the fields of the form with what is already existing.  The complexity was pretty high.  Modals started giving me a bit of problem on Oct 28 when I realized that the signup and login forms, which each have a link to the other modal, would render unlimitedly render each modal ontop of one another.  There was no conflict, because they would all close upon submission, but the screen continued to get darker because of the slight the way it slightly filtered out the backdrop. Candice helped me grasp a better understanding of how to take advantage of redux, and I went on to be successful several times.  I ended up fixing my application form checkboxes by creating an extra reducer on my application form to handle specific situations when I had checkboxes vs values.  If i kept a value on a checkbox, it would end up giving me back the string version of my boolean value as oppoosed to the boolean value changing.  The first time it would change to a string, it was broken.
--October 29 I finalized a lot of different pieces of code.  I cleaned up a lot of extra comments and unused impots and made a lot of other functionality work correctly.  I don't think we had too many unused imports or overuse of comments.

Overall I feel great about the project coming to an end, but I do wish today was Monday to have some more time to get a few extra features working like my FavoritePets which is not living on main at the moment, I couldn't quite get everything to function properly because of the need to make an extremely complex backend that would take a pet id string, search for it based on the ObjectId() in mongodb, then translate all of that to be able to add the pet to my list of favorites without actually just storing the pet on my account.

Thanks again to all my teammates,we did a great job