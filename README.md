# Software Performance and Scalability Project


## Project assignment

IMDb is an important database for movies. It contains many titles and reviews of current and historical movies.  
Have a look at IMDb:

[https://www.imdb.com/](https://www.imdb.com/)  
  
You may download the entire dataset of IMDb available here: [https://www.imdb.com/interfaces/](https://www.imdb.com/interfaces/)  
  
**Step 1**
Create a web application that allows for searching a movie in the database and provides the information on the movies, the main actors and directors and the average rating, length etc. Design your application with the tools that you prefer.  
  
**Step 2**
Create a query set. Let us assume that the probability that a film is searched is proportional to the number of rating that it has received. Create a list of 10,000 queries of movie titles (where entries can be duplicated) sampled according to this rules.  
  
**Step 3**
Perform a load test to assess the scalability of your web app in closed-loop. How many users can it handle? Use the queries that you previously created as input of your load test.  
  
**Step 4**
Design the system in such a way that its scalability increases. To this aim, identify the bottleneck in your implementation (either experimentally or from its model). Then, test your designed system using JMT to study the expected response time as function of the number of users. What is the optimal number of users?  

**What to produce?**  
At the end, you are reuqired to write a report with the results of the load test and the design and analysis of the proposed architecture.

## Step 1

Clone the repository and then run

    npm install

Install **Postgresql**. Open **pgAdmin** and create a database. Right click on the newly created database and click **Restore**. In the opened window a backup file is requested, select the `backup.sql` file and click restore.
This will populate the database with the IMDB dataset.

Then modify the `DATABASE_URL` variable in the `.env` file.

    DATABASE_URL="postgresql://user:password@localhost:5432/db_name"

After that run

    npm run dev
