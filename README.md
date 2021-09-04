ReactJS ASSIGNMENT

PROBLEM STATEMENT:

You have to make a single page web application that will download data from the following urls1 simultaneously (and record the timestamp of the start and end of the request) and save it in IndexedDB using models of your choice (and save the timestamp of start and end of the saving time). The UI of the app will be as shown below,

The four Urls should be pinged at the same time (5-sec delay after opening the Activity) and the recorded times (timestamps) have to show in the UI under the heads of
Start: When you ping the Url
End: When you finish parsing the Url
Start Save: When you start saving the Data
End Save: When you end saving the data

The buttons shown below will be used to start the call for individual Url again if needed.

Note0: All the times are unix timestamps and NOT ISO date time format. The Current Unix Timestamp is not a button - you need to show the current timestamp of the instant of time there. So it should always be updating like a counter. Also, the UI should be as soon as the action (start, end, etc.) to show the UI is done. Not after. You should not update the UI after the save is done - it should be realtime.
Note1: Even a single frame should not be skipped at any time.
Note2: You are free to use any possible way to code the above.
EVALUATION CRITERIA:

You will be judged on
Code quality
The correctness of the output
OOP concepts.
Choice of architecture.

Needless to say (but still saying) that the above code needs to be pushed to GitHub and we all love
good commit messages,
good variable name
meaningful names in functions.

URLs to be downloaded
https://jsonplaceholder.typicode.com/comments
https://jsonplaceholder.typicode.com/photos
https://jsonplaceholder.typicode.com/todos
https://jsonplaceholder.typicode.com/posts
