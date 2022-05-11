# Welcome to the backend of Pantry App

While this currently lives in the same repo as the react code, I will likely move it
to a separate repo at some point to optimize build space.

### Current functionality

* `localhost/list` returns the pantry list data
* `localhost/add` adds the desired items to the pantry list

### Data Storage

Currently the data is stored locally, but once a database is decided on I
will aim the code there instead.

### Data Transfer

 The format is yet to be decided on. Whatever format of data you want to send from user input, I will optimize the code to handle.

 ### Design

 This initial code is based on the idea that each account (household, family, etc) has
 a unique identifier which can be used to locate the correct pantry data. This identifier will be permanent per account and sent in the requests from the UI to the backend.

 ### Testing

 Does this server actually run yet? Well, yes. But it won't handle any actual data
 since the handlers are currently using mock data. (We gotta choose the transfer format)