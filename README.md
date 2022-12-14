# Vouchers4Veggies
This project is designed and developed by a team of UC Berkeley students through one of [Cal Blueprint](https://calblueprint.org/)'s project teams during the 2022-23 academic year. 

Learn more about [Vouchers 4 Veggies](https://eatsfvoucher.org/) and [Cal Blueprint](https://calblueprint.org/).

---
## Getting Started

### Prerequisites

Check your installation of `npm` and `node`:

```sh
node -v
npm -v
```

We strongly recommend using a Node version manager like [nvm](https://github.com/nvm-sh/nvm) (for Mac) or [nvm-windows](https://github.com/coreybutler/nvm-windows) (for Windows) to install Node.js and npm. See [Downloading and installing Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

### Installation

1. Clone the repo & install dependencies
   1. Clone this repo
      * using SSH (recommended)
         ```sh
         git clone git@github.com:calblueprint/vouchers4veggies.git
         ```
      * using HTTPS
         ```sh
         git clone https://github.com/calblueprint/vouchers4veggies.git
         ```
   2. Enter the cloned directory
        ```sh
        cd vouchers4veggies
        ```
   3. Install project dependencies. This command installs all packages from [`package.json`](package.json).
      ```sh
      npm install
      ```
2. Set up secrets:
   1. In the project's root directory (`vouchers4veggies/`), create a new file named `.env`
   2. Copy the credentials from [Blueprint's internal Notion](https://www.notion.so/calblueprint/Firebase-Environment-Variables-c30a053fba4c47559f9f4944e4962a9f) (access is required) and paste them into the `.env` file.

**Helpful resources**
* [GitHub: Cloning a Repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository#cloning-a-repository)
* [GitHub: Generating SSH keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
### Development environment

- **[VSCode](https://code.visualstudio.com/) (recommended)**
  1. Open the `vouchers4veggies` project in VSCode.
  2. Install recommended workspace VSCode extensions. You should see a pop-up on the bottom right to "install the recommended extensions for this repository".

### Running the app

1. In the project directory, run:
   ```shell
    npx expo start
   ```
2. There are several ways to test the app:
     - **Expo Go (Recommended)**: [download Expo Go](https://docs.expo.dev/get-started/installation/#2-expo-go-app-for-android-and) on your phone, **connect to same network as your laptop**, and use your phone camera to scan the QR code displayed in the command line.
     -  Web: typing `w` into the expo command line opens the app in a web view. 
        -  Warning: since the app is designed to be used on a mobile app, web compatibility might be limited, and some functionality might be different when using the web setup.

### Troubleshooting
<!-- Add common/known setup issues in toggles here -->
<details>
<summary>Starting the expo app results in `FirebaseError: Firebase: Error (auth/invalid-api-key)` but .env exists with the correct credentials.</summary>

   For whatever reason, sometimes the env variables don't get picked up, but adding the following line to [clientApp.ts](src/database/clientApp.ts) usually fixes it.

   ```js
   console.log(firebaseConfig);
   ```
</details>