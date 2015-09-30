# mcq-online

A simple online platform for completing multiple choices questions and producing simple analytics. It is designed to be as minimalistic as possible, providing a modest set of features that make it useful.

This is written as a supplimentary teaching tools for a secondary school course.

## Usage

The system is already configured to be deployed to openshift. You will need to include the following cartridges for it to work:

* ```Node.js 0.10```: for server.
* ```MongoDB 2.4```: for data storage.
* ```RockMongo 1.1```: for adding questions or so.

A login system and adminstration system is not included in this platform, so questions must be added manually to the database with RockMongo. To add new questions, add new documents in the class ```paper``` with the following formats:

```
{
   "title": "Sample Paper",
   "count": 25,
   "defaultLength": 4,
   "specialLength": {
     "1": 2,
     "2": 2,
     "3": 2,
     "4": 2,
     "5": 2 
  } 
}
```

* ```title```: title of the papaer
* ```count```: total number of questions
* ```defaultLength```: the number of questions for each questions by default
* ```specialLength```: an object for specifying question with a special number of options, for instance, in the example above, it means that Question 1 to 5 will have 2 options instead of 4 (the default).


To view stats of each individual paper, modifying the url of the page from something like this:
```
http://[domain]/#/paper/560ab09e55135cc2be000000
```
into ...
```
http://[domain]/#/stats/560ab09e55135cc2be000000
```
