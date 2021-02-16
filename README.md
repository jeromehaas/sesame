<img src="./images/sesame-logo.png" />

# Sesame
​
Sesame is an access management service that consists of 3 parts and uses primarily facial recognition to verify access rights. 

--- 
### Admin Dashboard
​
The admin dashboard provides an easy overview of your access management.
​
It provides you informations as:  
	- who entered which door at which time   
	- how many active users are in your system   
	- if an which and when issues was reported   
	- how many open invitations exist   


You can:  
	- add, update and deactivate users  
	- add doors which can be added to groups 
	- add groups and assign them to users    
  

To see how to run Admin Dashboard and needed dependecies got to:
<br />
[Admin Dashboard Repository](https://github.com/AlexandraDonchenko/admin-dashboard/blob/e025836f2756cd23ef12222ddd75df7744f0ca97/README.md)

---
### React Native App
​
The user will use the application as iOS or Android app.
As soon as an user is created in the admin dashboard, an automatic email will be sent to the provided email address.
With the provided QR code, the user can register on the system.
​

The user story looks like this:   
	- the user can download the app from the app-strore or playstore 
	- the user gets email with the QR code 
	- the user can register in the system with making 3 pictures in the   app   
	- now, the user can start open the doors by simply open the app and scan the face to open the doors provided in the system  
	- as soon as a door gets opened by a user, a log is created and is visible in the admin dashboard  
​

To see how to run React Native App and needed dependecies got to: 
<br />
[React Native App Repository](https://github.com/garmobal/sesame-native/tree/master)


---
### Backend
Backed uses SQL and noSQL databases. When user tries to access door, users face is detected in app and then compared with Azure facial-recognition service.
To see how to run Backend and needed dependecies got to: 
<br />
[Backend Repository](https://github.com/MatthieuBonnardot/sesame-backend/tree/e44029dc63e08e4344bc1c1fc24952ccf71c1a04)