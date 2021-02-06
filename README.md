# CORE - A sample ReactJS project

### Design Pattern
I used the MVC design pattern, most of the reason is because I am very familiar with it. The other reason was that the file structure of an MVC design pattern is very easy to work with not mention it's scalability. The project's specifications also leaned into an MVC structure.

### Process
##### The Server
The instructions mentioned that the server and the client should be decoupled so I opted in creating the server-side first. I used express for the backend and started with laying out my middlewares that I needed. BodyParser, CRON, CookieParser and Passport were the essentials that I needed to add in first.

After I finished my configuration of the middlewares I started working with my routes. I typicall make a separate folder in the root directory for routes just so that I could separate my route groups better. I started with the "/user" endpoint with the typical regsitration, login and logout. Those routes are then connected to my UserController which is also in a separate folder to deal with the function for the User Model. I used mongoose for the database and used mongoose's Schemas to create the User Model. The Model and Controller part of my application is now completed.

##### The Client
After I finished with configuring the server-side API, I started working on the client-side. As per instruction I used ReactJS. This is what took most of the time because I got too engrossed in the CSS aspect and of the project. I decided on opting for a Single Page Application (SPA) because this is a small project that I didn't really need to make a lot of pages for. First thing I did was making the navigation. I didn't need routes so I made use of "useState" to create a state of my application. I needed the home, login, register and dashboard as states. I then made my navigation changing the states onCLick.

To connect my client-side to the server-side API I made use of axios. I used the axios HTTP requests to connect adding my credentials for the CRON. This was the use of that CRON middleware. I first worked with the Registration it was a simple POST form submit. Then I worked on the Login component. It was the same process with the Registration because the server is all setup with the user actually logging in with Passport. It sends the request and it passport saves my credentials locally.

With that out of the way I needed a way to access the logged in user from the client-side because the data is hashed React is not able to read it. So I made a Helper class called Auth, it is responsible of making a POST request to the API taking the (req.user) attached with my request. That data is then sent back again to Auth which it then saves as a state in the base script. TO make sure I assign the user after login that same Auth class's function is called after log in.

With this the client-side and server-side should be connected. All that was left to do were the dashboard. I wanted to use a dashboard template but opted not to because I thought it was too complicated for me to put in after I made my base application already. So I just wrote my own code to make it. I used a library for the charts and made sure to add in another route to my User to take in some random data.

### Conclusion
I had a lot of fun making this little project. I took a lot of time being creative with it but all in all the look was worth it. I hope it is also to your liking.