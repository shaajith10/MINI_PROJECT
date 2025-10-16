#!/bin/bash

echo "Starting Departmental Chat Application..."
echo

echo "Installing root dependencies..."
npm install

echo
echo "Installing server dependencies..."
cd server
npm install

echo
echo "Installing client dependencies..."
cd ../client
npm install

echo
echo "Setup complete! Starting the application..."
cd ..
echo
echo "Backend will run on: http://localhost:5000"
echo "Frontend will run on: http://localhost:3000"
echo
echo "Make sure MongoDB is running on your system!"
echo
echo "To populate with sample data, run: npm run populate"
echo

npm run dev
