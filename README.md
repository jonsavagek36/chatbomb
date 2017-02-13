CHATBOMB v1.0: Exploring how technology changes the way we communicate.

Chatbomb is an instant messenging app that turns chatting into a game through various features:
1) Unlike most texting/messenging, users can view what their friends are typing, letter by letter, as they type it.
2) Once a message is viewed, users have only 30 seconds to reply.  Otherwise, the entire conversation is erased.
3) For each reply received, users gain a point.  Once the feature is fully implemented, users will be able to spend
   various amounts of points on abilities such as extending the time limit on replies, or potentially to erase the
   entire conversation at will.

The app consists of two Heroku deploys:
1) The ReactJS/Node front-end.
      - Facebook (JavaScript) SDK and Web API handle logging in and passing profile pics.
      - React-Router handles swapping from Login to Setup to the App itself.
      - My Express server and the ReactJS client utilize the Socket.io library for handling real-time communication.
2) The Rails API back-end
      - Custom routes and controller methods handle user lookup, new user creation, creating and retrieving friend requests, 
         adding new friends and retrieving friend lists.

User experience:
1) User logs in with the Facebook Web SDK Login.
2) User's Facebook ID is sent to the Rails API, where it is determined whether or not he/she is a new user.
3) If a new user, React-Router sends him/her to the account setup "page", where they are prompted to enter their
   desired Screen Name and the e-mail by which they want other users to search for them.
4) When they submit their Screen Name and E-Mail, the app simultaneously makes a call to the Facebook API to retrieve
   their Facebook ID and Facebook Profile Pic (url), and all of this information is posted to the Chatbomb API,
   where a new "user" is created.
5) Once successfully signed up, or if the app determined that they had previously signed up, React-Router redirects them
   to the actual Chatbomb app.
6) With a fetch request to the Chatbomb API, the user's profile info and their Friend List (as well as any pending friend
   requests) are retrieved.
7) User's friend list is sent to the Express server, which returns a list of friends who are also currently connected, which
   then populates the Friend List with their photo and screen name.
8) User can click on a friend to open up the messenging box with them and send a message.  If both parties are viewing the
   same messenging box, they can watch each other type, letter by letter.
9) When a new message is received, a small bomb icon will appear next to the friend's name, indicating a new message.
10) When a new message is opened, a timer will begin counting down in the top-right corner of the messenging box.  If the        timer reaches zero, the entire chat is erased.
11) Users can click on the Requests tab to view/accept pending friend requests or to send one of their own by entering a 
    user's e-mail address.
    
Soon to be implemented:
1) The ability to actually spend the points earned on extending reply time limits or "Chatbombing" i.e. erasing the entire
    conversation at will.
2) A settings page where users can select from a group of Facebook photos, change their screen name, e-mail address, etc.
3) The ability to search for other users without an exact e-mail address on the Requests page.
