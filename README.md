CHATBOMB v1.0: Exploring how technology changes the way we communicate.

Chatbomb is an instant messenging app that turns chatting into a game through various features:
<ol>
<li>Unlike most texting/messenging, users can view what their friends are typing, letter by letter, as they type it.</li>
<li>Once a message is viewed, users have only 30 seconds to reply.  Otherwise, the entire conversation is erased.</li>
<li>For each reply received, users gain a point.  Once the feature is fully implemented, users will be able to spend
   various amounts of points on abilities such as extending the time limit on replies, or potentially to erase the
   entire conversation at will.</li>
</ol>
The app consists of two Heroku deploys:<br />
1) The ReactJS/Node front-end.
<ul>
<li>Facebook (JavaScript) SDK and Web API handle logging in and passing profile pics.</li>
<li>React-Router handles swapping from Login to Setup to the App itself.</li>
<li>My Express server and the ReactJS client utilize the Socket.io library for handling real-time communication.</li>
</ul>
2) The Rails API back-end
<ul>
<li>Custom routes and controller methods handle user lookup, new user creation, creating and retrieving friend requests, 
adding new friends and retrieving friend lists.</li>
</ul>

User experience:
<ol>
<li>User logs in with the Facebook Web SDK Login.</li>
<li>User's Facebook ID is sent to the Rails API, where it is determined whether or not he/she is a new user.</li>
<li>If a new user, React-Router sends him/her to the account setup "page", where they are prompted to enter their
   desired Screen Name and the e-mail by which they want other users to search for them.</li>
<li>When they submit their Screen Name and E-Mail, the app simultaneously makes a call to the Facebook API to retrieve
   their Facebook ID and Facebook Profile Pic (url), and all of this information is posted to the Chatbomb API,
   where a new "user" is created.</li>
<li>Once successfully signed up, or if the app determined that they had previously signed up, React-Router redirects them
   to the actual Chatbomb app.</li>
<li>With a fetch request to the Chatbomb API, the user's profile info and their Friend List (as well as any pending friend
   requests) are retrieved.</li>
<li>User's friend list is sent to the Express server, which returns a list of friends who are also currently connected, which
   then populates the Friend List with their photo and screen name.</li>
<li>User can click on a friend to open up the messenging box with them and send a message.  If both parties are viewing the
   same messenging box, they can watch each other type, letter by letter.</li>
<li>When a new message is received, a small bomb icon will appear next to the friend's name, indicating a new message.
<li>When a new message is opened, a timer will begin counting down in the top-right corner of the messenging box.  If the        timer reaches zero, the entire chat is erased.</li>
<li>Users can click on the Requests tab to view/accept pending friend requests or to send one of their own by entering a 
    user's e-mail address.</li>
</ol>   
Soon to be implemented:
<ol>
<li>The ability to actually spend the points earned on extending reply time limits or "Chatbombing" i.e. erasing the entire
conversation at will.</li>
<li>A settings page where users can select from a group of Facebook photos, change their screen name, e-mail address, etc.</li>
<li>The ability to search for other users without an exact e-mail address on the Requests page.</li>
</ol>
