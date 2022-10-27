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


## October 18, 2022

Today finished working the story form. I then started working ont he story detail page and worked on it's functionality. 

I got stuck at one point with figuring out how to pull out the story data by a specific id. Took a lot of searching on google and some help from fellow students, and finally was able to get it to work, which was nice! 


## October 19, 2022

Today I finished working on the story detail page. I created story lists page and got the list of story cards to render on the page. I made some modifications on the story card, and some styling changes on our page. 

As I was working on the story list page, I had discovered how to truncate a long string. The story now fits  the story card without stretching it all the way. It was pretty cool to figure out how to do that. 


## October 20, 2022

Today I started working on the management for application lists. Created a table and was able to map the list of applications depending on the rescue. Utilized redux/store to fetch the application data. Learned how to get data using redux for the first time. abs


## October 24, 2022

Today, I continued working on the application list. Added a way to filter the table/list by it's status (Approved, Submitted & Rejected). Now you are able to filter by select/dropdown for the status. I also modified some of the styling for the page and added the routes for some of the navbar links. 

I was stuck for a long time with this filter feature. It turns out using the Autocomplete for mui was not the right/best choice to filter. Figured out that I had to use the Select tag to filter through. Thankful for Tyler and Gary for helping me out with this, or I would've been stuck for a while. 


## October 25, 2022

Today I worked on implementing a filter for Pet Types on our Pet's list. Also modified our nav bar's hamburger dropdown. Also did a little bit styling modification on our page.


## October 26, 2022

Today I worked on the style of our page, forms and buttons to have it all look on brand and cohesive with Stacie. Also changed the font for our page. As well as fixing the look of our manage staff page, the pet detail page. The team and I also worked on some bugs we discovered along the way.