# Solana Content

This repository contains every content of the Solana Lessons, including templates and finished versions.

## Clone the project locally.
 - Clone the Repo locally. `git clone https://github.com/0xramrapolu/solana_projects.git`
 - There are 2 important projects inside.
     1) review-program : This is the Solana contract in Rust.These files should be copied into Solana Playground.
     2) review-frontend: this is the front for adding reviews.

## Solana Playground Project.
 - Create a new Project and Choose Rust Native Project Type and give a name.

## Running review-program (This is adding Review to a Restuarant)
 - copy lib.rs, instruction.rs and state.rs into  Solana Playground.
 - Menu on Left Hand Panel, Choose build and Deploy.
   ![image](https://github.com/user-attachments/assets/44f49493-8b95-4df6-89ee-dcecac4f6b35)
 - Click on "Build", this should compile. if there are any errors, please fix it.
   ![image](https://github.com/user-attachments/assets/20b1347d-ca2f-4b0a-b959-eb305377299d)
 - Copy the "Program ID".
 - Click on "Deploy", you should see the Deployment Succesful.

## Running the frontend.
 - go to "review-frontend" where you cloned the project.
 - Go to review-frontend/src/pages/index.tsx
 - Go to line 11 :
   ```//Replace with your own Program_id, you just copied on Solana Playground, refer above Image.
const REVIEW_PROGRAM_ID = "**CmMbZTFZSHk1vAtGb1RCn4ueJBcHLr8uqsndJSoCHN1t**";```
 - now run
```
  // Build the Project
   npm install
  // Run locally
   npm run dev
// open a browser and open URL : http://localhost:3000
// and below page should open as per image.
```
- This should open page
![image](https://github.com/user-attachments/assets/65799c83-36f9-4f89-ba74-8da15a62ba72)
- Connect your wallet.
- Add your Review
- Your Transaction is displayed in the bottom of the page with a URL pointing to the Solana Explorer.
- Open the URL in a browser and verify your reviews in the Solana Tx Explorer.

