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