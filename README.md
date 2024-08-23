Implementation Instructions

1. Clone the Repository:
   * First, clone the repository to your local device:

         git clone https://github.com/yourusername/school-management-api.git

2. Set Up Node.js and Modules:
   *Ensure Node.js is installed on your device.
   *Install the necessary modules by running

       npm install

4. Set Up MongoDB:

   *Install MongoDB on your device if not already installed.
   
   *Paste your MongoDB URL into the .env file:
  
       MONGO_URL=your_mongodb_connection_string

5. Running the Application:
Start the application by running:
npm start
The API will run on http://localhost:3000/.

Testing the APIs with Postman:

Add School API:
Method: POST
Endpoint: http://localhost:3000/api/addSchool
Body (in JSON format):
{
  "name": "Oxford International School",
  "address": "Palm Beach Road, Navi Mumbai",
  "latitude": 19.0330,
  "longitude": 73.0297
}

List Schools API:

Method: GET
Endpoint: http://localhost:3000/api/listSchools?latitude=(x)&longitude=(y)
Replace (x) and (y) with the latitude and longitude values, respectively.
This will return a list of schools sorted by proximity to the specified coordinates.
