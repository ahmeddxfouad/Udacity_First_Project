#  First Project

## Getting Started

### Installing Dependencies

project requires having node installed https://nodejs.org/en/download/

run ```npm install``` to install the dependencies

## Getting Started
- Base URL: The app is hosted locally at 'http://172.0.0.1:3000'
- Authentication: No Authentication required.

## Returned Error Codes
- 400: Bad Request
- 404: Not Found

### Endpoints
### GET /
- General:
    - Returns project description
- Sample: 'curl http://172.0.0.1:3000'

#### GET / images
- General:
    - Returns a error message & 404 in response that you are required to enter filename
- Sample: 'curl http://172.0.0.1:3000/images'

- General:
    - Returns original image or 400 if the file doesn't exist
- Sample: 'curl http://172.0.0.1:3000/images&filename=[validFile]'

- General:
    - Returns original image with resized width and original height or 400 if the file doesn't exist
- Sample: 'curl http://172.0.0.1:3000/images&filename=[validFile]&width=[validNum]'

- General:
    - Returns original image with resized height and original width or 400 if the file doesn't exist
- Sample: 'curl http://172.0.0.1:3000/images&filename=[validFile]&height=[validNum]'

- General:
    - Returns original image with resized height and width or 400 if the file doesn't exist
- Sample: 'curl http://172.0.0.1:3000/images&filename=[validFile]&height=[validNum]&width=[validNum]'

### Notes
- If the user entered the width and height in negative numbers the negative is neglected.
- If the user entered the width and height equals zero, original image value is returned.


## Running
To run the code, run
```
npm run start
```

## Testing
Testing is done using jasmine
To run the tests, run
```
npm run test
```

## Author
<sup>Ahmed Fouad 

### Acknowledgments
- sharp docs https://sharp.pixelplumbing.com/api-input#metadata
- eslint docs https://eslint.org/docs/user-guide/command-line-interface