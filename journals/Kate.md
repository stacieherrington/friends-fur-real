## October 3, 2022

Today, I worked on:

* Setting up the Docker yaml file and installed MongoDB Compass. 

The team tested if the application/host was running and it worked!

Getting all the docker files and images to work is amazing! Also finding out that adding '[all]' on the fastapi requirements includes any fastapi dependencies. Which is pretty cool!

## October 4, 2022

Today we worked on:

* We created our Pet models, pet queries and pet routers. 

The team was able to create, get and delete a pet with fastAPI. We all worked together to get everything working, and fixed an error together. 

We had issues with getting the .gitignore to work properly. We found out that once we have pushed to our repo before making the .gitignore file, git will keep track of the pycache. Even if we push with a .gitignore file afterwards it will still keep track of the pycache since git initially tracked it from our first push. So we had to undo the initial push to fix it. Something new that I learned about git! 

## October 5, 2022

Today, I worked on:

* Today I created the Success Story Model. 
Also created Query/Route of:
- getting list of success stories by Rescue
- creating a success story 
- getting one success story by id

The team worked together on listing the Success stories by rescue, which was interesting to learn (having to figure out how to connect the relation).  


## October 6, 2022

Today we worked on Accounts/Authentication. 

The team discussed and worked on the Accounts model, router, queries. We also did some more research on jwt/authentication to get a better understanding. 

Unfortunately, there was no "aha!" moment for me today. 


## October 10, 2022

Today the team discussed and worked more on the Authentication/tokens, as well as promoting users to "staff" and removing the "promotions" as well. 

We have been trying to figure out how to deal with a token when promoting a user to "staff". Either by forcing a logout or maybe by setting an expiration for the tokens. We have not figured it out exactly just yet. 

No particular "aha" moment today as well. 


## October 11, 2022

Today the team continued to work on Authentication/tokens, as it was not working properly. I also tried to start working on the front-end(Homepage & Nav).

As I was trying to work on the front-end, I was having issues with react rendering any saved changes I have made. It did not render immediately or after refresh, I needed to stop by docker and start it back up to start the changes. So the team was trying to figure it out and fix the issue. 


## October 12, 2022

Today I was finally able to start working on the front-end since our react issue has been fixed. I created a Homepage template, a Navbar template which included creating a few components. I also utilized bootstrap for our front-end. abs


I learned how to create an overlay background using bootstrap, which is cool! 


## October 13, 2022

Today we decided that we were going to use MUI instead of bootstrap.

I worked on:
- Creating a new mui Homepage template
- Created new Pet Card and Story card utilizing mui
- Started working on the applications list table template

It's my first time ever trying mui. It's been fun learning mui and how similar and also different it is from Bootstrap. I love that you are able to customize with mui and they also have more options of components.


## October 14, 2022

Today I continued working on the front-end templates. I added a filter option on our application list table. To be able to filter though any submitted, declined, and approved applications. I also worked on our Signin template. 


## October 17, 2022

Today I worked on the Signup form template. I also  started working on the story form with an "option" to select a pet for the story. Spent a lot of time learning and watching videos on MUI. It has been challenging to create all the components while learning how to utilize MUI at the same time since I have only been using bootstrap before this. 
