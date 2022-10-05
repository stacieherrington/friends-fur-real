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